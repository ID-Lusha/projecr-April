import json
import logging

from fastapi import APIRouter, HTTPException
from sse_starlette.sse import EventSourceResponse

from models.schemas import (
    ChatMessageRequest,
    ChatStartRequest,
    ChatStartResponse,
    LeadSubmitRequest,
    LeadSubmitResponse,
)
from services import ai_engine, guardrails, session_manager
from services.telegram_service import send_lead_notification

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post("/start", response_model=ChatStartResponse)
async def start_chat(req: ChatStartRequest):
    guard = guardrails.check_message(req.business_niche)
    if not guard.passed:
        raise HTTPException(status_code=400, detail=guard.reason)

    session_id = session_manager.create_session(req.business_niche)
    ai_message = await ai_engine.get_setup_response(req.business_niche)

    # AI's first message already establishes the scene and makes an offer,
    # so we move straight into roleplay — user's next message is the client's response.
    session_manager.update_session_context(
        session_id, business_type="", average_check=""
    )

    session_manager.save_message(session_id, "user", req.business_niche)
    session_manager.save_message(session_id, "assistant", ai_message)

    return ChatStartResponse(session_id=session_id, ai_message=ai_message)


@router.post("/message")
async def send_message(req: ChatMessageRequest):
    guard = guardrails.check_message(req.message)
    if not guard.passed:
        raise HTTPException(status_code=400, detail=guard.reason)

    session = session_manager.get_session(req.session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Сессия не найдена")

    if session["stage"] == "lead_capture":
        raise HTTPException(status_code=400, detail="Сессия завершена")

    session_manager.save_message(req.session_id, "user", req.message)

    # After /start the AI has already established the scene and offer,
    # so any user message goes directly into the active roleplay phase.
    if session["stage"] == "setup":
        session["stage"] = "roleplay"

    count = session_manager.increment_message_count(req.session_id)
    max_messages = session_manager.MAX_ROLEPLAY_MESSAGES
    force_end = count >= max_messages

    history = session_manager.get_chat_history(req.session_id)
    is_trolling = guard.is_trolling or guard.is_nonsense

    async def event_generator():
        full_response = ""

        if force_end:
            yield {
                "data": json.dumps(
                    {"type": "end_roleplay", "content": ai_engine.END_PITCH_MESSAGE}
                )
            }
            session_manager.update_session_stage(req.session_id, "lead_capture")
            session_manager.save_message(
                req.session_id, "assistant", ai_engine.END_PITCH_MESSAGE
            )
            return

        async for token_json in ai_engine.stream_roleplay_response(
            messages=history,
            niche=session["business_niche"],
            business_type=session.get("business_type", ""),
            average_check=session.get("average_check", ""),
            message_num=count,
            max_messages=max_messages,
            is_trolling=is_trolling,
        ):
            data = json.loads(token_json)

            if data["type"] == "token":
                full_response += data["content"]
                yield {"data": token_json}
            elif data["type"] == "end_roleplay":
                full_response = data["content"]
                session_manager.update_session_stage(req.session_id, "lead_capture")
                yield {"data": token_json}
            elif data["type"] == "done":
                yield {"data": token_json}

        if full_response:
            session_manager.save_message(req.session_id, "assistant", full_response)

    return EventSourceResponse(event_generator())


@router.post("/lead", response_model=LeadSubmitResponse)
async def submit_lead(req: LeadSubmitRequest):
    if not req.phone and not req.telegram:
        raise HTTPException(status_code=400, detail="Укажите телефон или Telegram")

    niche = req.business_niche or ""

    if req.session_id:
        session = session_manager.get_session(req.session_id)
        if session:
            niche = niche or session["business_niche"]

    session_manager.save_lead(
        session_id=req.session_id,
        phone=req.phone,
        telegram=req.telegram,
        business_niche=niche,
    )

    await send_lead_notification(
        name=req.name,
        phone=req.phone or req.telegram,
        niche=niche,
        session_id=req.session_id,
    )

    return LeadSubmitResponse(
        success=True, message="Спасибо! Мы свяжемся с вами в ближайшее время."
    )
