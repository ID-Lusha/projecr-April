from pydantic import BaseModel, Field


class ChatStartRequest(BaseModel):
    business_niche: str = Field(..., max_length=200)


class ChatMessageRequest(BaseModel):
    session_id: str
    message: str = Field(..., max_length=500)


class ChatStartResponse(BaseModel):
    session_id: str
    ai_message: str


class LeadSubmitRequest(BaseModel):
    session_id: str | None = None
    phone: str | None = None
    telegram: str | None = None
    name: str | None = None
    business_niche: str | None = None


class LeadSubmitResponse(BaseModel):
    success: bool
    message: str
