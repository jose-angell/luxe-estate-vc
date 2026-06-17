import { getUsersAction } from "../actions";
import RoleSelect from "./RoleSelect";

export default async function AdminUsersPage() {
  const { users, error } = await getUsersAction();

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-nordic-dark">
            Usuarios
          </h1>
          <p className="text-nordic-muted mt-1">
            Gestiona los roles y accesos de los usuarios registrados.
          </p>
        </div>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3">
          <span className="material-icons">error_outline</span>
          <p className="text-sm font-medium">Error al cargar usuarios: {error}</p>
        </div>
      ) : (
        <div className="bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase tracking-wider text-nordic-muted font-bold">
                  <th className="px-6 py-4">Usuario</th>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Fecha de Registro</th>
                  <th className="px-6 py-4">Rol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-white/40 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-hint-green to-mosque flex items-center justify-center text-white font-bold uppercase text-xs shadow-sm">
                          {user.email ? user.email.charAt(0) : "?"}
                        </div>
                        <span className="font-medium text-nordic-dark">
                          {user.email || "Sin email"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-mono text-xs text-nordic-muted bg-gray-50 px-2 py-1 rounded-md">
                        {user.id}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-nordic-muted">
                      {new Date(user.created_at).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <RoleSelect userId={user.id} initialRole={user.role} />
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-12 text-center text-nordic-muted"
                    >
                      <span className="material-icons text-4xl mb-2 opacity-20">
                        group_off
                      </span>
                      <p>No se encontraron usuarios</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
