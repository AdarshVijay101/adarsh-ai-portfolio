import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PrivacyProvider } from "@/app/context/privacy-context";
import { ChatWidget } from "@/components/chat-widget";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adarsh Vijay | AI Engineer & Data Strategist",
  description: "Agentic AI Portfolio of Adarsh Vijay Krishnakumar. Built with RAG-based grounded intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col font-sans`}
      >
        <PrivacyProvider>
          {children}
          <ChatWidget />
        </PrivacyProvider>
      </body>
    </html>
  );
}
