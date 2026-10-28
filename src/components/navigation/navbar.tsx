"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/stores/cart-store";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#0e150e]/10 bg-[#f4f3e7]/95 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-6 lg:px-12">
        {/* Left Nav Items */}
        <nav className="hidden items-center gap-8 md:flex">
          {siteConfig.mainNav.slice(0, 2).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[14px] font-bold uppercase tracking-[0.05em] text-[#0e150e] transition-colors hover:text-[#00473c]"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Center Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            className="font-extrabold text-[26px] tracking-tight text-[#00473c] select-none hover:opacity-90 transition-opacity flex items-center gap-1.5"
          >
            <span>{siteConfig.name}</span>
            <span className="text-[12px] uppercase font-bold tracking-widest text-[#0e150e]/60 bg-[#e8dcc6] px-2 py-0.5 rounded-full ml-1 hidden sm:inline-block">
              Mooncake
            </span>
          </Link>
        </div>

        {/* Right Nav Items & Actions */}
        <div className="hidden items-center gap-8 md:flex">
          {siteConfig.mainNav.slice(2).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[14px] font-bold uppercase tracking-[0.05em] text-[#0e150e] transition-colors hover:text-[#00473c]"
            >
              {item.title}
            </Link>
          ))}

          {/* Cart Count Icon */}
          <Link
            href="#bag"
            className="relative flex items-center justify-center p-2 text-[#00473c] hover:opacity-80 transition-opacity"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#e6ff55] text-[11px] font-black text-[#0e150e]">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Pill Outline Button for ORDER */}
          <Button variant="outline" size="sm" asChild>
            <Link href="#menu">ORDER</Link>
          </Button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-4 md:hidden">
          <Link
            href="#bag"
            className="relative p-2 text-[#00473c]"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#e6ff55] text-[11px] font-black text-[#0e150e]">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#0e150e]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-[#0e150e]/10 bg-[#f4f3e7] px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-4">
            {siteConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[16px] font-bold uppercase tracking-[0.05em] text-[#0e150e] hover:text-[#00473c]"
              >
                {item.title}
              </Link>
            ))}
            <div className="pt-2">
              <Button
                variant="primary"
                className="w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                ORDER NOW
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
