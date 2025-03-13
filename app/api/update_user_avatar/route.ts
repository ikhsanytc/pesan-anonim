import { createClient, getUser } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let avatar: string;
  let public_url: string;
  try {
    const body = await req.json();
    if (!body.avatar) throw new Error("Avatar url is required");
    avatar = body.avatar;
  } catch (e) {
    console.error(e);
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
    const user = await getUser();
    if (!user) {
      return NextResponse.json(
        {
          error: true,
          message: "Login dulu.",
        },
        {
          status: 401,
        }
      );
    }
    const { error } = await supabase
      .from("profiles")
      .update({
        avatar_url: avatar,
      })
      .eq("id", user.id);
    if (error) {
      throw new Error(error.message);
    }
    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(avatar);
    public_url = publicUrl;
  } catch (e: any) {
    console.error(e);
    if (e.message) {
      return NextResponse.json(
        {
          error: true,
          message: e.message,
        },
        {
          status: 500,
        }
      );
    }
    return NextResponse.json(
      {
        error: true,
        message: "Error updating user avatar",
      },
      {
        status: 500,
      }
    );
  }
  return NextResponse.json({
    error: false,
    message: "Success updating user avatar",
    public_url,
  });
}
