import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  let fileName: string;
  try {
    const body = await req.json();
    if (!body.fileName) throw new Error("File name is required");
    fileName = body.fileName;
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
    const { error } = await supabase.storage.from("avatars").remove([fileName]);
    if (error) {
      throw Error(error.message);
    }
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
        message: "Error deleting avatar",
      },
      {
        status: 500,
      }
    );
  }
  return NextResponse.json({
    error: false,
    message: "Avatar deleted",
    fileName: fileName,
  });
}
