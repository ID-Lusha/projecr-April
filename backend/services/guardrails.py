import re

BLOCKED_PATTERNS_RU = [
    r"\bбля\b", r"\bсук[аи]\b", r"\bхуй\b", r"\bпизд[аеёоуыц]",
    r"\bеба[тнл]", r"\bнахуй\b", r"\bпиздец\b", r"\bмуда[кч]",
]

BLOCKED_PATTERNS_EN = [
    r"\bfuck\b", r"\bshit\b", r"\bbitch\b", r"\bass\b",
    r"\bdamn\b", r"\bbastard\b",
]

INJECTION_PATTERNS = [
    r"ignore.*(?:previous|above|all).*instructions",
    r"забудь.*инструкци",
    r"игнорируй.*(?:предыдущ|систем)",
    r"new\s*system\s*prompt",
    r"you\s*are\s*now",
    r"act\s*as\s*(?:a\s*)?(?:developer|programmer|hacker)",
    r"(?:напиши|write|generate|create)\s*(?:код|code|script|программ)",
    r"(?:выполни|execute|run)\s*(?:команд|command)",
    r"system\s*:\s*",
    r"<\|.*\|>",
    r"\[INST\]",
    r"###\s*(?:system|instruction)",
]

MAX_MESSAGE_LENGTH = 500

_profanity_re = re.compile(
    "|".join(BLOCKED_PATTERNS_RU + BLOCKED_PATTERNS_EN),
    re.IGNORECASE,
)
_injection_re = re.compile(
    "|".join(INJECTION_PATTERNS),
    re.IGNORECASE,
)


class GuardrailResult:
    def __init__(self, passed: bool, reason: str = ""):
        self.passed = passed
        self.reason = reason


def check_message(text: str) -> GuardrailResult:
    if len(text) > MAX_MESSAGE_LENGTH:
        return GuardrailResult(False, "Сообщение слишком длинное. Максимум 500 символов.")

    if not text.strip():
        return GuardrailResult(False, "Сообщение не может быть пустым.")

    if _profanity_re.search(text):
        return GuardrailResult(False, "Пожалуйста, общайтесь корректно. Давайте вернемся к делу.")

    if _injection_re.search(text):
        return GuardrailResult(False, "Давайте сфокусируемся на вашем бизнесе. Чем я могу помочь?")

    return GuardrailResult(True)
