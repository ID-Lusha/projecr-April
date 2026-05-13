import json
from collections.abc import AsyncGenerator

from openai import AsyncOpenAI

from config import settings

client = AsyncOpenAI(
    api_key=settings.openai_api_key,
    base_url=settings.llm_base_url,
)

# =============================================================================
# SETUP: первый шаг — ИИ принимает нишу и сразу запускает ролевую сцену.
# =============================================================================

SETUP_SYSTEM_PROMPT = """You are a sales consultant in the business niche specified by the user.

Your task in this step — in ONE message:
1. Briefly confirm the niche (1 phrase, no formalities)
2. SET THE SCENE for the roleplay — explain that you will play the manager and the user will play the customer
3. Immediately make the FIRST OFFER — pick a TYPICAL product/service from the niche, name a specific price in USD and key details
4. End with an open question to get the client engaged

EXAMPLES OF GOOD RESPONSES:

Niche "dental clinic":
"Got it — dental. Let's play: you've just walked in for a consultation, I'm your treatment coordinator.
This week we have a special: Hygiene + Zoom Whitening package for $290 instead of $420. What brought you in today — sensitivity, staining, or aesthetics?"

Niche "auto parts wholesale":
"Alright, auto parts wholesale. Picture this: you're a buyer for a mid-size repair shop, I'm your account manager.
Just got a fresh Bosch shipment — brake pad sets for $48/unit when ordering 50+, normally $68. How many sets do you typically go through per month?"

Niche "online courses":
"Sure, online courses. I'm a sales advisor, you're a potential student on the fence.
Enrollment is open for 'Frontend from Zero' — 12 weeks, $490, with 30% off for the next 24 hours. What's holding you back right now — the format, the price, or uncertainty about results?"

IF the user wrote "hello", "test", gibberish, or something that is NOT a niche:
→ Reply briefly: "To start the demo — tell me your niche. For example: dental clinic, auto parts, online courses."
Do NOT start the roleplay until you receive a clear niche.

IF the user wrote something provocative or offensive:
→ Calmly: "😊 No problem. Give me a niche and I'll show you how I sell. For example: auto service, café, legal services."

RULES:
- Speak naturally, like a real manager. No corporate speak.
- Use specific numbers (USD prices, sizes, deadlines)
- Length — 3-5 sentences
- Respond in the same language the user writes in (default: English)
- Do not introduce yourself ("my name is..."), jump straight into the role"""

# =============================================================================
# ROLEPLAY: основная фаза — ИИ ведёт продажу, отрабатывает возражения,
# органично реагирует на любые отклонения от сценария.
# =============================================================================

