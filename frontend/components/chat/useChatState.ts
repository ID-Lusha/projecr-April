"use client";

import { useCallback, useRef, useState } from "react";
import { startChat, streamChatMessage, submitLead } from "@/lib/api";

export type ChatStage = "idle" | "setup" | "roleplay" | "lead_capture" | "done";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

interface ChatState {
  stage: ChatStage;
  messages: ChatMessage[];
  sessionId: string | null;
  isLoading: boolean;
  error: string | null;
}

let msgCounter = 0;
function createMsgId(): string {
  return `msg-${Date.now()}-${++msgCounter}`;
}

export function useChatState() {
  const [state, setState] = useState<ChatState>({
    stage: "idle",
    messages: [],
    sessionId: null,
    isLoading: false,
    error: null,
  });

  const streamingContentRef = useRef("");

  const initChat = useCallback(async (businessNiche: string) => {
    setState((prev) => ({
      ...prev,
      stage: "setup",
      isLoading: true,
      error: null,
      messages: [
        {
          id: createMsgId(),
          role: "user",
          content: businessNiche,
        },
      ],
    }));

    try {
      const { session_id, ai_message } = await startChat(businessNiche);
      setState((prev) => ({
        ...prev,
        sessionId: session_id,
        isLoading: false,
        messages: [
          ...prev.messages,
          { id: createMsgId(), role: "assistant", content: ai_message },
        ],
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : "Ошибка",
      }));
    }
  }, []);

  const sendMessage = useCallback(
    (message: string) => {
      if (!state.sessionId) return;

      const userMsg: ChatMessage = {
        id: createMsgId(),
        role: "user",
        content: message,
      };

      const streamingMsgId = createMsgId();
      const streamingMsg: ChatMessage = {
        id: streamingMsgId,
        role: "assistant",
        content: "",
        isStreaming: true,
      };

      setState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
        stage: prev.stage === "setup" ? "roleplay" : prev.stage,
        messages: [...prev.messages, userMsg, streamingMsg],
      }));

      streamingContentRef.current = "";

      streamChatMessage(
        state.sessionId!,
        message,
        (token) => {
          streamingContentRef.current += token;
          const currentContent = streamingContentRef.current;
          setState((prev) => ({
            ...prev,
            messages: prev.messages.map((m) =>
              m.id === streamingMsgId
                ? { ...m, content: currentContent }
                : m
            ),
          }));
        },
        (pitchMessage) => {
          setState((prev) => ({
            ...prev,
            stage: "lead_capture",
            isLoading: false,
            messages: prev.messages.map((m) =>
              m.id === streamingMsgId
                ? { ...m, content: pitchMessage, isStreaming: false }
                : m
            ),
          }));
        },
        () => {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            messages: prev.messages.map((m) =>
              m.id === streamingMsgId ? { ...m, isStreaming: false } : m
            ),
          }));
        },
        (error) => {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error,
            messages: prev.messages.filter((m) => m.id !== streamingMsgId),
          }));
        },
      );
    },
    [state.sessionId],
  );

  const handleSubmitLead = useCallback(
    async (phone?: string, telegram?: string) => {
      if (!state.sessionId) return;
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        await submitLead({
          session_id: state.sessionId,
          phone,
          telegram,
        });
        setState((prev) => ({
          ...prev,
          stage: "done",
          isLoading: false,
          messages: [
            ...prev.messages,
            {
              id: createMsgId(),
              role: "assistant",
              content: "Спасибо! Мы свяжемся с вами в ближайшее время и обсудим архитектуру ИИ-решения для вашего бизнеса.",
            },
          ],
        }));
      } catch (err) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: err instanceof Error ? err.message : "Ошибка",
        }));
      }
    },
    [state.sessionId],
  );

  const reset = useCallback(() => {
    setState({
      stage: "idle",
      messages: [],
      sessionId: null,
      isLoading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    initChat,
    sendMessage,
    handleSubmitLead,
    reset,
  };
}
