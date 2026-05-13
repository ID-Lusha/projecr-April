"use client";

import { FadeInView } from "@/components/animations/FadeInView";
import { useLeadModal } from "@/components/lead/LeadContext";
import { CheckCircle2, Bot, Rocket } from "lucide-react";
import { cn } from "@/lib/cn";

const integrationPackage = {
  icon: Bot,
  badge: "Для тех, у кого уже есть трафик",
  badgeAccent: false,
  title: "ИИ-внедрение в вашу систему",
  description:
    "Подключаем ИИ-менеджера к вашей текущей CRM, сайту и каналам коммуникации. Отдельный дашборд для аналитики разговоров и конверсии.",
  features: [
    "Обучение ИИ-менеджера на ваших скриптах и базе знаний",
    "Интеграция с любой CRM (HubSpot, Salesforce, Pipedrive и др.)",
    "Подключение WhatsApp, Telegram, Instagram, веб-чат",
    "Кастомный дашборд: диалоги, конверсия, причины отказов",
    "Платёжные шлюзы — Stripe / PayPal",
  ],
  timeline: "Запуск за 7 дней",
  cta: "Обсудить внедрение →",
  source: "offer-integration" as const,
};

const fullFunnelPackage = {
  icon: Rocket,
  badge: "Полный комплекс",
  badgeAccent: true,
  title: "ИИ + лендинг + реклама под ключ",
  description:
    "Создаём весь маркетинговый комплекс с нуля — от настройки рекламы до закрытия сделок ИИ-менеджером.",
  features: [
    "Всё из пакета AI Integration",
    "Настройка и ведение Google Ads, Meta, LinkedIn, TikTok",
    "Создание конверсионного лендинга под нишу",
    "SEO-оптимизация и аналитика трафика",
    "Полное сопровождение и оптимизация воронки",
  ],
  timeline: "Запуск за 14–21 день",
  cta: "Получить расчёт →",
  source: "offer-full" as const,
};

export function OfferSection() {
  const { openModal } = useLeadModal();

  return (
    <section id="offer" className="py-20 px-4 md:py-32 bg-muted/30">
      <div className="mx-auto max-w-5xl">
        <FadeInView>
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Два варианта <span className="text-accent">работы</span>
          </h2>
        </FadeInView>

        <FadeInView delay={0.1}>
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-muted-foreground sm:text-lg">
            Выберите формат под ваши задачи — точечное внедрение ИИ или полный маркетинговый комплекс.
          </p>
        </FadeInView>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:mt-16">
          {[integrationPackage, fullFunnelPackage].map((pkg, i) => (
            <FadeInView key={i} delay={0.1 * (i + 1)}>
              <div
                className={cn(
                  "flex h-full flex-col rounded-xl border bg-background p-6 sm:p-8",
                  pkg.badgeAccent ? "border-accent" : "border-border"
                )}
              >
                {/* Badge */}
                <div className="mb-5">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
                      pkg.badgeAccent
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground border border-border"
                    )}
                  >
                    {pkg.badge}
                  </span>
                </div>

                {/* Icon + Title */}
                <div className="flex items-start gap-3 mb-3">
                  <pkg.icon className="mt-0.5 h-6 w-6 shrink-0 text-accent" />
                  <h3 className="text-xl font-bold tracking-tight leading-snug">
                    {pkg.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {pkg.description}
                </p>

                {/* Features */}
                <ul className="space-y-2.5 flex-1">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Timeline + CTA */}
                <div className="mt-6 pt-5 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-3">
                    ⏱ {pkg.timeline}
                  </p>
                  <button
                    onClick={() => openModal(pkg.source)}
                    className={cn(
                      "flex h-12 w-full items-center justify-center rounded-md text-base font-semibold transition-colors active:scale-[0.98]",
                      pkg.badgeAccent
                        ? "bg-accent text-accent-foreground hover:bg-accent/90"
                        : "border border-accent text-accent hover:bg-accent/10"
                    )}
                  >
                    {pkg.cta}
                  </button>
                </div>
              </div>
            </FadeInView>
          ))}
        </div>

        <FadeInView delay={0.3}>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Точная стоимость рассчитывается индивидуально на 30-минутном созвоне.{" "}
            <span className="font-medium text-foreground">Без обязательств.</span>
          </p>
        </FadeInView>
      </div>
    </section>
  );
}
