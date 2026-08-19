import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mailsi Telehealth & Clinic Queue Platform | میلسی ٹیلی ہیلتھ",
  description:
    "Assisted rural telehealth, instant triage, and smart clinic queue platform for Mailsi Tehsil and South Punjab.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0b5e36",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f8faf9] text-slate-900 antialiased selection:bg-emerald-200">
        {children}
      </body>
    </html>
  );
}
