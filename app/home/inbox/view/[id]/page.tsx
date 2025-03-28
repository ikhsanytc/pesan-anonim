import { createClient, getUser } from "@/utils/supabase/server";
import ViewInboxClient from "./pageClient";
import ErrorPage from "@/app/error";
import { redirect } from "next/navigation";

export default async function ViewInbox({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const user = await getUser();
  if (!user) {
    redirect("/register");
  }
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(error.message);
    }
    if (!data.read) {
      await supabase
        .from("messages")
        .update({
          read: true,
        })
        .eq("id", id);
    }
    return <ViewInboxClient data={data!} />;
  } catch (e: any) {
    console.error(e);
    if (e.message.includes("multiple (or no) rows returned")) {
      return <ErrorPage message="Pesan tidak ditemukan!" />;
    }
    return <ErrorPage />;
  }
}
