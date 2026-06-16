import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import FaviconLink from "@/components/layout/FaviconLink";
import WhatsAppCTA from "@/components/layout/WhatsAppCTA";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata = {
  title: "Rivael Saputra — Fullstack Developer | Laravel & Next.js",
  description:
    "Jasa pembuatan website profesional oleh Rivael Saputra. Spesialis Laravel & Next.js untuk UMKM, startup, dan organisasi di Bandung dan seluruh Indonesia.",
  keywords: [
    "fullstack developer",
    "jasa website",
    "laravel developer",
    "next.js",
    "bandung",
    "rivael saputra",
  ],
  openGraph: {
    title: "Rivael Saputra — Fullstack Developer",
    description:
      "Bangun website profesional yang fungsional dan siap terima leads.",
    url: "https://rivael.dev",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${syne.variable} ${dmSans.variable}`}>
      <head>
        <FaviconLink />
      </head>
      <body className="bg-background text-foreground antialiased font-sans">
        {children}
        <WhatsAppCTA />
      </body>
    </html>
  );
}
