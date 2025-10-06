import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers/theme-provider";
import { QueryProvider } from "./providers/query-provider";
import { ReduxProvider } from "./providers/redux-provider";
import MainLayout from "@/components/layout/main-layout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Apple Search Ads Analytics Dashboard",
  description: "Performance insights and analytics for Apple Search Ads"
};

export default function RootLayout({
  children


}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ReduxProvider>
          <QueryProvider>
            <ThemeProvider>
              <MainLayout>{children}</MainLayout>
            </ThemeProvider>
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>);

}