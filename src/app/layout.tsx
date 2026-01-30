import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import styles from "./layout.module.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Minecraft Wiki - The Ultimate Guide",
  description: "Comprehensive Minecraft encyclopedia with blocks, items, mobs, biomes, potions, and crafting recipes.",
  keywords: ["Minecraft", "Wiki", "Guide", "Crafting", "Mobs", "Biomes", "Potions"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <Navigation />
        <main className={styles.main}>
          {children}
        </main>
      </body>
    </html>
  );
}
