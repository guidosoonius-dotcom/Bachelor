import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { EVENT_TITLE } from "@/lib/content";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import NameGate from "@/components/NameGate";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
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
    <html lang="nl" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
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
