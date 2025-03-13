import { getUser } from "@/utils/supabase/server";
import ForgotPasswordClient from "./clientPage";
import { redirect } from "next/navigation";

export default async function ForgotPassword() {
  const user = await getUser();
  if (user) {
    redirect("/home");
  }
  return <ForgotPasswordClient />;
}
