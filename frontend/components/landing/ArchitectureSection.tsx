"use client";

import { FadeInView } from "@/components/animations/FadeInView";
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
    desc: "Google Ads, таргет в соцсетях. Настраиваем и ведём рекламу.",
    span: "sm:col-span-1",
  },
  {
    icon: Globe,
    title: "Лендинг",
    desc: "Конверсионный сайт, заточенный под вашу нишу и аудиторию.",
    span: "sm:col-span-1",
  },
  {
    icon: BrainCircuit,
    title: "ИИ-Квалификатор",
    desc: "Мгновенно обрабатывает заявки, квалифицирует лиды, отвечает 24/7.",
    span: "sm:col-span-1",
  },
  {
    icon: Database,
    title: "CRM-интеграция",
    desc: "Все лиды автоматически попадают в вашу CRM с полным контекстом.",
    span: "sm:col-span-1 md:col-span-2",
  },
  {
    icon: CreditCard,
    title: "Оплата",
    desc: "Kaspi, Stripe и другие шлюзы. Клиент платит без лишних шагов.",
    span: "sm:col-span-1",
  },
  {
    icon: BarChart3,
    title: "Аналитика",
    desc: "Дашборд для собственника: конверсии, выручка, ROI — всё в реальном времени.",
    span: "sm:col-span-3",
  },
];

export function ArchitectureSection() {
  return (
    <section id="architecture" className="py-20 px-4 md:py-32 bg-muted/30">
      <div className="mx-auto max-w-5xl">
        <FadeInView>
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Как это работает
            <br className="hidden sm:block" />{" "}
            <span className="text-accent">внутри бизнеса</span>
          </h2>
        </FadeInView>

        <FadeInView delay={0.1}>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base text-muted-foreground sm:text-lg">
            Мы не просто делаем ботов. Мы строим цифровую кровеносную систему
            вашего бизнеса.
          </p>
        </FadeInView>

        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-3 md:mt-16">
          {steps.map((step, i) => (
            <FadeInView key={i} delay={0.08 * (i + 1)} className={step.span}>
              <div className="flex h-full flex-col rounded-lg border border-border bg-background p-5 transition-colors hover:bg-muted/50 sm:p-6">
                <step.icon className="mb-3 h-6 w-6 text-accent" />
                <h3 className="text-lg font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
