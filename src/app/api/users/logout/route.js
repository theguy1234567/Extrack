import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const response = NextResponse.json({
      message: "logout successfull",
      success: true,
    });
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      {
        message: "Some thing went wrong during the logout",
      },
      { status: 500 },
    );
  }
}
