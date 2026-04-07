import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/dashboard", "/onboarding", "/profile"];

export async function proxy(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const path = req.nextUrl.pathname;
  const isProtected = PROTECTED_ROUTES.some((route) => path.startsWith(route));

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (session) {
    const { data: user } = await supabase
      .from("users")
      .select("plan, subscription_ends_at, is_active")
      .eq("id", session.user.id)
      .single();

    if (user) {
      const isExpired =
        user.subscription_ends_at &&
        new Date(user.subscription_ends_at) < new Date();

      if (isExpired && user.plan !== "lifetime") {
        await supabase
          .from("users")
          .update({ is_active: false })
          .eq("id", session.user.id);

        if (!path.startsWith("/pricing")) {
          return NextResponse.redirect(
            new URL("/pricing?expired=true", req.url)
          );
        }
      }
    }
  }

  return res;
}

export const config = {
  matcher: ["/dashboard/:path*", "/onboarding/:path*", "/profile/:path*"],
};
