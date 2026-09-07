"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { UserProfileDropdown } from "@/components/layout/user-profile-dropdown";
import { useSidebar } from "@/components/layout/sidebar-context";
import {
  Compass,
  Bell,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";

export function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;
  const { isOpen: isDrawerOpen, toggle: toggleDrawer } = useSidebar();

  const navLinks = [
    { label: "AI Pipeline", href: "/#ai-flow" },
    { label: "Placement Flow", href: "/#placement-flow" },
    { label: "The Solution", href: "/#solution" },
    { label: "Portals", href: "/#students" },
    { label: "SIH Docs", href: "/prototype-doc" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-cream-border bg-parchment/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-8 lg:px-12">
        {/* Left: Hamburger Button (Mobile) + Brand Logo */}
        <div className="flex items-center gap-3">
          {/* Mobile Hamburger Menu Button (visible on mobile/tablet across all pages) */}
          <button
            type="button"
            onClick={toggleDrawer}
            className="flex md:hidden items-center justify-center h-10 w-10 rounded-xl border border-cream-border bg-white text-ink hover:bg-parchment focus:outline-none focus:ring-2 focus:ring-forest/20 transition-colors shadow-2xs"
            aria-label="Toggle navigation menu"
            title="Navigation Menu"
          >
            {isDrawerOpen ? (
              <X className="h-5 w-5 text-ink" />
            ) : (
              <Menu className="h-5 w-5 text-ink" />
            )}
          </button>

          {/* Clean Brand Logo / Wordmark */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest text-parchment shadow-xs transition-transform group-hover:scale-105 shrink-0">
              <Compass className="h-5 w-5 text-gold" />
            </div>
            <span className="font-bold text-xl tracking-tight text-forest">
              SkillBridge
            </span>
          </Link>
        </div>

        {/* Center: Simplified Nav Links (visible on desktop when not logged in) */}
        {!user && (
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-ink-light hover:text-forest transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}

        {/* Right: User Profile Menu or Guest CTA */}
        <div className="flex items-center gap-2 sm:gap-4">
          {user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Notification Button */}
              <button
                type="button"
                className="relative rounded-full p-2.5 text-ink-muted hover:bg-parchment-dark/60 hover:text-ink transition-colors focus:outline-none focus:ring-2 focus:ring-forest/20"
                title="Notifications"
                aria-label="View notifications"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-gold ring-2 ring-parchment" />
              </button>

              {/* Profile Dropdown */}
              <UserProfileDropdown user={user} />
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link href="/login" className="hidden sm:inline-block">
                <Button variant="ghost" size="sm" className="text-ink-light hover:text-forest">
                  Sign In
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="primary" size="sm" className="gap-2 text-xs sm:text-sm">
                  <span>Enter Portal</span>
                  <ArrowRight className="h-3.5 w-3.5 text-gold" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
