import { Bot } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border py-8 px-4">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Bot className="h-4 w-4" />
          <span>AI Sales Platform</span>
        </div>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Все права защищены.
        </p>
      </div>
    </footer>
  );
}
