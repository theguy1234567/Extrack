import connectToDB from "@/dbconfig/dbconfig";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import Expense from "@/models/expensemodel";
import Category from "@/models/categorymodel";
await connectToDB();

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;

    console.log("Token from cookies:", token);
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized req" },
        { status: 400 },
      );
    }

    const decoded = jwt.verify(token, process.env.ACC_TOKEN_SEC);
    const expenses = await Expense.find({
      createdBy: decoded.id,
    })
      .populate("expenseCategory")
      .sort({ createdAt: -1 });

    const TotalExpense = expenses.reduce((total, expense) => {
      return total + expense.expenseAmount;
    }, 0);

    return NextResponse.json(
      {
        message: "Expenses gathered",
        data: expenses,
        totalExpense: TotalExpense,
        success: true,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("error in backend from get api expense", error);
    return NextResponse.json(
      {
        message: "Something went wrong while getting  the  Expenses",
      },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    const reqBody = await req.json();

    const {
      expenseName,
      expenseAmount,
      description,
      isRecurring,
      recurrencePeriod,
      nextBillingDate,
      expenseCategory,
    } = reqBody;
    console.log("reqBody:", reqBody);

    //validate token

    const token = req.cookies.get("token")?.value;
    console.log("Token from cookies:", token);
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized req" },
        { status: 400 },
      );
    }
    const decoded = jwt.verify(token, process.env.ACC_TOKEN_SEC);
    console.log("decoded  toknen user id:", decoded.id);
    if (!expenseName || !expenseAmount || !expenseCategory) {
      return NextResponse.json(
        { message: "Fill all the fields!!" },
        { status: 400 },
      );
    }

    const categoryName = expenseCategory.trim();

    let newCreatedCategory = await Category.findOne({
      categoryName: categoryName,
      createdBy: decoded.id,
    });
    if (!newCreatedCategory) {
      newCreatedCategory = await Category.create({
        categoryName: categoryName,
        createdBy: decoded.id,
      });
    }

    const newexpense = new Expense({
      expenseName,
      expenseAmount,
      description,
      isRecurring,
      recurrencePeriod: recurrencePeriod || undefined, // this is for the recurrencePeriod we gave enums in the model so a "" string is not a valid . if user gives take that or set it to undefined
      nextBillingDate,
      expenseCategory: newCreatedCategory._id,
      createdBy: decoded.id,
    });
    const savedexpense = await newexpense.save();
    return NextResponse.json(
      {
        message: "Expense added succesfully",
        success: true,
        savedexpense,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log("error in backend from Post api expense", error);
    return NextResponse.json(
      {
        message: "Something went wrong while adding a Expense",
      },
      { status: 500 },
    );
  }
}
