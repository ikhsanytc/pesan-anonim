import { getAvatarUrl, getProfile } from "@/utils/supabase/server";
import EditAvatarClient from "./pageClient";
import { redirect } from "next/navigation";

export default async function EditAvatar() {
  const profile = await getProfile();
  if (!profile) redirect("/register");
  const avatar_url = await getAvatarUrl(profile.avatar_url);
  return (
    <EditAvatarClient
      fileNameAvatar={profile.avatar_url}
      avatar_url={avatar_url}
    />
  );
}
