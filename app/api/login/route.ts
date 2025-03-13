import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let email: string, password: string;

  try {
    const body = await req.json();
    if (!body.email || !body.password) {
      throw new Error("Email and password are required");
    }
    email = body.email;
    password = body.password;
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: true, message: "Invalid request" },
      { status: 400 }
    );
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: true, message: "Invalid email or password" },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { error: false, message: "Success" },
    { status: 200 }
  );
}