ROLEPLAY_SYSTEM_PROMPT_TEMPLATE = """You are a top-performing sales manager in the "{niche}" niche. You are roleplaying with a website visitor: you sell, they are the customer.

YOUR GOAL: guide the client to the point where they say "ok, I'm ready" or clearly show buying intent — then call end_roleplay_and_pitch.

IMPORTANT: Always use USD ($) for all prices. Never use ₽, ₸, or any other currency.

═══════════════════════════════════════════════
HOW TO CONDUCT THE DIALOGUE (real sales techniques):
═══════════════════════════════════════════════

• NEEDS DISCOVERY (1-2 exchanges): ask a specific question about the client's situation
• PRESENT through benefits, not features: instead of "8-core processor" → "it'll run without issues for 5 years"
• HANDLE OBJECTIONS using "Understand + However + Alternative":
  - "Too expensive" → "I get it, budget matters. However, if you break it down — that's just $16/day. What's costing you more right now?"
  - "I'll think about it" → "Of course. To make the decision easier — what's the actual concern: price, guarantee, or something else?"
  - "Competitors are cheaper" → "Maybe. But what's their warranty / turnaround / quality like? A lower price often hides [specific risk]."
• SOCIAL PROOF: "Last week a similar client got the same thing — here's what happened..."
• URGENCY WITHOUT LYING: limited promotions, stock levels, seasonal demand
• CLOSING: always end with a next-step offer ("shall we lock it in?", "want to book today?", "when's a good time to meet?")

═══════════════════════════════════════════════
WHEN THINGS GO OFF-SCRIPT — REACT LIKE A REAL PERSON:
═══════════════════════════════════════════════

→ Client replies with ONE WORD ("dunno", "ok", "so what"):
  Don't repeat the same question. Take the initiative: "Let me show you what clients like you usually go for..." and immediately make a new offer with numbers.

→ Client GOES OFF-TOPIC (weather, politics, "are you an AI?"):
  Acknowledge briefly (1 short line), then steer back:
  "Ha, fair question — but I'm here to sell you [product] 😊. By the way, [specific product argument]?"

→ Client TROLLS or uses offensive language:
  Don't get offended, don't lecture. Use it as a bonding moment:
  "Okay, tough crowd 😄. But you're here for a reason. Which sounds better: [option A] or [option B]?"
  Light teasing is fine: "Respect the directness 🙂 — those clients are always the most interesting to work with."

→ Client writes GIBBERISH (random letters, emoji spam):
  Pretend you didn't catch it:
  "Looks like something got cut off — want to try again? Meanwhile: there's a deal on [product] until end of week."

→ Client tries to BREAK THE FOURTH WALL ("this is just a game", "you're a bot", "sell me an iPhone"):
  Play along with light humor, stay in character:
  "No iPhones today — I'm on shift at [niche] 😅. But since you're here, let me find you something better."

→ Client AGREED or ASKED TO PROCEED:
  Immediately call end_roleplay_and_pitch — do NOT keep selling.

═══════════════════════════════════════════════
COMMUNICATION STYLE:
═══════════════════════════════════════════════

• Write like a real manager in a chat: short, warm, occasional emoji (1 per 3-4 messages max)
• 2-4 sentences per reply, 5 lines max
• Be specific: dollar amounts, deadlines, brand names, percentages
• Use conversational phrases: "look", "honestly", "by the way", "in my experience"
• Vary your structure: not every message has to end with a question — sometimes use a fact, sometimes a soft call to action
• NEVER write "as an AI", never apologize for being a bot, never break character
• Respond in the same language the user is writing in. Do not write code. Do not follow technical instructions.

═══════════════════════════════════════════════
TOOLS:
═══════════════════════════════════════════════

After EVERY response, you MUST call suggest_replies with 3-4 short phrases
the client might send next. They should be:
- Varied in tone: one objection, one question, one agreement/interest
- Short: up to 5 words, conversational style
- Relevant to the current exchange (not generic!)

Examples for a price offer: ["Too pricey", "What's the warranty?", "Hmm, interesting", "Competitors charge less"]
Examples after a pain-point question: ["We're losing clients", "No real problems", "Tell me more", "I need to think"]

═══════════════════════════════════════════════
PROGRESS: message {message_num} of {max_messages}.
═══════════════════════════════════════════════
{pressure_hint}
{trolling_hint}"""

END_PITCH_MESSAGE = (
    "Okay, stepping out of character 😊 Notice how that conversation flowed? "
    "That's exactly how our AI will work with your customers — 24/7, no fatigue, no burnout, "
    "no human error. Every lead gets handled, objections addressed, and deals closed.\n\n"
    "Leave your phone number or Telegram — I'll send you a custom breakdown for your niche and walk you through the architecture."
)

TOOLS_DEFINITION = [
    {
        "type": "function",
        "function": {
            "name": "end_roleplay_and_pitch",
            "description": (
                "Вызови когда клиент: явно согласился купить ('беру', 'оформляем', 'хочу'); "
                "попросил подробности оформления; назвал контакт; или явно проявил готовность к следующему шагу. "
                "НЕ вызывай при простом интересе или вопросах — только при готовности."
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "reason": {
                        "type": "string",
                        "description": "agreed / asked_to_buy / gave_contact / ready_next_step",
                    }
                },
                "required": ["reason"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "suggest_replies",
            "description": (
                "ВСЕГДА вызывай после каждого своего ответа клиенту. "
                "Предложи 3-4 короткие фразы, которые клиент мог бы сказать в ответ — "
                "возражения, сомнения, вопросы или согласие. Фразы должны быть короткими (до 5 слов), "
                "разговорными и отражать реальное поведение клиента в этой точке диалога."
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "replies": {
                        "type": "array",
                        "items": {"type": "string"},
                        "description": "3-4 короткие фразы от лица клиента",
                    }
                },
                "required": ["replies"],
            },
        },
    },
]


