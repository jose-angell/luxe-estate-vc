"use server";

import { createAdminClient } from "../../lib/supabase/server";
import { revalidatePath } from "next/cache";

export type AdminUser = {
  id: string;
  email: string | undefined;
  role: "admin" | "user";
  created_at: string;
};

export async function getUsersAction(): Promise<{
  users: AdminUser[];
  error: string | null;
}> {
  const supabase = await createAdminClient();

  // 1. Get all auth users
  const {
    data: { users },
    error: authError,
  } = await supabase.auth.admin.listUsers();

  if (authError) {
    return { users: [], error: authError.message };
  }

  // 2. Get all roles using the new schema (user_id field)
  const { data: rolesData, error: rolesError } = await supabase
    .from("user_roles")
    .select("user_id, role");

  if (rolesError) {
    return { users: [], error: rolesError.message };
  }

  // 3. Merge data — match by user_id
  const adminUsers: AdminUser[] = users.map((user) => {
    const roleRecord = rolesData.find((r) => r.user_id === user.id);
    return {
      id: user.id,
      email: user.email,
      role: (roleRecord?.role?.toString() as "admin" | "user") || "user",
      created_at: user.created_at,
    };
  });

  return { users: adminUsers, error: null };
}

export async function updateUserRoleAction(
  userId: string,
  newRole: "admin" | "user"
) {
  const supabase = await createAdminClient();

  // Upsert using user_id as the conflict target (it has a UNIQUE constraint)
  const { error } = await supabase
    .from("user_roles")
    .upsert({ user_id: userId, role: newRole }, { onConflict: "user_id" });

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin");
  return { success: true, error: null };
}
