import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let avatar: string;
  try {
    const body = await req.json();
    if (!body.avatar) throw new Error("Avatar is required");
    avatar = body.avatar;
  } catch (e) {
    return NextResponse.json(
      {
        error: true,
        message: "Invalid request",
      },
      {
        status: 400,
      }
    );
  }
  try {
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
      throw error;
    }
    return NextResponse.json({
      error: false,
      message: "Avatar uploaded",
      fileName: data.path,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        error: true,
        message: "Error uploading avatar",
      },
      {
        status: 500,
      }
    );
  }
}
