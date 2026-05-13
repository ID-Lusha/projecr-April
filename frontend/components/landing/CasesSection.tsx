"use client";

import { FadeInView } from "@/components/animations/FadeInView";
import { TrendingUp, Clock, Users } from "lucide-react";

const cases = [
  {
    niche: "Стоматология",
    city: "Dubai",
    icon: Clock,
    metric: "+180%",
    metricLabel: "заявок в продажу за 2 месяца",
    story:
      "Время ответа на заявку: с 32 минут до 4 секунд. ИИ квалифицирует пациентов по нише процедуры ещё до звонка администратора.",
    results: ["Время ответа: 32 мин → 4 сек", "Конверсия: +180% за 2 мес", "Нагрузка на администратора: −60%"],
  },
  {
    niche: "Опт автозапчастей",
    city: "Berlin",
    icon: TrendingUp,
    metric: "+40%",
    metricLabel: "к обороту за 3 месяца",
    story:
      "Сократили затраты на отдел продаж на 60%. ИИ обрабатывает оптовые запросы, проверяет наличие и передаёт горячие лиды менеджеру.",
    results: ["Затраты на отдел продаж: −60%", "Оборот: +40% за 3 мес", "Обработка запросов: 24/7"],
  },
  {
    niche: "Онлайн-школа",
    city: "Singapore",
    icon: Users,
    metric: "1 200",
    metricLabel: "лидов в день одной системой",
    story:
      "Раньше нужно было 8 менеджеров для обработки потока. Теперь ИИ квалифицирует всех и передаёт менеджерам только тех, кто готов к покупке.",
    results: ["Лидов/день: 1 200 без доп. найма", "Конверсия в оплату: +25%", "Экономия на ФОТ: $5,400/month"],
  },
];

const logos = [
  "Stripe", "PayPal", "HubSpot", "Salesforce", "WhatsApp", "Telegram",
];

export function CasesSection() {
  return (
    <section id="cases" className="py-20 px-4 md:py-32">
      <div className="mx-auto max-w-5xl">
        <FadeInView>
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Цифры <span className="text-accent">наших клиентов</span>
          </h2>
        </FadeInView>

        <FadeInView delay={0.1}>
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-muted-foreground sm:text-lg">
            Реальные результаты из разных ниш. Плейсхолдеры — заменим вашими кейсами после запуска.
          </p>
        </FadeInView>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 md:mt-16">
          {cases.map((c, i) => (
            <FadeInView key={i} delay={0.1 * (i + 1)}>
              <div className="flex h-full flex-col rounded-lg border border-border bg-background p-5 sm:p-6">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold tracking-tight">{c.niche}</p>
                    <p className="text-xs text-muted-foreground">{c.city}</p>
                  </div>
                  <c.icon className="h-5 w-5 shrink-0 text-accent" />
                </div>

                <div className="mt-4">
                  <span className="text-4xl font-bold tracking-tight text-accent">
                    {c.metric}
                  </span>
                  <p className="mt-0.5 text-xs text-muted-foreground">{c.metricLabel}</p>
                </div>

                <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
                  {c.story}
                </p>

                <ul className="mt-4 space-y-1">
                  {c.results.map((r, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInView>
          ))}
        </div>

        {/* Logos / integrations */}
        <FadeInView delay={0.4}>
          <div className="mt-12 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-5">
              Интегрируемся с вашими инструментами
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {logos.map((logo) => (
                <div
                  key={logo}
                  className="rounded-md border border-border px-4 py-2 text-sm font-medium text-muted-foreground grayscale hover:grayscale-0 transition-all"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
