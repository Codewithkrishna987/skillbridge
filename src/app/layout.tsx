import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/providers/session-provider";
import { SidebarProvider } from "@/components/layout/sidebar-context";
import { Navbar } from "@/components/layout/navbar";
import { GlobalMobileDrawer } from "@/components/layout/global-mobile-drawer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SkillBridge — Academia-Industry Collaboration Portal",
  description:
    "Closing the curriculum-to-industry gap through verified skill assessments, skill-gap-first matching, and continuous institutional feedback.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-[#fafbfb] text-zinc-900`}>
        <SessionProvider>
          <SidebarProvider>
            <Navbar />
            <GlobalMobileDrawer />
            <main className="flex-1 flex flex-col">{children}</main>
          </SidebarProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
