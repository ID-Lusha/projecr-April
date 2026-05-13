"use client";

import { cn } from "@/lib/cn";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { type FormEvent, useState } from "react";
import { PhoneInput } from "@/components/ui/PhoneInput";

interface LeadCaptureFormProps {
  onSubmit: (phone?: string, telegram?: string) => void;
  isLoading: boolean;
}

export function LeadCaptureForm({ onSubmit, isLoading }: LeadCaptureFormProps) {
  const [phone, setPhone] = useState("");
  const [telegram, setTelegram] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!phone.trim() && !telegram.trim()) return;
    onSubmit(phone.trim() || undefined, telegram.trim() || undefined);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="mx-3 my-2"
    >
      <form
        onSubmit={handleSubmit}
        className="rounded-lg border border-accent/30 bg-accent/5 p-4 space-y-3"
      >
        <p className="text-sm font-medium text-foreground">
          Оставьте контакт — обсудим архитектуру:
        </p>

        <div className="space-y-2">
          <PhoneInput
            value={phone}
            onChange={setPhone}
          />

          <input
            type="text"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
            placeholder="Telegram: @username"
            className={cn(
              "w-full rounded-md border border-border bg-background px-3 py-2.5",
              "text-base placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
            )}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || (!phone.trim() && !telegram.trim())}
          className={cn(
            "flex h-[44px] w-full items-center justify-center gap-2 rounded-md",
            "bg-accent text-accent-foreground text-sm font-medium",
            "transition-colors hover:bg-accent/90 active:scale-[0.98]",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          <Send className="h-4 w-4" />
          {isLoading ? "Отправка..." : "Обсудить архитектуру"}
        </button>
      </form>
    </motion.div>
  );
}
