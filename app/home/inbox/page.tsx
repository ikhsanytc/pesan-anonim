import { getProfile, getUser } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import InboxClient from "./pageClient";

export default async function Inbox() {
  const user = await getUser();
  const profile = await getProfile();
  if (!user || !profile) {
    redirect("/register");
  }
  return <InboxClient username={profile.username} />;
}
