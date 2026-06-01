import { NextResponse } from "next/server";
import Income from "@/models/incomemodel";
import connectToDB from "@/dbconfig/dbconfig";
import jwt from "jsonwebtoken";

export async function GET(req) {
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
    const Incomes = await Income.find({}).sort({
      createdAt: -1,
    });
    return NextResponse.json(
      { message: "Incomes gathered succesfully", success: true, data: Incomes },
      { status: 200 },
    );
  } catch (error) {
    console.log("error in backend from GET api Income", error);
    return NextResponse.json(
      {
        message: "Something went wrong while GETting  Incomes",
      },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    await connectToDB();

    const reqbody = await req.json();

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized req" },
        { status: 400 },
      );
    }

    const { IncomeSource, IncomeAmount, description } = reqbody;

    if (!IncomeSource || !IncomeAmount) {
      return NextResponse.json(
        { message: "Provide all the details" },
        { status: 401 },
      );
    }

    const decodedToken = jwt.verify(token, process.env.ACC_TOKEN_SEC);

    const newIncome = new Income({
      IncomeSource,
      IncomeAmount,
      description: description || "",
      createdBy: decodedToken?.id,
    });
    const savedIncome = await newIncome.save();
    return NextResponse.json(
      { message: "sucessfully saved Income", success: true, data: savedIncome },
      { status: 200 },
    );
  } catch (error) {
    console.log("error in backend from Post api Income", error);
    return NextResponse.json(
      {
        message: "Something went wrong while adding a Income api",
      },
      { status: 500 },
    );
  }
}
