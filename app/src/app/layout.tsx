import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NIDA - Native Interpretive Drawing Analysis",
  description:
    "House-Tree-Person (HTP) testi bağlamında yapay zeka destekli çocuk çizimi akademik referans platformu",
  keywords: [
    "HTP",
    "çocuk çizimi",
    "gelişimsel değerlendirme",
    "yapay zeka",
    "PDR",
    "projektif çizim",
  ],
  manifest: "/manifest.json",
  themeColor: "#4f46e5",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "NIDA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} font-sans antialiased bg-gray-50`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
