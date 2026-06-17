"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigation = [
    { name: "Propiedades", href: "/admin", icon: "home_work" },
    { name: "Usuarios", href: "/admin/users", icon: "manage_accounts" },
  ];

  return (
    <div className="min-h-screen bg-background-light font-display">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-nordic-dark/80 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo area */}
          <div className="flex h-20 items-center justify-between px-6 border-b border-gray-50">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-mosque text-white shadow-soft">
                <span className="material-icons text-xl">admin_panel_settings</span>
              </div>
              <span className="text-lg font-bold text-nordic-dark tracking-tight">
                Luxe Admin
              </span>
            </Link>
            <button
              className="lg:hidden p-2 text-nordic-muted hover:text-nordic-dark rounded-lg hover:bg-gray-50"
              onClick={() => setIsSidebarOpen(false)}
            >
              <span className="material-icons">close</span>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 px-4 py-6 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-mosque text-white shadow-[0_10px_25px_-5px_rgba(25,50,47,0.3)]"
                      : "text-nordic-muted hover:bg-hint-green/20 hover:text-nordic-dark"
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <span
                    className={`material-icons ${
                      isActive ? "text-white" : "text-nordic-muted"
                    }`}
                  >
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Bottom actions */}
          <div className="p-4 border-t border-gray-50">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-nordic-muted hover:text-nordic-dark hover:bg-gray-50 rounded-xl transition-colors"
            >
              <span className="material-icons">exit_to_app</span>
              Volver al sitio
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        {/* Top header (Mobile) */}
        <div className="sticky top-0 z-30 flex h-20 items-center justify-between bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 sm:px-6 lg:hidden shadow-sm">
          <button
            className="p-2 -ml-2 text-nordic-dark hover:bg-gray-50 rounded-lg transition-colors"
            onClick={() => setIsSidebarOpen(true)}
          >
            <span className="material-icons">menu</span>
          </button>
          <span className="text-lg font-bold text-nordic-dark tracking-tight">
            Luxe Admin
          </span>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>

        <main className="flex-1 p-6 lg:p-10 relative overflow-hidden">
          {/* Ambient blobs for dashboard */}
          <div className="absolute inset-0 pointer-events-none opacity-30 z-0">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-hint-green/30 rounded-full blur-[100px] mix-blend-multiply" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-mosque/10 rounded-full blur-[100px] mix-blend-multiply" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
