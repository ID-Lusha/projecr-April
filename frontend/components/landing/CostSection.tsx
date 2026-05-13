"use client";

import { FadeInView } from "@/components/animations/FadeInView";
import { useLeadModal } from "@/components/lead/LeadContext";
import { useState } from "react";

function formatUSD(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1000)}k`;
  return `$${n}`;
}

function lossLabel(monthly: number): string {
  const yearly = monthly * 12;
  if (yearly >= 100_000) return "luxury car";
  if (yearly >= 50_000) return "new car";
  if (yearly >= 20_000) return "down payment on an office";
  return "opening a new branch";
}

export function CostSection() {
  const { openModal } = useLeadModal();
  const [budget, setBudget] = useState(3000);
  const [leads, setLeads] = useState(200);
  const [conv, setConv] = useState(6);

  const lostLeads = Math.round(leads * (1 - conv / 100) * 0.7);
  const avgCheck = budget > 0 ? Math.round(budget / (leads * (conv / 100) || 1)) : 0;
  const lostMonthly = lostLeads * avgCheck;
  const lostYearly = lostMonthly * 12;

  return (
    <section className="py-20 px-4 md:py-32 bg-muted/30">
      <div className="mx-auto max-w-4xl">
        <FadeInView>
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Посчитайте, сколько вы теряете{" "}
            <span className="text-accent">прямо сейчас</span>
          </h2>
        </FadeInView>

        <FadeInView delay={0.1}>
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-muted-foreground sm:text-lg">
            Двигайте ползунки под ваш бизнес — калькулятор покажет реальные потери.
          </p>
        </FadeInView>

        <FadeInView delay={0.2}>
          <div className="mt-10 rounded-xl border border-border bg-background p-6 sm:p-8">
            <div className="space-y-6">
              {/* Бюджет */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Бюджет на рекламу / мес</label>
                  <span className="text-sm font-semibold text-accent tabular-nums">
                    {formatUSD(budget)}
                  </span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={50000}
                  step={500}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full accent-accent h-2 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>$500</span><span>$50k</span>
                </div>
              </div>

              {/* Заявки */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Заявок в месяц</label>
                  <span className="text-sm font-semibold text-accent tabular-nums">
                    {leads}
                  </span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={2000}
                  step={10}
                  value={leads}
                  onChange={(e) => setLeads(Number(e.target.value))}
                  className="w-full accent-accent h-2 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>50</span><span>2 000</span>
                </div>
              </div>

              {/* Конверсия */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Конверсия заявки в продажу</label>
                  <span className="text-sm font-semibold text-accent tabular-nums">
                    {conv}%
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={30}
                  step={1}
                  value={conv}
                  onChange={(e) => setConv(Number(e.target.value))}
                  className="w-full accent-accent h-2 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1%</span><span>30%</span>
                </div>
              </div>
            </div>

            {/* Результат */}
            <div className="mt-8 rounded-lg border border-accent/30 bg-accent/5 p-5 text-center">
              <p className="text-sm text-muted-foreground">
                Вы теряете на необработанных заявках
              </p>
              <p className="mt-1 text-4xl font-bold tracking-tight text-accent sm:text-5xl">
                ~{formatUSD(lostMonthly)}/month
              </p>
              <p className="mt-2 text-base font-medium text-foreground">
                Per year that's ~{formatUSD(lostYearly)} —{" "}
                <span className="text-accent">{lossLabel(lostMonthly)}</span>
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                * Расчёт основан на том, что 70% необработанных заявок уходит к конкурентам
              </p>

              <button
                onClick={() => openModal("cost-calculator")}
                className="mt-5 inline-flex h-12 items-center justify-center rounded-md bg-accent px-8 text-base font-semibold text-accent-foreground transition-colors hover:bg-accent/90 active:scale-[0.98]"
              >
                Хочу остановить эти потери →
              </button>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
