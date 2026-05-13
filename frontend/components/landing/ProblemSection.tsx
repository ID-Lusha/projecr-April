"use client";

import { FadeInView } from "@/components/animations/FadeInView";
import {
  Clock,
  TrendingDown,
  Moon,
  UserX,
  BarChart,
  Rocket,
} from "lucide-react";

const pains = [
  {
    icon: Clock,
    title: "Менеджер ответил через 40 минут.",
    text: "Клиент уже у конкурента. И так каждый день, по несколько раз.",
  },
  {
    icon: TrendingDown,
    title: "Реклама съедает $3,000/мес.",
    text: "Конверсия в продажу — 4%. Остальные деньги уходят в никуда.",
  },
  {
    icon: Moon,
    title: "Заявки приходят ночью и в выходные.",
    text: "Утром клиент остыл. Написал конкуренту, которому ответили быстрее.",
  },
  {
    icon: UserX,
    title: "Уволился ключевой менеджер.",
    text: "Провалили план на месяц. Снова нанимать, обучать, контролировать.",
  },
  {
    icon: BarChart,
    title: "Не знаю, сколько стоит мне один клиент.",
    text: "Нет чёткой аналитики. Деньги вкладываю — что получаю, неясно.",
  },
  {
    icon: Rocket,
    title: "Хочу масштабироваться.",
    text: "Но боюсь — отдел продаж не вытянет. Найм не успевает за ростом.",
  },
];

export function ProblemSection() {
  return (
    <section id="problem" className="py-20 px-4 md:py-32">
      <div className="mx-auto max-w-5xl">
        <FadeInView>
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Узнаёте <span className="text-accent">себя?</span>
          </h2>
        </FadeInView>

        <FadeInView delay={0.1}>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base text-muted-foreground sm:text-lg">
            Если хотя бы 2 пункта про вас —{" "}
            <span className="font-semibold text-foreground">
              вы теряете деньги каждый день.
            </span>
          </p>
        </FadeInView>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-16">
          {pains.map((item, i) => (
            <FadeInView key={i} delay={0.07 * (i + 1)}>
              <div className="flex h-full flex-col rounded-lg border border-border bg-background p-5 transition-colors hover:bg-muted/50 hover:border-accent/30 sm:p-6">
                <item.icon className="mb-3 h-7 w-7 text-accent" />
                <p className="font-semibold tracking-tight leading-snug">
                  {item.title}
                </p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {item.text}
                </p>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