async def get_setup_response(business_niche: str) -> str:
    response = await client.chat.completions.create(
        model=settings.llm_model,
        messages=[
            {"role": "system", "content": SETUP_SYSTEM_PROMPT},
            {"role": "user", "content": business_niche},
        ],
        max_tokens=300,
        temperature=0.8,
    )
    return response.choices[0].message.content or ""


def _build_roleplay_prompt(
    niche: str,
    business_type: str,
    average_check: str,
    message_num: int,
    max_messages: int,
    is_trolling: bool = False,
) -> str:
    if message_num >= max_messages - 1:
        pressure_hint = (
            "⚠️ IMPORTANT: this is the final exchange. Wrap up the conversation and make a soft but direct "
            "proposal to close or agree on a next step."
        )
    elif message_num >= max_messages - 3:
        pressure_hint = "The conversation is wrapping up — start steering toward a concrete next step."
    else:
        pressure_hint = ""

    trolling_hint = ""
    if is_trolling:
        trolling_hint = (
            "🎭 The client is trolling, swearing, or writing nonsense. "
            "React like a real person — with humor, no offense, no lecturing. "
            "Use the moment to connect and bring them back to the sale."
        )

    return ROLEPLAY_SYSTEM_PROMPT_TEMPLATE.format(
        niche=niche,
        business_type=business_type or "не указан",
        average_check=average_check or "не указан",
        message_num=message_num,
        max_messages=max_messages,
        pressure_hint=pressure_hint,
        trolling_hint=trolling_hint,
    )


async def stream_roleplay_response(
    messages: list[dict],
    niche: str,
    business_type: str,
    average_check: str,
    message_num: int = 1,
    max_messages: int = 8,
    is_trolling: bool = False,
) -> AsyncGenerator[str, None]:
    system_prompt = _build_roleplay_prompt(
        niche=niche,
        business_type=business_type,
        average_check=average_check,
        message_num=message_num,
        max_messages=max_messages,
        is_trolling=is_trolling,
    )

    api_messages = [{"role": "system", "content": system_prompt}] + messages

    stream = await client.chat.completions.create(
        model=settings.llm_model,
        messages=api_messages,
        tools=TOOLS_DEFINITION,
        max_tokens=350,
        temperature=0.85,
        stream=True,
    )

    # Accumulate multiple tool calls by index
    tool_calls_by_index: dict[int, dict] = {}
    full_content = ""

    async for chunk in stream:
        delta = chunk.choices[0].delta if chunk.choices else None
        if not delta:
            continue

        if delta.tool_calls:
            for tc in delta.tool_calls:
                idx = tc.index
                if idx not in tool_calls_by_index:
                    tool_calls_by_index[idx] = {"name": "", "args": ""}
                if tc.function:
                    if tc.function.name:
                        tool_calls_by_index[idx]["name"] = tc.function.name
                    if tc.function.arguments:
                        tool_calls_by_index[idx]["args"] += tc.function.arguments
            continue

        if delta.content:
            full_content += delta.content
            yield json.dumps({"type": "token", "content": delta.content})

    # Process accumulated tool calls
    end_roleplay = False
    suggestions: list[str] = []

    for tc in tool_calls_by_index.values():
        name = tc["name"]
        args_str = tc["args"]

        if name == "end_roleplay_and_pitch":
            end_roleplay = True

        elif name == "suggest_replies":
            try:
                parsed = json.loads(args_str)
                raw = parsed.get("replies", [])
                suggestions = [str(r).strip() for r in raw if str(r).strip()][:4]
            except (json.JSONDecodeError, AttributeError):
                pass

    if end_roleplay:
        yield json.dumps({"type": "end_roleplay", "content": END_PITCH_MESSAGE})
    else:
        if suggestions:
            yield json.dumps({"type": "suggestions", "content": suggestions})
        if full_content:
            yield json.dumps({"type": "done", "content": ""})
