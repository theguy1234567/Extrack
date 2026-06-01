import { NextResponse } from "next/server";
import connectToDB from "@/dbconfig/dbconfig";
import Budget from "@/models/budgetmodel";
import jwt from "jsonwebtoken";


export async function GET() {
  try {
    await connectToDB();

    const budgets = await Budget.find({}).sort({
      createdAt: -1,
    });
    return NextResponse.json(
      { message: "budgets gathered succesfully", success: true, data: budgets },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log("somethign went wrong in get budgets", error);
    return NextResponse.json(
      { message: "Something webt wront in budgets gatherin", success: false },
      {
        status: 401,
      },
    );
  }
}
export async function POST(req) {
  try {
    await connectToDB();
    const token = req.cookies.get("token")?.value;
    console.log("Token from cookies:", token);
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized req" },
        { status: 400 },
      );
    }
    const { budgetAmount, periodType, startDate, endDate } = await req.json();

    if (!budgetAmount || !periodType || !startDate || !endDate) {
      return NextResponse.json(
        { message: "Pls enter all the fields" },
        { status: 401 },
      );
    }
    const decodedToken = jwt.verify(token, process.env.ACC_TOKEN_SEC);

    const userId = decodedToken.id;
    console.log(userId);

    const newBudget = new Budget({
      budgetAmount,
      periodType,
      startDate,
      createdBy: userId,
      endDate,
    });
    const savedBudget = await newBudget.save();
    return NextResponse.json(
      {
        message: "Budget added succesfully",
        success: true,
        data: savedBudget,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log("error in backend from Post api addbudget", error);
    return NextResponse.json(
      {
        message: "Something went wrong while adding a Budget in api",
      },
      { status: 500 },
    );
  }
}
