import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

type RequestJSON = {
  age: number;
  month: string;
  year: string;
  email: string;
  password: string;
  username: string;
  avatar: string;
};

export async function POST(req: NextRequest) {
  const { age, avatar, email, month, password, username, year }: RequestJSON =
    await req.json();
  if (!age || !avatar || !email || !month || !password || !username || !year) {
    return NextResponse.json(
      {
        error: true,
        message: "Missing fields",
      },
      {
        status: 400,
      }
    );
  }
  const image = avatar === "nophoto.jpeg" ? "nophoto.jpeg" : avatar;
  try {
    const supabase = await createClient();
    await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          avatar_url: image,
          age,
          month,
          year,
          email,
        },
      },
    });
    return NextResponse.json({
      error: false,
      message: "User created",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: true,
        message: "Error creating user: " + error.message,
      },
      {
        status: 500,
      }
    );
  }
}
