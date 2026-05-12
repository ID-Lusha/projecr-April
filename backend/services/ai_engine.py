import json
from collections.abc import AsyncGenerator

from openai import AsyncOpenAI

from config import settings

client = AsyncOpenAI(api_key=settings.openai_api_key)

SETUP_SYSTEM_PROMPT = """Ты — умный ИИ-ассистент на лендинге компании, которая внедряет ИИ-системы продаж для бизнеса.
Пользователь только что указал свою нишу бизнеса. Задай ему ОДИН короткий уточняющий вопрос:
спроси, B2B или B2C у него бизнес, и какой примерно средний чек.
Ответь дружелюбно, коротко (1-2 предложения). Не представляйся."""

ROLEPLAY_SYSTEM_PROMPT_TEMPLATE = """Ты — топовый менеджер по продажам. Ты продаешь продукт/услугу из ниши "{niche}".
Тип бизнеса: {business_type}. Средний чек: {average_check}.

Пользователь — сложный клиент, который сомневается. Твоя цель — продать ему его же продукт/услугу.

Правила:
- Задавай открытые вопросы
- Отрабатывай возражения профессионально
- Отвечай КОРОТКО: 1-2 предложения максимум
- Будь настойчив, но вежлив
- Используй конкретные цифры и выгоды
- НЕ представляйся, сразу начинай продавать
- Говори на русском языке"""

END_PITCH_MESSAGE = (
    "Ну как? 😊 Мои алгоритмы готовы так же закрывать сделки в вашем бизнесе 24/7. "
    "Встроим такую систему в ваши соцсети и свяжем с CRM? "
    "Оставьте телефон или Telegram — обсудим архитектуру решения под ваш бизнес."
)

TOOLS_DEFINITION = [
    {
        "type": "function",
        "function": {
            "name": "end_roleplay_and_pitch",
            "description": (
                "Вызови эту функцию, когда клиент явно согласился на покупку, "
                "проявил сильный интерес, или попросил оформить заказ/узнать подробности."
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "reason": {
                        "type": "string",
                        "description": "Причина завершения: agreed, interested, asked_details",
                    }
                },
                "required": ["reason"],
            },
        },
    }
]


async def get_setup_response(business_niche: str) -> str:
    response = await client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": SETUP_SYSTEM_PROMPT},
            {"role": "user", "content": f"Моя ниша: {business_niche}"},
        ],
        max_tokens=150,
        temperature=0.7,
    )
    return response.choices[0].message.content or ""


async def stream_roleplay_response(
    messages: list[dict],
    niche: str,
    business_type: str,
    average_check: str,
) -> AsyncGenerator[str, None]:
    system_prompt = ROLEPLAY_SYSTEM_PROMPT_TEMPLATE.format(
        niche=niche,
        business_type=business_type or "не указан",
        average_check=average_check or "не указан",
    )

    api_messages = [{"role": "system", "content": system_prompt}] + messages

    stream = await client.chat.completions.create(
        model="gpt-4o",
        messages=api_messages,
        tools=TOOLS_DEFINITION,
        max_tokens=200,
        temperature=0.8,
        stream=True,
    )

    function_call_name = ""
    function_call_args = ""
    full_content = ""

    async for chunk in stream:
        delta = chunk.choices[0].delta if chunk.choices else None
        if not delta:
            continue

        if delta.tool_calls:
            tc = delta.tool_calls[0]
            if tc.function and tc.function.name:
                function_call_name = tc.function.name
            if tc.function and tc.function.arguments:
                function_call_args += tc.function.arguments
            continue

        if delta.content:
            full_content += delta.content
            yield json.dumps({"type": "token", "content": delta.content})

    if function_call_name == "end_roleplay_and_pitch":
        yield json.dumps({"type": "end_roleplay", "content": END_PITCH_MESSAGE})
    elif full_content:
        yield json.dumps({"type": "done", "content": ""})
