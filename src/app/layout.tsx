import type { Metadata } from "next";
import "./globals.css";
import SideNav from "@/components/SideNav";

export const metadata: Metadata = {
  title: "Signal — Data Science Placement Coach",
  description:
    "An 8-week placement operating system for MSc Data Science students: diagnose gaps, practice deliberately, and prove interview readiness.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-[#0D0F14] text-[#E7E9EE] font-body">
        <div className="flex min-h-screen">
          <SideNav />
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </body>
    </html>
  );
}
