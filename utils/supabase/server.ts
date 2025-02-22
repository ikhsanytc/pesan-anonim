"use server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import ProfileType from "../types/profile";

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, options, value }) => {
              cookieStore.set(name, value, options);
            });
          } catch (e) {
            console.error(e);
          }
        },
      },
    }
  );
}

export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getProfile(): Promise<ProfileType | null> {
  const supabase = await createClient();
  const user = await getUser();
  if (!user) return null;
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();
  return profile;
}

export async function getAvatarUrl(path: string) {
  if (path === "nophoto.jpeg") return `/${path}`;
  const supabase = await createClient();
  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(path);
  return publicUrl;
}

export async function checkEmailAndUsername(email: string, username: string) {
  const supabase = await createClient();
  const { data: emailExists } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email)
    .single();
  const { data: usernameExists } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();
  if (emailExists || usernameExists) {
    return true;
  }
  return false;
}
