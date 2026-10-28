import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Serif_Display } from "next/font/google";
import "@/styles/globals.css";
import { siteConfig } from "@/config/site";
import { AppProviders } from "@/providers";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sweetsanstext",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-grenette",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.edition}`,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${dmSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-[#f4f3e7] text-[#0e150e]">
        <AppProviders>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
