import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

/**
 * OAuth callback handler.
 *
 * Supabase redirects here after the user completes the Google / GitHub sign-in.
 * The URL will contain either:
 *   - a `code` param (PKCE flow) – we exchange it for a session, or
 *   - a hash fragment with the access/refresh tokens (implicit flow).
 *
 * The @supabase/supabase-js client handles the hash fragment automatically on
 * the client side (via onAuthStateChange). For the code-based PKCE flow we
 * exchange it here so the session cookie is set before the redirect.
 */
export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/";

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Redirect to the home page (or wherever `next` points)
  return NextResponse.redirect(new URL(next, requestUrl.origin));
}
