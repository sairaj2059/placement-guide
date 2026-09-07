"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/learn", label: "Learn" },
  { href: "/practice", label: "Practice" },
  { href: "/interviews", label: "Interviews" },
  { href: "/progress", label: "Progress" },
];

export default function SideNav() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-[#262b38] bg-[#0f121a] px-4 py-6">
      <Link href="/" className="mb-8 flex items-center gap-2 px-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#e8a33d]" />
        <span className="font-display text-lg font-semibold tracking-tight">Signal</span>
      </Link>

      <nav className="flex flex-col gap-1">
        {links.map((link) => {
          const active = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-[#1b1f2b] text-[#e7e9ee] font-medium"
                  : "text-[#8b91a3] hover:bg-[#151822] hover:text-[#e7e9ee]"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-lg border border-[#262b38] bg-[#151822] p-3">
        <p className="text-xs text-[#8b91a3]">Week 3 of 8 · Day 17</p>
        <p className="mt-1 text-sm font-medium">Healthcare AI track</p>
      </div>
    </aside>
  );
}
