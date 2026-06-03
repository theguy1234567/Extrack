import connectToDB from "@/dbconfig/dbconfig";
import { NextResponse } from "next/server";
import jwt, { verify } from "jsonwebtoken";
import Expense from "@/models/expensemodel";
import Income from "@/models/incomemodel";
import Budget from "@/models/budgetmodel";
import Category from "@/models/categorymodel";
import verifyAndGetUserid from "@/helpers/verifyandgetUserid";
import mongoose from "mongoose";
export async function GET(req) {
  try {
    await connectToDB();

    const token = req.cookies.get("token")?.value;

    const userID = verifyAndGetUserid(token);
    const userIDobj = new mongoose.Types.ObjectId(userID);

    const [expenseRes, incomeRes] = await Promise.all([
      Expense.aggregate([
        {
          $match: { createdBy: userIDobj },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$expenseAmount",
            },
          },
        },
      ]),
      Income.aggregate([
        {
          $match: { createdBy: userIDobj },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$IncomeAmount",
            },
          },
        },
      ]),
    ]);
    const totalExpenses = expenseRes[0]?.total || 0;
    const totalIncomes = incomeRes[0]?.total || 0;

    const totalSavings = totalIncomes - totalExpenses;

    return NextResponse.json(
      {
        message: "Aggregated values succesfully!",
        totalExpenses,
        totalIncomes,
        totalSavings,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("error in backend from GET api getDetails", error);
    return NextResponse.json(
      {
        message: "Something went wrong while aggreagating",
      },
      { status: 500 },
    );
  }
}
