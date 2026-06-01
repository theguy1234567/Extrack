import { NextResponse } from "next/server";
import connectToDB from "@/dbconfig/dbconfig";

export async function GET(req) {
  try {
    await connectToDB();
    return NextResponse.json(
      { message: "hello from backend", success: true },
      { status: 200 },
    );
  } catch (error) {
    console.log("Sever not working ,from healthcheck api", error);
    return NextResponse.json(
      { message: "Server not responding backend", success: true },
      { status: 500 },
    );
  }
}
