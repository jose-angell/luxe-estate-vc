"use client";

import { useState } from "react";
import { updateUserRoleAction } from "../actions";

export default function RoleSelect({
  userId,
  initialRole,
}: {
  userId: string;
  initialRole: "admin" | "user";
}) {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(initialRole);
  const [error, setError] = useState<string | null>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as "admin" | "user";
    setLoading(true);
    setError(null);
    const { success, error: actionError } = await updateUserRoleAction(
      userId,
      newRole
    );
    if (success) {
      setRole(newRole);
    } else {
      setError(actionError || "Error updating role");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <select
          value={role}
          onChange={handleChange}
          disabled={loading}
          className={`appearance-none bg-white border ${
            role === "admin"
              ? "border-mosque/30 text-mosque bg-hint-green/10"
              : "border-gray-200 text-nordic-dark"
          } text-sm font-medium rounded-lg px-3 py-1.5 pr-8 focus:outline-none focus:ring-2 focus:ring-mosque/50 disabled:opacity-50 transition-colors cursor-pointer w-28`}
        >
          <option value="user">Usuario</option>
          <option value="admin">Admin</option>
        </select>
        <span className="material-icons absolute right-2 top-1/2 -translate-y-1/2 text-[16px] text-nordic-muted pointer-events-none">
          expand_more
        </span>
        {loading && (
          <div className="absolute right-8 top-1/2 -translate-y-1/2">
            <svg
              className="animate-spin h-3 w-3 text-mosque"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
          </div>
        )}
      </div>
      {error && <span className="text-[10px] text-red-500">{error}</span>}
    </div>
  );
}
