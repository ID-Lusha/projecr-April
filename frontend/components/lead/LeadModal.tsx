"use client";

import { cn } from "@/lib/cn";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { useLeadModal } from "./LeadContext";
import { PhoneInput } from "@/components/ui/PhoneInput";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function submitDirectLead(data: {
  name: string;
  phone: string;
  niche: string;
}) {
  const res = await fetch(`${API_URL}/chat/lead`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      session_id: null,
      phone: data.phone,
      telegram: null,
      name: data.name,
      business_niche: data.niche,
    }),
  });
  if (!res.ok) throw new Error("Ошибка отправки");
  return res.json();
}

export function LeadModal() {
  const { isOpen, closeModal, source } = useLeadModal();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const [niche, setNiche] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstInputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeModal]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setLoading(true);
    setError("");
    try {
      await submitDirectLead({ name, phone, niche });
      setDone(true);
    } catch {
      setError("Не удалось отправить. Попробуйте позвонить напрямую.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setDone(false);
      setName("");
      setPhone("");
      setNiche("");
      setError("");
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-md rounded-xl border border-border bg-background p-6 shadow-2xl"
          >
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Закрыть"
            >
              <X className="h-4 w-4" />
            </button>

            {done ? (
              <div className="flex flex-col items-center gap-4 py-4 text-center">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
                <h3 className="text-xl font-bold tracking-tight">
                  Заявка принята!
                </h3>
                <p className="text-muted-foreground">
                  Мы свяжемся с вами в течение 15 минут и рассчитаем стоимость
                  под ваш бизнес.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-2 inline-flex h-10 items-center justify-center rounded-md bg-accent px-6 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
                >
                  Отлично, жду!
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold tracking-tight">
                  Получить расчёт за 24 часа
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Без обязательств. 30 минут — и вы поймёте, окупится ли это
                  для вашего бизнеса.
                </p>

                <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                  <input
                    ref={firstInputRef}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ваше имя"
                    className={cn(
                      "w-full rounded-md border border-border bg-muted px-3 py-2.5",
                      "text-base placeholder:text-muted-foreground",
                      "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                    )}
                  />
                  <PhoneInput
                    value={phone}
                    onChange={setPhone}
                    required
                    inputRef={phoneInputRef}
                  />
                  <input
                    type="text"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    placeholder="Ваша ниша (стоматология, опт, e-com...)"
                    className={cn(
                      "w-full rounded-md border border-border bg-muted px-3 py-2.5",
                      "text-base placeholder:text-muted-foreground",
                      "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                    )}
                  />

                  {error && (
                    <p className="text-sm text-destructive">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !phone.trim()}
                    className={cn(
                      "flex h-12 w-full items-center justify-center rounded-md",
                      "bg-accent text-base font-semibold text-accent-foreground",
                      "transition-colors hover:bg-accent/90 active:scale-[0.98]",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                  >
                    {loading ? "Отправка..." : "Получить расчёт →"}
                  </button>

                  <p className="text-center text-xs text-muted-foreground">
                    Без предоплаты · Ответим в течение 15 минут
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
