"use client";

import { Theater } from "lucide-react";

export function SceneCard() {
  return (
    <div className="rounded-lg border border-dashed border-accent/40 bg-accent/5 p-3">
      <div className="flex items-start gap-2.5">
        <Theater className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            Ролевая игра запущена
          </p>
          <p className="text-xs leading-relaxed text-muted-foreground">
            ИИ играет менеджера, вы — клиента. Попробуйте возражать, торговаться или придраться —
            смотрите как он отрабатывает каждую ситуацию.
          </p>
        </div>
      </div>
    </div>
  );
}
