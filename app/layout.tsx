import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { EVENT_TITLE } from "@/lib/content";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import NameGate from "@/components/NameGate";
import BodyThemeSync from "@/components/BodyThemeSync";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: EVENT_TITLE,
  description: "Alles wat je nodig hebt voor het vrijgezellenfeest op 8 augustus 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${jakarta.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <BodyThemeSync />
        <NameGate />
        <TopBar />
        <main className="flex-1 w-full max-w-md mx-auto px-4 pt-4 pb-28">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
