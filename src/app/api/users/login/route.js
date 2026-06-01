import connectToDB from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
await connectToDB();
export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ useremail: email });
    if (!user) {
      return NextResponse.json(
        { message: "User not found signup " },
        { status: 400 },
      );
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { message: "Invalid Passord try again" },
        { statusL: 400 },
      );
    }
    const tokendata = {
      id: user._id,
      username: user.username,
      email: user.useremail,
    };
    const accToken = await jwt.sign(tokendata, process.env.ACC_TOKEN_SEC, {
      expiresIn: "1d",
    })
    


    const response = NextResponse.json({
      message: "Login successfully!",
      success: true,
    });
    response.cookies.set("token", accToken, { httpOnly: true });
    return response;
  } catch (error) {
    console.log("somethign went wrong during login", error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
