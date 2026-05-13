"use client";

import { cn } from "@/lib/cn";
import { SendHorizontal } from "lucide-react";
import { type FormEvent, type KeyboardEvent, useRef, useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function ChatInput({ onSend, placeholder, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 border-t border-border bg-background p-3 sm:p-4"
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        placeholder={placeholder || "Напишите сообщение..."}
        disabled={disabled}
        rows={1}
        className={cn(
          "flex-1 resize-none rounded-md border border-border bg-muted px-3 py-2.5",
          "text-base leading-normal placeholder:text-muted-foreground",
          "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "min-h-[44px]"
        )}
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className={cn(
          "flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-md",
          "bg-accent text-accent-foreground transition-colors",
          "hover:bg-accent/90 active:scale-95",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        aria-label="Отправить"
      >
        <SendHorizontal className="h-5 w-5" />
      </button>
    </form>
  );
}
