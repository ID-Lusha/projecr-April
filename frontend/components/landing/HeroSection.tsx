"use client";

import { FadeInView } from "@/components/animations/FadeInView";
import { useLeadModal } from "@/components/lead/LeadContext";
import { Bot, ArrowDown, ShieldCheck } from "lucide-react";

export function HeroSection() {
  const { openModal } = useLeadModal();

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-16">
      <div className="mx-auto max-w-4xl text-center">
        <FadeInView>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground">
            <Bot className="h-4 w-4 text-accent" />
            ИИ-отдел продаж под ключ
          </div>
        </FadeInView>

        <FadeInView delay={0.1}>
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Ваш бизнес теряет до 70% клиентов
            <br className="hidden sm:block" />
            <span className="text-accent"> на этапе обработки заявок.</span>
            <br />
            Мы это останавливаем.
          </h1>
        </FadeInView>

        <FadeInView delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl">
            Внедряем ИИ-менеджера, который отвечает за{" "}
            <span className="font-semibold text-foreground">2 секунды, 24/7</span>,
            никогда не уходит на больничный и закрывает в{" "}
            <span className="font-semibold text-foreground">3 раза больше заявок</span>,
            чем живой отдел продаж.{" "}
            <span className="font-semibold text-foreground">Под ключ:</span>{" "}
            реклама + сайт + ИИ + CRM + платёжные шлюзы.
          </p>
        </FadeInView>

        <FadeInView delay={0.3}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={() => openModal("hero")}
              className="inline-flex h-12 min-w-[44px] items-center justify-center rounded-md bg-accent px-8 text-base font-semibold text-accent-foreground transition-all hover:bg-accent/90 active:scale-[0.98]"
            >
              Получить расчёт за 24 часа →
            </button>
            <a
              href="#demo"
              className="inline-flex h-12 min-w-[44px] items-center justify-center rounded-md border border-border px-8 text-base font-medium transition-colors hover:bg-muted active:scale-[0.98]"
            >
              Проверить ИИ прямо сейчас
            </a>
          </div>
        </FadeInView>

        <FadeInView delay={0.4}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-accent" />
              Без предоплаты
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-accent" />
              Окупаемость от 14 дней
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-accent" />
              Уже работает в 40+ компаниях по всему миру
            </span>
          </div>
        </FadeInView>
      </div>

      <FadeInView delay={0.6} className="mt-12">
        <a
          href="#problem"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground hover:border-foreground"
          aria-label="Scroll down"
        >
          <ArrowDown className="h-4 w-4" />
        </a>
      </FadeInView>
    </section>
  );
}
