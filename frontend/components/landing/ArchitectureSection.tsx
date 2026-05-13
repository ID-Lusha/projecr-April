"use client";

import { FadeInView } from "@/components/animations/FadeInView";
import { useLeadModal } from "@/components/lead/LeadContext";
import {
  Megaphone,
  Globe,
  BrainCircuit,
  Database,
  CreditCard,
  BarChart3,
} from "lucide-react";

const steps = [
  {
    icon: Megaphone,
    title: "Трафик",
    desc: "Google Ads, Meta, LinkedIn, TikTok Ads — настраиваем и ведём рекламу, которая приводит целевых клиентов, а не ботов.",
    span: "sm:col-span-1",
  },
  {
    icon: Globe,
    title: "Лендинг",
    desc: "Конверсионный сайт, заточенный под вашу нишу, боли и аудиторию. Загрузка меньше секунды.",
    span: "sm:col-span-1",
  },
  {
    icon: BrainCircuit,
    title: "ИИ-Менеджер",
    desc: "Отвечает за 2 сек, квалифицирует лид, отрабатывает возражения и ведёт к сделке. Работает 24/7.",
    span: "sm:col-span-1",
  },
  {
    icon: Database,
    title: "CRM-интеграция",
    desc: "Каждый разговор автоматически попадает в вашу CRM с полным контекстом: ниша, вопрос, стадия готовности.",
    span: "sm:col-span-1 md:col-span-2",
  },
  {
    icon: CreditCard,
    title: "Оплата",
    desc: "Stripe, PayPal и другие шлюзы. Клиент оплачивает без лишних шагов, деньги сразу у вас.",
    span: "sm:col-span-1",
  },
  {
    icon: BarChart3,
    title: "Дашборд собственника",
    desc: "Конверсии, стоимость лида, выручка, ROI — всё в одном экране в реальном времени. Вы видите, что окупается.",
    span: "sm:col-span-3",
  },
];

export function ArchitectureSection() {
  const { openModal } = useLeadModal();

  return (
    <section id="architecture" className="py-20 px-4 md:py-32 bg-muted/30">
      <div className="mx-auto max-w-5xl">
        <FadeInView>
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Это не «ещё один чат-бот».{" "}
            <span className="text-accent">Это система.</span>
          </h2>
        </FadeInView>

        <FadeInView delay={0.1}>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base text-muted-foreground sm:text-lg">
            Мы не просто делаем ботов. Мы строим цифровую кровеносную систему
            вашего бизнеса — от первого клика по рекламе до зачисления оплаты.
          </p>
        </FadeInView>

        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-3 md:mt-16">
          {steps.map((step, i) => (
            <FadeInView key={i} delay={0.08 * (i + 1)} className={step.span}>
              <div className="flex h-full flex-col rounded-lg border border-border bg-background p-5 transition-colors hover:bg-muted/50 sm:p-6">
                <step.icon className="mb-3 h-6 w-6 text-accent" />
                <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </FadeInView>
          ))}
        </div>

        <FadeInView delay={0.6}>
          <div className="mt-10 text-center">
            <button
              onClick={() => openModal("architecture")}
              className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-8 text-base font-semibold text-accent-foreground transition-colors hover:bg-accent/90 active:scale-[0.98]"
            >
              Хочу такую же систему →
            </button>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
