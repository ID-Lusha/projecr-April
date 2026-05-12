"use client";

import { useEffect, useState } from "react";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <a
        href="#demo"
        className="flex h-12 w-full items-center justify-center rounded-md bg-accent text-base font-medium text-accent-foreground shadow-lg transition-colors hover:bg-accent/90 active:scale-[0.98]"
      >
        Попробовать ИИ в деле
      </a>
    </div>
  );
}
