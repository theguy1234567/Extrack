import connectToDB from "@/dbconfig/dbconfig";
import { NextResponse } from "next/server";
import User from "@/models/usermodel";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectToDB();
    console.log(" signup API called");

    const reqBody = await req.json();
    const { username, email, password } = reqBody;
    // console.log(reqBody);

    console.log("user check in progress");
    const user = await User.findOne({ useremail: email });

    if (user) {
      return NextResponse.json(
        { message: "User already exixts Login" },
        { status: 400 },
      );
    }
    console.log("user check ccomplete");

    console.log("generating salt");
    const salt = await bcrypt.genSalt(10);
    console.log("salt generated: " + salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Password hashed: " + hashedPassword);

    const newUser = new User({
      username,
      useremail: email,
      password: hashedPassword,
    });
    console.log("User saveing");

    const savedUser = await newUser.save();
    console.log("User Saved");
    console.log(savedUser);

    return NextResponse.json(
      { message: "User saved Succcesfully", savedUser },
      { status: 200 },
    );
  } catch (error) {
    console.error("Signup API Error:", error);
    return NextResponse.json(
      { error: "somethig went wrong while signin up", error },
      { status: 500 },
    );
  }
}
