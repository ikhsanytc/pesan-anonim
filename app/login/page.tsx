import { getUser } from "@/utils/supabase/server";
import ClientPage from "./clientPage";
import { redirect } from "next/navigation";

export default async function Login() {
  const user = await getUser();
  if (user) {
    redirect("/home");
  }
  return <ClientPage />;
}
