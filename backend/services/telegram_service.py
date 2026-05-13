import logging
from typing import Optional

import httpx

from config import settings

logger = logging.getLogger(__name__)

TELEGRAM_API_URL = "https://api.telegram.org/bot{token}/sendMessage"


async def send_lead_notification(
    name: Optional[str],
    phone: Optional[str],
    niche: Optional[str],
    session_id: Optional[str] = None,
) -> None:
    if not settings.telegram_bot_token or not settings.telegram_chat_id:
        logger.warning("Telegram не настроен: отсутствует TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID")
        return

    lines = [
        "🚀 <b>Новая заявка!</b>",
        "",
        f"👤 <b>Имя:</b> {name or 'Не указано'}",
        f"📱 <b>Телефон:</b> {phone or 'Не указан'}",
        f"🏢 <b>Ниша:</b> {niche or 'Не указана'}",
    ]
    if session_id:
        lines.append(f"🆔 <b>Сессия:</b> <code>{session_id}</code>")

    text = "\n".join(lines)

    try:
        url = TELEGRAM_API_URL.format(token=settings.telegram_bot_token)
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(
                url,
                json={
                    "chat_id": settings.telegram_chat_id,
                    "text": text,
                    "parse_mode": "HTML",
                },
            )
            resp.raise_for_status()
    except Exception as exc:
        logger.error("Ошибка отправки Telegram уведомления: %s", exc)
