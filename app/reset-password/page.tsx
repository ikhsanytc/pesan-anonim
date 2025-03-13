import { getUser } from "@/utils/supabase/server";
import ResetPasswordClient from "./clientPage";
import { redirect } from "next/navigation";

export default async function ResetPassword() {
  const user = await getUser();
  if (user) {
    redirect("/home");
  }
  return <ResetPasswordClient />;
}
