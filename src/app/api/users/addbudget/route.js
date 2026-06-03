import { NextResponse } from "next/server";
import connectToDB from "@/dbconfig/dbconfig";
import Budget from "@/models/budgetmodel";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export async function GET(req) {
  try {
    await connectToDB();
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }
    const decoded = jwt.verify(token, process.env.ACC_TOKEN_SEC);

    const budgets = await Budget.find({
      createdBy: decoded.id,
    })
      .populate("budgetCategory")
      .sort({
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
        status: 500,
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
        { status: 401 },
      );
    }

    const decodedToken = jwt.verify(token, process.env.ACC_TOKEN_SEC);

    const userId = decodedToken.id;
    const { budgetAmount, periodType, startDate, budgetCategory, endDate } = await req.json();
    if (
      !budgetAmount ||
      !periodType ||
      !startDate ||
      !budgetCategory ||
      !endDate
    ) {
      return NextResponse.json(
        { message: "Pls enter all the fields" },
        { status: 401 },
      );
    }
    const budgetCategoryObjId = new mongoose.Types.ObjectId(budgetCategory);
    //valdiating date endate < startdate
    if (new Date(startDate) >= new Date(endDate)) {
      return NextResponse.json(
        {
          message: "end date must be after start date",
        },
        { status: 400 },
      );
    }

    //existing budget overlaping date
    const existingBudget = await Budget.findOne({
      createdBy: userId,
      budgetCategory: budgetCategoryObjId,
      startDate: {
        $lte: new Date(endDate),
      },
      endDate: {
        $gte: new Date(startDate),
      },
    });
    if (existingBudget) {
      return NextResponse.json(
        {
          message:
            "A budget already exists for this category during this period",
        },
        {
          status: 409,
        },
      );
    }

    const newBudget = new Budget({
      budgetAmount,
      budgetCategory: budgetCategoryObjId,
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
        status: 201,
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
