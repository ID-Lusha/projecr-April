"use client";

import { motion } from "framer-motion";
import { MessageSquare, Clock, Zap, Target } from "lucide-react";
import type { ChatStage } from "./useChatState";

interface ChatMetricsProps {
  stage: ChatStage;
  messageCount: number;
}

const metrics = [
  { icon: Clock, label: "Время ответа", value: "< 2 сек" },
  { icon: Zap, label: "Доступность", value: "24/7" },
  { icon: Target, label: "Конверсия", value: "+40%" },
];

export function ChatMetrics({ stage, messageCount }: ChatMetricsProps) {
  return (
    <div className="hidden lg:flex flex-col gap-4 w-64 shrink-0">
      <div className="rounded-lg border border-border p-4">
        <h3 className="text-sm font-semibold mb-3 tracking-tight">
          Метрики демо
        </h3>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <MessageSquare className="h-4 w-4 text-accent" />
            <span className="text-muted-foreground">Сообщений:</span>
            <span className="font-medium ml-auto">{messageCount}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div
              className={`h-2 w-2 rounded-full ${
                stage === "idle"
                  ? "bg-zinc-400"
                  : stage === "done"
                    ? "bg-green-500"
                    : "bg-accent animate-pulse"
              }`}
            />
            <span className="text-muted-foreground">Статус:</span>
            <span className="font-medium ml-auto">
              {stage === "idle" && "Ожидание"}
              {stage === "setup" && "Сбор контекста"}
              {stage === "roleplay" && "Ролевая игра"}
              {stage === "lead_capture" && "Завершение"}
              {stage === "done" && "Готово"}
            </span>
          </div>
        </div>
      </div>

      {stage !== "idle" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-border p-4"
        >
          <h3 className="text-sm font-semibold mb-3 tracking-tight">
            ИИ в цифрах
          </h3>
          <div className="space-y-3">
            {metrics.map((m, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <m.icon className="h-4 w-4 text-accent" />
                <span className="text-muted-foreground">{m.label}</span>
                <span className="font-semibold text-accent ml-auto">
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
