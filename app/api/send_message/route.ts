import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let from, message, to;
  try {
    const body = await req.json();
    if (!body.from || !body.message || !body.to) {
      throw new Error("Invalid request");
    }
    from = body.from;
    message = body.message;
    to = body.to;
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "Invalid request",
        error: true,
      },
      {
        status: 400,
      }
    );
  }
  if (from === to)
    return NextResponse.json({
      message: "Kamu tidak bisa kirim pesan ke diri sendiri!",
      error: true,
    });
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("messages").insert({
      from,
      message,
      to,
    });
    if (error) {
      throw new Error(error.message);
    }
  } catch (e: any) {
    console.error(e);
    const errorMessage = e.message ? e.message : "Internal server error";
    return NextResponse.json(
      {
        message: errorMessage,
        error: true,
      },
      {
        status: 500,
      }
    );
  }
  return NextResponse.json({
    message: "Success",
    error: false,
  });
}
