import { type ReactNode } from 'react';
import AdminNav from '@/components/AdminNav';
import { createClient } from '@/lib/supabase/server';

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="bg-clear-day text-nordic font-display min-h-screen flex flex-col antialiased">
      <AdminNav user={user} />

      {/* Main content */}
      <div className="grow flex flex-col w-full">{children}</div>

      {/* Footer */}
      <footer className="mt-auto border-t border-nordic/5 bg-clear-day py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="text-center text-sm text-nordic/60 w-full md:text-left md:w-auto">
            © {new Date().getFullYear()} LuxeEstate Properties. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
