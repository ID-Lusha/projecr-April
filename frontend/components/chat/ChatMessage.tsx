"use client";

import { cn } from "@/lib/cn";
import { Bot, User } from "lucide-react";
import { motion } from "framer-motion";
import type { ChatMessage as ChatMessageType } from "./useChatState";

interface ChatMessageProps {
  message: ChatMessageType;
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-1 py-2">
      <span className="typing-dot h-2 w-2 rounded-full bg-muted-foreground" />
      <span className="typing-dot h-2 w-2 rounded-full bg-muted-foreground" />
      <span className="typing-dot h-2 w-2 rounded-full bg-muted-foreground" />
    </div>
  );
}

export function ChatMessageBubble({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const isEmpty = !message.content && message.isStreaming;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn("flex gap-3", isUser ? "flex-row-reverse" : "flex-row")}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser
            ? "bg-accent text-accent-foreground"
            : "border border-border bg-muted"
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-2.5 text-sm leading-relaxed sm:text-base",
          isUser
            ? "bg-accent text-accent-foreground"
            : "border border-border bg-muted"
        )}
      >
        {isEmpty ? (
          <TypingIndicator />
        ) : (
          <p className="whitespace-pre-wrap">{message.content}</p>
        )}
      </div>
    </motion.div>
  );
}
