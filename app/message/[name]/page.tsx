import { createClient, getAvatarUrl } from "@/utils/supabase/server";
import MessageClient from "./pageClient";
import ErrorPage from "@/app/error";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Send anonymous message",
  description: "Send anonymous message to anyone",
};

const Message = async ({ params }: { params: Promise<{ name: string }> }) => {
  const { name } = await params;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", name)
      .single();

    if (error) {
      throw Error(error.message);
    }
    const avatar_url = await getAvatarUrl(data.avatar_url);
    return <MessageClient avatar_url={avatar_url} username={name} />;
  } catch (e: any) {
    console.error(e);
    if (e.message.includes("multiple (or no) rows returned")) {
      return (
        <ErrorPage message={`Orang dengan nama "${name}" tidak ditemukan!`} />
      );
    }
    return <ErrorPage />;
  }
};

export default Message;
