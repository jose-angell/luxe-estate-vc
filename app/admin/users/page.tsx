import { createClient } from '@/lib/supabase/server';
import { toggleUserRole } from './actions';
import Link from 'next/link';

type AdminUser = {
  id: string;
  email: string;
  role: string;
  created_at: string;
};

export default async function AdminUsersPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const limit = 10;

  const supabase = await createClient();
  const { data: allUsers, error } = await supabase.rpc('get_admin_users');

  const count = allUsers?.length || 0;
  const totalPages = count ? Math.ceil(count / limit) : 1;
  const from = (page - 1) * limit;
  const to = from + limit;
  const users: AdminUser[] = allUsers?.slice(from, to) || [];

  if (error) {
    return (
      <div className="p-8 text-red-500">Error loading users: {error.message}</div>
    );
  }

  return (
    <>
      {/* Page Header */}
      <header className="w-full pt-8 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-nordic">User Directory</h1>
            <p className="text-nordic/60 mt-1 text-sm">Manage user access and roles for your properties.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative group w-full md:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-icons text-nordic/40 group-focus-within:text-mosque text-xl">search</span>
              </div>
              <input
                className="block w-full pl-10 pr-3 py-2.5 border-none rounded-lg bg-white text-nordic shadow-soft placeholder-nordic/30 focus:ring-2 focus:ring-mosque focus:bg-white transition-all text-sm"
                placeholder="Search by name, email..."
                type="text"
              />
            </div>
            <button className="inline-flex items-center justify-center px-4 py-2.5 border border-mosque text-sm font-medium rounded-lg text-mosque bg-transparent hover:bg-mosque/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mosque transition-colors whitespace-nowrap">
              <span className="material-icons text-lg mr-2">add</span>
              Add User
            </button>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="mt-8 flex gap-6 border-b border-nordic/10 overflow-x-auto">
          <button className="pb-3 text-sm font-semibold text-mosque border-b-2 border-mosque whitespace-nowrap">All Users</button>
          <button className="pb-3 text-sm font-medium text-nordic/60 hover:text-nordic transition-colors whitespace-nowrap">Agents</button>
          <button className="pb-3 text-sm font-medium text-nordic/60 hover:text-nordic transition-colors whitespace-nowrap">Brokers</button>
          <button className="pb-3 text-sm font-medium text-nordic/60 hover:text-nordic transition-colors whitespace-nowrap">Admins</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pb-12 space-y-4">
        {/* Column Headers */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 text-xs font-semibold uppercase tracking-wider text-nordic/50 mb-2">
          <div className="col-span-4">User Details</div>
          <div className="col-span-3">Role &amp; Status</div>
          <div className="col-span-3">Performance</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* User Cards */}
        {users.map((user: AdminUser, index: number) => {
          const isAdmin = user.role === 'admin';
          const displayName = user.email ? user.email.split('@')[0] : 'Unknown';
          const initial = displayName.charAt(0).toUpperCase();
          const isActive = index % 3 !== 0; // deterministic online indicator

          return (
            <div
              key={user.id}
              className={`user-card group relative rounded-xl p-5 shadow-sm border border-transparent hover:shadow-soft flex flex-col md:grid md:grid-cols-12 gap-4 items-center transition-all ${
                isAdmin
                  ? 'bg-hint-of-green dark:bg-mosque/20'
                  : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:bg-hint-of-green dark:hover:bg-mosque/20'
              }`}
            >
              {/* User Details */}
              <div className="col-span-12 md:col-span-4 flex items-center w-full">
                <div className="relative flex-shrink-0">
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm ${isAdmin ? 'bg-mosque' : 'bg-gradient-to-br from-nordic to-mosque'}`}>
                    {initial}
                  </div>
                  {isActive && (
                    <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white dark:ring-gray-800"></span>
                  )}
                </div>
                <div className="ml-4 overflow-hidden">
                  <div className="text-sm font-bold text-nordic dark:text-white truncate capitalize">{displayName}</div>
                  <div className="text-xs text-nordic/60 dark:text-gray-400 truncate">{user.email}</div>
                  <div className={`mt-1 text-[10px] px-2 py-0.5 inline-block rounded transition-colors ${isAdmin ? 'bg-white/50 text-nordic/60' : 'bg-gray-50 dark:bg-white/10 text-nordic/50 group-hover:bg-white/50'}`}>
                    ID: #{user.id.substring(0, 8).toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Role & Status */}
              <div className="col-span-12 md:col-span-3 w-full flex items-center justify-between md:justify-start gap-4">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                  isAdmin
                    ? 'bg-nordic text-white'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {isAdmin ? 'Administrator' : 'User'}
                </span>
                <div className={`flex items-center text-xs ${isActive ? 'text-nordic/60 dark:text-gray-400' : 'text-nordic/40 dark:text-gray-500'}`}>
                  <span className={`material-icons text-[14px] mr-1 ${isActive ? 'text-mosque' : 'text-gray-400'}`}>
                    {isActive ? 'check_circle' : 'schedule'}
                  </span>
                  {isActive ? 'Active' : 'Away'}
                </div>
              </div>

              {/* Performance */}
              <div className="col-span-12 md:col-span-3 w-full grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-nordic/40">Properties</div>
                  <div className="text-sm font-semibold text-nordic dark:text-white">-</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-nordic/40">
                    {isAdmin ? 'Access Level' : 'Sales (YTD)'}
                  </div>
                  <div className="text-sm font-semibold text-nordic dark:text-white">
                    {isAdmin ? 'Level 5' : '-'}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="col-span-12 md:col-span-2 w-full flex justify-end relative">
                <form
                  action={async () => {
                    'use server';
                    await toggleUserRole(user.id, user.role);
                  }}
                  className="w-full md:w-auto"
                >
                  <button
                    type="submit"
                    className={`inline-flex items-center px-4 py-2 shadow-sm text-xs font-medium rounded-lg focus:outline-none transition-colors w-full md:w-auto justify-center ${
                      isAdmin
                        ? 'bg-mosque text-white hover:bg-mosque/90'
                        : 'border border-nordic/10 bg-white dark:bg-gray-800 text-nordic dark:text-gray-300 hover:bg-nordic hover:text-white group-hover:bg-white group-hover:shadow-sm'
                    }`}
                  >
                    Change Role
                    <span className="material-icons text-[16px] ml-2">expand_more</span>
                  </button>
                </form>
              </div>
            </div>
          );
        })}

        {/* Empty State */}
        {users.length === 0 && (
          <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
            <span className="material-icons text-4xl mb-2 text-nordic/20">group_off</span>
            <p className="text-nordic/60">No users found</p>
          </div>
        )}

        {/* Pagination */}
        {count > 0 && (
          <div className="hidden sm:flex sm:items-center sm:justify-between pt-4">
            <p className="text-sm text-nordic/60">
              Showing <span className="font-medium text-nordic">{from + 1}</span> to{' '}
              <span className="font-medium text-nordic">{Math.min(to, count)}</span> of{' '}
              <span className="font-medium text-nordic">{count}</span> users
            </p>
            <nav aria-label="Pagination" className="relative z-0 inline-flex rounded-md shadow-none -space-x-px">
              <Link
                href={`/admin/users?page=${Math.max(1, page - 1)}`}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md text-sm font-medium text-nordic/50 hover:text-mosque transition-colors ${page === 1 ? 'pointer-events-none opacity-30' : ''}`}
              >
                <span className="sr-only">Previous</span>
                <span className="material-icons text-xl">chevron_left</span>
              </Link>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/admin/users?page=${p}`}
                  aria-current={page === p ? 'page' : undefined}
                  className={`z-10 relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md mx-1 transition-colors ${
                    page === p
                      ? 'bg-mosque text-white shadow-sm'
                      : 'bg-transparent text-nordic/70 hover:bg-white hover:text-mosque'
                  }`}
                >
                  {p}
                </Link>
              ))}
              <Link
                href={`/admin/users?page=${Math.min(totalPages, page + 1)}`}
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md text-sm font-medium text-nordic/50 hover:text-mosque transition-colors ${page === totalPages ? 'pointer-events-none opacity-30' : ''}`}
              >
                <span className="sr-only">Next</span>
                <span className="material-icons text-xl">chevron_right</span>
              </Link>
            </nav>
          </div>
        )}
      </main>
    </>
  );
}