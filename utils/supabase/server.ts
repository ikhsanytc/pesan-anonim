"use server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import ProfileType from "../types/profile";
import InboxType from "../types/inbox";

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

export async function getInbox(): Promise<{
  message: string;
  error: boolean;
  data: InboxType[] | null;
}> {
  try {
    const supabase = await createClient();
    const profile = await getProfile();
    if (!profile)
      return {
        message: "Profile tidak ditemukan",
        error: true,
        data: null,
      };
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("to", profile.username)
      .order("read", { ascending: true })
      .order("created_at", { ascending: false });
    if (error)
      return {
        message: error.message,
        error: true,
        data: null,
      };
    return {
      message: "Success",
      error: false,
      data,
    };
  } catch (e) {
    console.error(e);
    return {
      message: "Internal server error",
      error: true,
      data: null,
    };
  }
}
