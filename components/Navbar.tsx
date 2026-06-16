"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "../lib/i18n/LanguageContext";
import LanguageSelector from "./LanguageSelector";
import { useAuth } from "../lib/auth/AuthContext";

interface NavbarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function Navbar({ activeTab = "Buy", onTabChange }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { t } = useTranslation();
  const { user, signOut } = useAuth();

  const tabs = [
    { key: "Buy", label: t.nav.buy },
    { key: "Rent", label: t.nav.rent },
    { key: "Sell", label: t.nav.sell },
    { key: "Saved Homes", label: t.nav.savedHomes },
  ];

  const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture || null;

  return (
    <nav className="sticky top-0 z-50 bg-background-light/95 backdrop-blur-md border-b border-nordic-dark/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-nordic-dark flex items-center justify-center">
              <span className="material-icons text-white text-lg">apartment</span>
            </div>
            <span className="text-xl font-semibold tracking-tight text-nordic-dark">
              LuxeEstate
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => onTabChange?.(tab.key)}
                  className={`font-medium text-sm px-1 py-1 transition-all ${
                    isActive
                      ? "text-mosque border-b-2 border-mosque"
                      : "text-nordic-dark/70 hover:text-nordic-dark hover:border-b-2 hover:border-nordic-dark/20"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* User Operations */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <button className="text-nordic-dark hover:text-mosque transition-colors">
              <span className="material-icons">search</span>
            </button>
            <button className="text-nordic-dark hover:text-mosque transition-colors relative">
              <span className="material-icons">notifications_none</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-background-light"></span>
            </button>

            {/* Language Selector */}
            <LanguageSelector />

            {/* Auth / Profile Area */}
            <div className="flex items-center gap-2 pl-2 border-l border-nordic-dark/10 ml-2">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden ring-2 ring-transparent hover:ring-mosque focus:ring-mosque transition-all cursor-pointer"
                  >
                    {avatarUrl ? (
                      <img
                        alt={user.user_metadata?.full_name || "User profile"}
                        className="w-full h-full object-cover"
                        src={avatarUrl}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-mosque text-white text-sm font-semibold">
                        {(user.user_metadata?.full_name?.[0] || user.email?.[0] || "?").toUpperCase()}
                      </div>
                    )}
                  </button>

                  {isDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-soft border border-nordic-dark/5 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="px-4 py-2 border-b border-nordic-dark/5">
                          <p className="text-[10px] uppercase tracking-wider text-nordic-muted font-semibold">Signed in as</p>
                          <p className="text-xs font-semibold text-nordic-dark truncate">
                            {user.user_metadata?.full_name || user.email}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            signOut();
                            setIsDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors flex items-center gap-2 cursor-pointer"
                        >
                          <span className="material-icons text-sm">logout</span>
                          {t.nav.signOut}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-sm font-semibold text-white bg-mosque hover:bg-mosque/90 shadow-soft transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                >
                  {t.nav.signIn}
                </Link>
              )}
            </div>

            {/* Hamburger Button for Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-nordic-dark hover:text-mosque transition-colors"
            >
              <span className="material-icons">
                {isMobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      <div
        className={`md:hidden border-t border-nordic-dark/5 bg-background-light overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-4 py-2 space-y-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => {
                  onTabChange?.(tab.key);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all ${
                  isActive
                    ? "text-mosque bg-mosque/10"
                    : "text-nordic-dark hover:bg-black/5"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
          {/* Mobile language selector */}
          <div className="px-3 py-2 border-t border-nordic-dark/5 mt-2 pt-3">
            <LanguageSelector />
          </div>

          {/* Mobile Profile / Auth Section */}
          <div className="px-3 py-2 border-t border-nordic-dark/5 mt-2 pt-3">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                    {avatarUrl ? (
                      <img
                        alt={user.user_metadata?.full_name || "User profile"}
                        className="w-full h-full object-cover"
                        src={avatarUrl}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-mosque text-white text-sm font-semibold">
                        {(user.user_metadata?.full_name?.[0] || user.email?.[0] || "?").toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-nordic-dark truncate">
                      {user.user_metadata?.full_name || user.email}
                    </p>
                    <p className="text-xs text-nordic-muted truncate">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    signOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-icons text-base">logout</span>
                  {t.nav.signOut}
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center px-4 py-2 border border-transparent rounded-lg text-base font-semibold text-white bg-mosque hover:bg-mosque/90 shadow-soft transition-colors cursor-pointer"
              >
                {t.nav.signIn}
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
