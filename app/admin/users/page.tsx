import { getUsersAction } from "../actions";
import RoleSelect from "./RoleSelect";

export default async function AdminUsersPage() {
  const { users, error } = await getUsersAction();

  return (
    <div className="animate-fade-in-up">
      {/* Header */}
      <header className="w-full pb-6 pt-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-nordic-dark dark:text-white">User Directory</h1>
            <p className="text-nordic-dark/60 dark:text-gray-400 mt-1 text-sm">Manage user access and roles for your properties.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative group w-full md:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-icons text-nordic-dark/40 group-focus-within:text-mosque text-xl">search</span>
              </div>
              <input 
                className="block w-full pl-10 pr-3 py-2.5 border-none rounded-lg bg-white dark:bg-gray-800 text-nordic-dark dark:text-white shadow-soft placeholder-nordic-dark/30 focus:ring-2 focus:ring-mosque focus:bg-white transition-all text-sm" 
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
        
        <div className="mt-8 flex gap-6 border-b border-nordic-dark/10 overflow-x-auto">
          <button className="pb-3 text-sm font-semibold text-mosque border-b-2 border-mosque whitespace-nowrap">All Users</button>
          <button className="pb-3 text-sm font-medium text-nordic-dark/60 hover:text-nordic-dark transition-colors whitespace-nowrap">Agents</button>
          <button className="pb-3 text-sm font-medium text-nordic-dark/60 hover:text-nordic-dark transition-colors whitespace-nowrap">Admins</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full pb-12 space-y-4">
        {error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3">
            <span className="material-icons">error_outline</span>
            <p className="text-sm font-medium">Error loading users: {error}</p>
          </div>
        ) : (
          <>
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 text-xs font-semibold uppercase tracking-wider text-nordic-dark/50 mb-2">
              <div className="col-span-4">User Details</div>
              <div className="col-span-3">Role & Status</div>
              <div className="col-span-3">Activity</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {users.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-12 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                <span className="material-icons text-4xl mb-2 text-nordic-dark/20">group_off</span>
                <p className="text-nordic-dark/60">No users found</p>
              </div>
            ) : (
              users.map((user, index) => {
                const isAdmin = user.role === 'admin';
                const displayName = user.email ? user.email.split('@')[0] : 'Unknown';
                const initial = displayName.charAt(0).toUpperCase();
                
                // Deterministic visual helpers based on index
                const isOnline = index % 3 !== 0;
                
                return (
                  <div 
                    key={user.id} 
                    className={`user-card group relative rounded-xl p-5 shadow-sm border border-transparent hover:shadow-soft flex flex-col md:grid md:grid-cols-12 gap-4 items-center z-${50 - index} ${
                      isAdmin 
                        ? "bg-hint-green dark:bg-mosque/20" 
                        : "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:bg-hint-green dark:hover:bg-mosque/20"
                    }`}
                  >
                    {/* User Details */}
                    <div className="col-span-12 md:col-span-4 flex items-center w-full">
                      <div className="relative flex-shrink-0">
                        <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm ${
                          isAdmin ? 'bg-mosque' : 'bg-gradient-to-br from-nordic-dark to-mosque'
                        }`}>
                          {initial}
                        </div>
                        {isOnline && (
                          <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white dark:ring-gray-800"></span>
                        )}
                      </div>
                      <div className="ml-4 overflow-hidden">
                        <div className="text-sm font-bold text-nordic-dark dark:text-white truncate capitalize">{displayName}</div>
                        <div className="text-xs text-nordic-dark/60 dark:text-gray-400 truncate">{user.email}</div>
                        <div className={`mt-1 text-[10px] px-2 py-0.5 inline-block rounded transition-colors ${
                          isAdmin 
                            ? "bg-white/50 text-nordic-dark/60" 
                            : "bg-gray-50 dark:bg-white/10 text-nordic-dark/50 dark:text-gray-400 group-hover:bg-white/50"
                        }`}>
                          ID: #{user.id.substring(0, 8)}
                        </div>
                      </div>
                    </div>

                    {/* Role & Status */}
                    <div className="col-span-12 md:col-span-3 w-full flex items-center justify-between md:justify-start gap-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                        isAdmin 
                          ? "bg-mosque/10 text-mosque dark:bg-mosque dark:text-white" 
                          : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                      }`}>
                        {isAdmin ? "Administrator" : "User"}
                      </span>
                      <div className="flex items-center text-xs text-nordic-dark/60 dark:text-gray-400">
                        {isOnline ? (
                          <>
                            <span className="material-icons text-[14px] mr-1 text-mosque">check_circle</span>
                            Active
                          </>
                        ) : (
                          <>
                            <span className="material-icons text-[14px] mr-1 text-gray-400">schedule</span>
                            Away
                          </>
                        )}
                      </div>
                    </div>

                    {/* Performance / Activity */}
                    <div className="col-span-12 md:col-span-3 w-full grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-nordic-dark/40 dark:text-gray-500">Registered</div>
                        <div className="text-sm font-semibold text-nordic-dark dark:text-white">
                          {new Date(user.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-nordic-dark/40 dark:text-gray-500">Access Level</div>
                        <div className="text-sm font-semibold text-nordic-dark dark:text-white">
                          {isAdmin ? "Full Access" : "Standard"}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <RoleSelect userId={user.id} initialRole={user.role as "admin" | "user"} />
                  </div>
                );
              })
            )}

            {users.length > 0 && (
              <div className="mt-8 flex items-center justify-between">
                <div className="text-sm text-nordic-dark/60 dark:text-gray-400">
                  Showing <span className="font-medium text-nordic-dark dark:text-white">{users.length}</span> users
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm border border-gray-200 dark:border-gray-700 rounded-md text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 disabled:opacity-50" disabled>Previous</button>
                  <button className="px-3 py-1 text-sm border border-gray-200 dark:border-gray-700 rounded-md text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 disabled:opacity-50" disabled>Next</button>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
