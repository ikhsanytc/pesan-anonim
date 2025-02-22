import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { avatar }: { avatar: string } = await req.json();
  if (!avatar)
    return NextResponse.json(
      {
        error: true,
        message: "No avatar provided",
      },
      {
        status: 400,
      }
    );
  const supabase = await createClient();
  const base64Data = avatar.replace(/^data:image\/png;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");
  const fileName = `avatar_${Date.now()}.png`;
  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(fileName, buffer, {
      cacheControl: "3600",
      contentType: "image/png",
      upsert: false,
    });
  if (error) {
    return NextResponse.json(
      {
        error: true,
        message: "Error uploading avatar: " + error.message,
      },
      {
        status: 500,
      }
    );
  }
  return NextResponse.json({
    error: false,
    message: "Avatar uploaded",
    fileName: data.path,
  });
}
