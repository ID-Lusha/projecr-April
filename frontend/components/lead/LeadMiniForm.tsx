"use client";

import { cn } from "@/lib/cn";
import { type FormEvent, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { PhoneInput } from "@/components/ui/PhoneInput";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface LeadMiniFormProps {
  placeholder?: string;
  buttonText?: string;
  className?: string;
}

export function LeadMiniForm({
  placeholder = "Ваш телефон / WhatsApp",
  buttonText = "Получить расчёт",
  className,
}: LeadMiniFormProps) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/chat/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: null,
          phone: phone.trim(),
          telegram: null,
        }),
      });
      if (!res.ok) throw new Error();
      setDone(true);
    } catch {
      setError("Ошибка. Напишите нам напрямую.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className={cn("flex items-center gap-2 text-sm font-medium text-green-600", className)}>
        <CheckCircle2 className="h-5 w-5" />
        Заявка принята — свяжемся в течение 24 часов
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-2", className)}>
      <div className="flex flex-col gap-2 sm:flex-row">
        <PhoneInput
          value={phone}
          onChange={setPhone}
          required
          className="flex-1"
          inputClassName="bg-background"
        />
        <button
          type="submit"
          disabled={loading || !phone.trim()}
          className={cn(
            "flex h-[44px] shrink-0 items-center justify-center rounded-md",
            "bg-accent px-6 text-base font-semibold text-accent-foreground",
            "transition-colors hover:bg-accent/90 active:scale-[0.98]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "whitespace-nowrap"
          )}
        >
          {loading ? "..." : buttonText}
        </button>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </form>
  );
}
