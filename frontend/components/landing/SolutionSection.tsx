"use client";

import { FadeInView } from "@/components/animations/FadeInView";
import { LeadMiniForm } from "@/components/lead/LeadMiniForm";
import { PhoneCall, Zap, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: PhoneCall,
    title: "Созвон 30 минут",
    text: "Разбираем вашу нишу, средний чек и текущую воронку. Показываем, где именно теряются ваши деньги. Бесплатно, без обязательств.",
  },
  {
    number: "02",
    icon: Zap,
    title: "Запуск за 7 дней",
    text: "Мы делаем всё сами: настраиваем рекламу, создаём лендинг, обучаем ИИ под вашу нишу, интегрируем с вашей CRM и платёжными шлюзами.",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Вы получаете лиды",
    text: "Каждый разговор — в CRM. Каждая оплата — в вашем платёжном шлюзе. Каждая цифра — в дашборде. Вы просто смотрите на результат.",
  },
];

export function SolutionSection() {
  return (
    <section className="py-20 px-4 md:py-32">
      <div className="mx-auto max-w-5xl">
        <FadeInView>
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Решение <span className="text-accent">проще, чем кажется</span>
          </h2>
        </FadeInView>

        <FadeInView delay={0.1}>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base text-muted-foreground sm:text-lg">
            Не нужно нанимать программистов.{" "}
            Не нужно учить CRM.{" "}
            Не нужно ничего делать самому.
          </p>
        </FadeInView>

        <div className="mt-12 md:mt-16">
          {/* Desktop: horizontal steps */}
          <div className="hidden md:grid md:grid-cols-3 gap-0 relative">
            <div className="absolute top-10 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-border" />
            {steps.map((step, i) => (
              <FadeInView key={i} delay={0.1 * (i + 1)}>
                <div className="relative flex flex-col items-center px-6 text-center">
                  <div className="relative z-10 mb-5 flex h-20 w-20 items-center justify-center rounded-full border-2 border-accent bg-background">
                    <step.icon className="h-8 w-8 text-accent" />
                    <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.text}</p>
                </div>
              </FadeInView>
            ))}
          </div>

          {/* Mobile: vertical steps */}
          <div className="flex flex-col gap-4 md:hidden">
            {steps.map((step, i) => (
              <FadeInView key={i} delay={0.1 * (i + 1)}>
                <div className="flex gap-4 rounded-lg border border-border bg-background p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-background">
                    <step.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-accent">{step.number}</span>
                      <h3 className="font-semibold tracking-tight">{step.title}</h3>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{step.text}</p>
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>

        {/* Mini lead form */}
        <FadeInView delay={0.4}>
          <div className="mt-12 rounded-xl border border-accent/20 bg-accent/5 p-6 sm:p-8">
            <p className="mb-4 text-center text-base font-semibold sm:text-lg">
              Оставьте телефон — рассчитаем стоимость для вашей ниши за 24 часа
            </p>
            <LeadMiniForm
              placeholder="Ваш телефон / WhatsApp"
              buttonText="Получить расчёт"
              className="max-w-lg mx-auto"
            />
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Без предоплаты · Без обязательств · Ответим в течение 24 часов
            </p>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
