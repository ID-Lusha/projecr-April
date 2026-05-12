"use client";

import { FadeInView } from "@/components/animations/FadeInView";
import { Bot, ArrowDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-16">
      <div className="mx-auto max-w-4xl text-center">
        <FadeInView>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground">
            <Bot className="h-4 w-4 text-accent" />
            Комплексная ИИ-автоматизация
          </div>
        </FadeInView>

        <FadeInView delay={0.1}>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Хватит терять клиентов
            <br />
            <span className="text-accent">из-за человеческого фактора</span>
          </h1>
        </FadeInView>

        <FadeInView delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl">
            Внедряем ИИ-систему продаж, которая обрабатывает лиды за{" "}
            <span className="font-semibold text-foreground">2 секунды, 24/7</span>.
            От настройки трафика и создания сайта до кастомных ИИ-ассистентов,
            интегрированных с вашей CRM и Kaspi/Stripe.
          </p>
        </FadeInView>

        <FadeInView delay={0.3}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#demo"
              className="inline-flex h-12 min-w-[44px] items-center justify-center rounded-md bg-accent px-8 text-base font-medium text-accent-foreground transition-all hover:bg-accent/90 active:scale-[0.98]"
            >
              Проверить ИИ в деле
            </a>
            <a
              href="#architecture"
              className="inline-flex h-12 min-w-[44px] items-center justify-center rounded-md border border-border px-8 text-base font-medium transition-colors hover:bg-muted active:scale-[0.98]"
            >
              Как это работает
            </a>
          </div>
        </FadeInView>
      </div>

      <FadeInView delay={0.5} className="absolute bottom-8">
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
