import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Sales Platform — ИИ-система продаж для вашего бизнеса",
  description:
    "Комплексное B2B-решение: привлечение трафика, конверсионный лендинг, кастомные ИИ-ассистенты, интеграция с CRM и платежными шлюзами. Обработка лидов за 2 секунды, 24/7.",
  openGraph: {
    title: "AI Sales Platform — ИИ-система продаж для вашего бизнеса",
    description:
      "Внедряем ИИ-систему продаж, которая обрабатывает лиды за 2 секунды, 24/7.",
    type: "website",
    locale: "ru_RU",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
