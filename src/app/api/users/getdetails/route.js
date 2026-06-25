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

    const [
      expenseRes,
      incomeRes,
      categoryexpRes,
      monthlyExpenseRes,
      monthlyIncomeRes,
    ] = await Promise.all([
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
      Expense.aggregate([
        {
          $match: {
            createdBy: userIDobj,
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "expenseCategory",
            foreignField: "_id",
            as: "category",
          },
        },
        //to change from [] to {}
        {
          $unwind: "$category",
        },
        {
          $group: {
            _id: "$category.categoryName",
            total: {
              $sum: "$expenseAmount",
            },
          },
        },
        {
          $project: {
            _id: 0,
            category: "$_id",
            total: 1,
          },
        },
      ]),
      Expense.aggregate([
        {
          $match: {
            createdBy: userIDobj,
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            total: {
              $sum: "$expenseAmount",
            },
          },
        },
        {
          $project: {
            _id: 0,
            year: "$_id.year",
            month: "$_id.month",
            total: 1,
          },
        },
        {
          $sort: {
            month: 1,
          },
        },
      ]),
      Income.aggregate([
        {
          $match: {
            createdBy: userIDobj,
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            total: {
              $sum: "$IncomeAmount",
            },
          },
        },
        {
          $project: {
            _id: 0,
            year: "$_id.year",
            month: "$_id.month",
            total: 1,
          },
        },
        {
          $sort: {
            month: 1,
          },
        },
      ]),
    ]);
    const totalExpenses = expenseRes[0]?.total || 0;
    const totalIncomes = incomeRes[0]?.total || 0;

    const totalSavings = totalIncomes - totalExpenses;
    const categoryExpenses = categoryexpRes;

    return NextResponse.json(
      {
        message: "Aggregated values succesfully!",
        totalExpenses,
        totalIncomes,
        totalSavings,
        categoryExpenses,
        monthlyExpenseRes,
        monthlyIncomeRes,
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
