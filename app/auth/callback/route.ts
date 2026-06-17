import { NextResponse } from "next/server";
import { createClient, createAdminClient } from "../../../lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    // Asegurarse de que el usuario tenga un registro en user_roles
    if (data?.user) {
      const adminSupabase = await createAdminClient();
      
      // Intentamos insertar el rol por defecto si no existe
      // Utilizamos ON CONFLICT DO NOTHING para evitar sobreescribir si ya es admin
      await adminSupabase
        .from("user_roles")
        .upsert({ user_id: data.user.id, role: "user" }, { onConflict: "user_id", ignoreDuplicates: true });
    }
  }

  // Redirect to the home page (or wherever `next` points)
  return NextResponse.redirect(new URL(next, requestUrl.origin));
}
