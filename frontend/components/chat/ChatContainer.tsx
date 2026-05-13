"use client";

import { cn } from "@/lib/cn";
import { RotateCcw } from "lucide-react";
import { useEffect, useRef } from "react";
import { ChatInput } from "./ChatInput";
import { ChatMessageBubble } from "./ChatMessage";
import { ChatMetrics } from "./ChatMetrics";
import { LeadCaptureForm } from "./LeadCaptureForm";
import { QuickReplies } from "./QuickReplies";
import { SceneCard } from "./SceneCard";
import { useChatState } from "./useChatState";

export function ChatContainer() {
  const {
    stage,
    messages,
    isLoading,
    error,
    suggestions,
    initChat,
    sendMessage,
    handleSubmitLead,
    reset,
  } = useChatState();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const userMessageCount = messages.filter((m) => m.role === "user").length;

  const handleSend = (message: string) => {
    if (stage === "idle") {
      initChat(message);
    } else {
      sendMessage(message);
    }
  };

  const lastMessage = messages[messages.length - 1];
  const showQuickReplies =
    (stage === "setup" || stage === "roleplay") &&
    !isLoading &&
    lastMessage?.role === "assistant" &&
    !lastMessage.isStreaming &&
    suggestions.length > 0;

  const showSceneCard = messages.length === 1 && lastMessage?.role === "assistant" && !lastMessage.isStreaming;

  const getPlaceholder = () => {
    if (stage === "idle") return "Или напишите свою нишу...";
    if (stage === "setup") return "Ваш ответ...";
    if (stage === "roleplay") return "Ваш ответ...";
    return "";
  };

  return (
    <div className="flex gap-4 w-full">
      <ChatMetrics stage={stage} messageCount={userMessageCount} />

      <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-border bg-background">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <span className="h-3 w-3 rounded-full bg-green-500/70" />
            </div>
            <span className="ml-2 text-xs font-mono text-muted-foreground">
              ai-sales-demo
            </span>
          </div>
          {stage !== "idle" && (
            <button
              onClick={reset}
              className="flex h-8 min-w-[44px] items-center gap-1.5 rounded-md px-2 text-xs text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
              aria-label="Начать заново"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Заново</span>
            </button>
          )}
        </div>

        {/* Messages area */}
        <div
          ref={scrollRef}
          className={cn(
            "flex-1 overflow-y-auto p-4 space-y-4",
            "min-h-[300px] max-h-[400px] sm:min-h-[350px] sm:max-h-[450px]"
          )}
        >
          {stage === "idle" && (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="max-w-sm space-y-1.5">
                <p className="text-base font-semibold tracking-tight">
                  Введите вашу нишу — ИИ попробует продать вам ваш же продукт
                </p>
                <p className="text-xs text-muted-foreground">
                  Напишите, чем занимается ваш бизнес. Например:
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  "Стоматология",
                  "Опт автозапчастей",
                  "Онлайн-курсы",
                  "Юридические услуги",
                  "Фитнес-клуб",
                  "SaaS для HR",
                ].map((niche) => (
                  <button
                    key={niche}
                    onClick={() => handleSend(niche)}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                  >
                    {niche}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <ChatMessageBubble key={msg.id} message={msg} />
          ))}

          {showSceneCard && <SceneCard />}

          {showQuickReplies && (
            <div className="pt-1">
              <p className="mb-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                Ответить как клиент:
              </p>
              <QuickReplies suggestions={suggestions} onPick={handleSend} disabled={isLoading} />
            </div>
          )}

          {error && (
            <div className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}
        </div>

        {/* Lead capture form */}
        {stage === "lead_capture" && (
          <LeadCaptureForm onSubmit={handleSubmitLead} isLoading={isLoading} />
        )}

        {/* Input */}
        {stage !== "lead_capture" && stage !== "done" && (
          <ChatInput
            onSend={handleSend}
            placeholder={getPlaceholder()}
            disabled={isLoading}
          />
        )}

        {stage === "done" && (
          <div className="border-t border-border p-4 text-center">
            <button
              onClick={reset}
              className="inline-flex h-10 items-center gap-2 rounded-md border border-border px-4 text-sm font-medium transition-colors hover:bg-muted"
            >
              <RotateCcw className="h-4 w-4" />
              Попробовать ещё раз
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
