import { createClient } from "@/utils/supabase/server";
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
    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(data.avatar_url);
    return <MessageClient avatar_url={publicUrl} username={name} />;
  } catch (e) {
    console.error(e);
    return <ErrorPage />;
  }
};

export default Message;
