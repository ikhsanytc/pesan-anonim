import { getAvatarUrl, getProfile, getUser } from "@/utils/supabase/server";
import ClientPage from "./clientPage";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const user = await getUser();
  const profile = await getProfile();
  if (!user || !profile) {
    redirect("/register");
  }
  const avatar_url = await getAvatarUrl(profile.avatar_url);
  return <ClientPage user={user} profile={profile} avatar_url={avatar_url} />;
}
