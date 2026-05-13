"use client";

import { cn } from "@/lib/cn";

interface QuickRepliesProps {
  suggestions: string[];
  onPick: (text: string) => void;
  disabled?: boolean;
}

export function QuickReplies({ suggestions, onPick, disabled }: QuickRepliesProps) {
  if (!suggestions.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((text) => (
        <button
          key={text}
          type="button"
          disabled={disabled}
          onClick={() => onPick(text)}
          className={cn(
            "rounded-full border border-border bg-muted/40 px-3 py-1 text-xs",
            "text-muted-foreground transition-colors",
            "hover:border-accent hover:text-accent hover:bg-accent/5",
            "disabled:opacity-40 disabled:cursor-not-allowed"
          )}
        >
          {text}
        </button>
      ))}
    </div>
  );
}
