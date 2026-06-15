import { NextResponse } from "next/server";
import verifyAndGetUserid from "@/helpers/verifyandgetUserid";
import Category from "@/models/categorymodel";

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;
    const userID = verifyAndGetUserid(token);

    const categories = await Category.find({
      createdBy: userID,
    }).sort({
      categoryName: 1,
    });
    return NextResponse.json(
      {
        message: "Categories gathers sucessfylly",
        data: categories,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong while gatehring categories" },
      { status: 401 },
    );
  }
}
