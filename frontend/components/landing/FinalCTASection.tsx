"use client";

import { cn } from "@/lib/cn";
import { FadeInView } from "@/components/animations/FadeInView";
import { CONTACTS } from "@/lib/contacts";
import { X, CheckCircle2, Phone, MessageCircle, Send } from "lucide-react";
import { type FormEvent, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const leftSide = [
  "Продолжаете терять 70% заявок",
  "Платите за рекламу впустую",
  "Тратите силы на найм менеджеров",
  "Бизнес стоит в ночь и выходные",
  "Не понимаете, что реально окупается",
];

const rightSide = [
  "Лиды обрабатываются за 2 секунды",
  "Конверсия растёт в 2–3 раза",
  "Экономия на ФОТ от 40%",
  "Система работает 24/7 без выходных",
  "Вы видите ROI в реальном времени",
];

const inputClass = cn(
  "w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2.5",
  "text-base text-white placeholder:text-zinc-500",
  "focus:outline-none focus:ring-2 focus:ring-accent/60 focus:border-accent"
);

export function FinalCTASection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [niche, setNiche] = useState("");
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
          name: name.trim(),
          business_niche: niche.trim(),
        }),
      });
      if (!res.ok) throw new Error();
      setDone(true);
    } catch {
      setError("Не удалось отправить. Попробуйте позвонить напрямую.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-zinc-950 py-20 px-4 md:py-32">
      <div className="mx-auto max-w-5xl">
        <FadeInView>
          <h2 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Решение из двух вариантов
          </h2>
        </FadeInView>

        <FadeInView delay={0.1}>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-16">
            {/* Left — bad */}
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5 sm:p-6">
              <p className="mb-4 flex items-center gap-2 text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                <X className="h-4 w-4" />
                Оставить как есть
              </p>
              <ul className="space-y-3">
                {leftSide.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — good */}
            <div className="rounded-lg border border-accent/40 bg-accent/10 p-5 sm:p-6">
              <p className="mb-4 flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-widest">
                <CheckCircle2 className="h-4 w-4" />
                Поставить ИИ-отдел продаж
              </p>
              <ul className="space-y-3">
                {rightSide.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm font-medium text-white">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeInView>

        {/* Form */}
        <FadeInView delay={0.2}>
          <div className="mt-12 mx-auto max-w-lg rounded-xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
            {done ? (
              <div className="flex flex-col items-center gap-4 py-4 text-center">
                <CheckCircle2 className="h-12 w-12 text-green-400" />
                <p className="text-xl font-bold text-white">Заявка принята!</p>
                <p className="text-sm text-zinc-400">
                  Свяжемся в течение 24 часов и рассчитаем всё для вашего бизнеса.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold tracking-tight text-center text-white">
                  Получить расчёт за 24 часа
                </h3>
                <p className="mt-1 text-sm text-zinc-400 text-center">
                  30 минут вашего времени — и вы поймёте, окупится ли это для
                  ВАШЕГО бизнеса. Без обязательств.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ваше имя"
                    className={inputClass}
                  />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Телефон / WhatsApp *"
                    className={inputClass}
                  />
                  <input
                    type="text"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    placeholder="Ваша ниша (стоматология, опт, SaaS...)"
                    className={inputClass}
                  />

                  {error && <p className="text-sm text-red-400">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading || !phone.trim()}
                    className={cn(
                      "flex h-12 w-full items-center justify-center rounded-md",
                      "bg-accent text-base font-semibold text-white",
                      "transition-colors hover:bg-accent/90 active:scale-[0.98]",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                  >
                    {loading ? "Отправка..." : "Получить расчёт за 24 часа →"}
                  </button>
                </form>
              </>
            )}

            <div className="mt-5 text-center text-xs text-zinc-600">
              или свяжитесь напрямую
            </div>
            <div className="mt-3 flex items-center justify-center gap-3">
              <a
                href={CONTACTS.phoneHref}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 text-zinc-400 transition-colors hover:text-white hover:border-zinc-500"
                aria-label="Позвонить"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href={CONTACTS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 text-zinc-400 transition-colors hover:text-white hover:border-zinc-500"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href={CONTACTS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 text-zinc-400 transition-colors hover:text-white hover:border-zinc-500"
                aria-label="Telegram"
              >
                <Send className="h-4 w-4" />
              </a>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
