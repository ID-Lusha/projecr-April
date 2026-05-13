import re

# Patterns that are hard-blocked regardless (prompt injection / code execution)
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

# Patterns that indicate trolling/hostility — passed to AI with a flag, not blocked
TROLLING_PATTERNS_RU = [
    r"\bбля\b", r"\bсук[аи]\b", r"\bхуй\b", r"\bпизд[аеёоуыц]",
    r"\bеба[тнл]", r"\bнахуй\b", r"\bпиздец\b", r"\bмуда[кч]",
    r"\bиди\s+нах", r"\bотвали\b", r"\bзаткнись\b", r"\bтупой\b",
]
TROLLING_PATTERNS_EN = [
    r"\bfuck\b", r"\bshit\b", r"\bbitch\b", r"\bdamn\b", r"\bbastard\b",
    r"\bstupid\b", r"\bidiot\b",
]

# Nonsense / very short / meaningless heuristics
NONSENSE_PATTERN = re.compile(
    r"^[^а-яёa-z0-9\s]{3,}$|^(.)\1{4,}$",  # только спецсимволы или повторяющийся символ
    re.IGNORECASE,
)

MAX_MESSAGE_LENGTH = 500

_injection_re = re.compile("|".join(INJECTION_PATTERNS), re.IGNORECASE)
_trolling_re = re.compile(
    "|".join(TROLLING_PATTERNS_RU + TROLLING_PATTERNS_EN),
    re.IGNORECASE,
)


class GuardrailResult:
    def __init__(
        self,
        passed: bool,
        reason: str = "",
        is_trolling: bool = False,
        is_nonsense: bool = False,
    ):
        self.passed = passed
        self.reason = reason
        self.is_trolling = is_trolling
        self.is_nonsense = is_nonsense


def check_message(text: str) -> GuardrailResult:
    if not text.strip():
        return GuardrailResult(False, "Message cannot be empty.")

    if len(text) > MAX_MESSAGE_LENGTH:
        return GuardrailResult(False, "Message is too long. Maximum 500 characters.")

    # Hard block: prompt injection / code requests
    if _injection_re.search(text):
        return GuardrailResult(
            False,
            "Let's keep the focus on your business. How can I help?",
        )

    is_trolling = bool(_trolling_re.search(text))
    is_nonsense = bool(NONSENSE_PATTERN.match(text.strip())) or (
        len(text.strip()) <= 3 and not text.strip().isdigit()
    )

    # Pass through to AI with context flags — let AI handle it gracefully
    return GuardrailResult(True, is_trolling=is_trolling, is_nonsense=is_nonsense or is_trolling)
