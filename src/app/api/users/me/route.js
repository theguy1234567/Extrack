import { NextResponse } from "next/server";
import verifyAndGetUserid from "@/helpers/verifyandgetUserid";

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;

    const tokenData = verifyAndGetUserid(token);
    if (tokenData) {
      return NextResponse.json({ data: tokenData });
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message || "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }
}
