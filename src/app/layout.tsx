import type { Metadata } from "next";
import { Syne, IBM_Plex_Mono } from "next/font/google";
import { HelpChatPopup } from "@/components/HelpChatPopup";
import { PeriodicLockPopup } from "@/components/PeriodicLockPopup";
import { SessionTimer } from "@/components/SessionTimer";
import "./globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "ANTIPATTERN",
    template: "%s",
  },
  description:
    "Connectez-vous, explorez un site qui fait tout de travers, et trouvez le flag.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${syne.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SessionTimer />
        <PeriodicLockPopup />
        <HelpChatPopup />
        {children}
      </body>
    </html>
  );
}
