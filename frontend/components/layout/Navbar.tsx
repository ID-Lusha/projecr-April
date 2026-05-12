"use client";

import { cn } from "@/lib/cn";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Bot } from "lucide-react";
import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="#" className="flex items-center gap-2 font-semibold text-lg tracking-tight">
          <Bot className="h-6 w-6 text-accent" />
          <span className="hidden sm:inline">AI Sales</span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#problem" className="hover:text-foreground transition-colors">
            Проблема
          </a>
          <a href="#demo" className="hover:text-foreground transition-colors">
            Демо
          </a>
          <a href="#architecture" className="hover:text-foreground transition-colors">
            Как это работает
          </a>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#demo"
            className="inline-flex h-10 min-w-[44px] items-center justify-center rounded-md bg-accent px-4 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90 active:scale-[0.98]"
          >
            Попробовать ИИ
          </a>
        </div>
      </nav>
    </header>
  );
}
