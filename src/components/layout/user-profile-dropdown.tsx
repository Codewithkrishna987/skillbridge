"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import {
  User as UserIcon,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  ShieldCheck,
  Settings,
  Bell,
  Sparkles,
} from "lucide-react";
import { Role } from "@prisma/client";

interface UserProfileDropdownProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: Role;
    avatarUrl?: string | null;
  };
}

export function UserProfileDropdown({ user }: UserProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const getDashboardUrl = (role: Role) => {
    switch (role) {
      case "STUDENT":
        return "/student";
      case "ACADEMICIAN":
      case "MENTOR":
        return "/academician";
      case "INDUSTRY":
        return "/industry";
      case "ADMIN":
        return "/admin";
      default:
        return "/dashboard";
    }
  };

  const getProfileUrl = (role: Role) => {
    switch (role) {
      case "STUDENT":
        return "/student/portfolio";
      case "ACADEMICIAN":
      case "MENTOR":
        return "/academician/mentees";
      case "INDUSTRY":
        return "/industry/post";
      case "ADMIN":
        return "/admin/directory";
      default:
        return "/dashboard";
    }
  };

  const getBadgeVariant = (role: Role) => {
    switch (role) {
      case "STUDENT":
        return "emerald";
      case "ACADEMICIAN":
      case "MENTOR":
        return "amber";
      case "INDUSTRY":
        return "default";
      case "ADMIN":
        return "amber";
      default:
        return "outline";
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full p-1 sm:px-2.5 sm:py-1.5 border border-zinc-200/90 bg-white hover:bg-zinc-50 hover:border-zinc-300 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-700/20 shadow-2xs"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Account Profile & Settings"
      >
        {/* Avatar Circle with Initials */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-800 text-xs font-bold text-emerald-100 shadow-2xs ring-1 ring-emerald-700/40">
          {user.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            getInitials(user.name)
          )}
        </div>

        {/* User text (shown on tablet/desktop) */}
        <div className="hidden md:flex flex-col text-left">
          <span className="text-xs font-semibold text-zinc-900 leading-tight truncate max-w-[120px]">
            {user.name}
          </span>
          <span className="text-[10px] text-zinc-500 font-medium capitalize">
            {user.role.toLowerCase()}
          </span>
        </div>

        <ChevronDown
          className={`h-3.5 w-3.5 text-zinc-500 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-zinc-900" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu Modal */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-xl border border-zinc-200/90 bg-white p-2 shadow-lg ring-1 ring-black/5 z-50 animate-in fade-in-50 zoom-in-95 duration-100">
          {/* Header Identity Card */}
          <div className="rounded-lg bg-zinc-50/80 p-3 mb-1 border border-zinc-100">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                Active Account
              </span>
              <Badge variant={getBadgeVariant(user.role)} className="text-[10px] py-0 px-2">
                {user.role}
              </Badge>
            </div>
            <div className="font-semibold text-sm text-zinc-900 truncate">
              {user.name}
            </div>
            <div className="text-xs text-zinc-500 truncate mt-0.5">
              {user.email}
            </div>
          </div>

          {/* Navigation Options */}
          <div className="py-1 space-y-0.5 text-xs font-medium text-zinc-700">
            <Link
              href={getProfileUrl(user.role)}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 hover:bg-emerald-50 hover:text-emerald-950 transition-colors"
            >
              <UserIcon className="h-4 w-4 text-emerald-700" />
              <span>My Profile & Credentials</span>
            </Link>

            <Link
              href={getDashboardUrl(user.role)}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
            >
              <LayoutDashboard className="h-4 w-4 text-zinc-600" />
              <span>Dashboard Workspace</span>
            </Link>

            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
            >
              <Sparkles className="h-4 w-4 text-amber-600" />
              <span>Switch / Test Roles</span>
            </Link>
          </div>

          <div className="my-1 border-t border-zinc-100" />

          {/* Sign Out Option */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              signOut({ callbackUrl: "/" });
            }}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium text-red-700 hover:bg-red-50 hover:text-red-800 transition-colors"
          >
            <LogOut className="h-4 w-4 text-red-600" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
}
