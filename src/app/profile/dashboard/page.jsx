"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [dashbaorddata, setdashboardData] = useState({
    totalExpenses: 0,
    totalIncomes: 0,
    totalSavings: 0,
    categoryExpenses: {},
  });
  async function getExp() {
    try {
      const res = await axios.get("/api/users/getdetails", {
        withCredentials: true,
      });
      console.log(res);
      setdashboardData({
        totalExpenses: res.data.totalExpenses,
        totalIncomes: res.data.totalIncomes,
        totalSavings: res.data.totalSavings,
        categoryExpenses: res.data.categoryExpenses,
      });
    } catch (error) {
      console.log("something went wrong while fetching total expense");
      console.log(error);
    }
  }

  useEffect(() => {
    getExp();
  }, []);

  return (
    <>
      <div className="min-h-screen mt-10">
        <div className="grid grid-cols-4 gap-3 auto-rows-[180px]">
          {/* KPI Cards */}
          <div className="bg-blue-400 rounded-2xl px-4 py-4">
            Total Expenses
            {dashbaorddata.totalExpenses}
            <br />
          </div>

          <div className="bg-blue-400 rounded-2xl px-4 py-4">
            Total Income
            {dashbaorddata.totalIncomes}
            <br />
            Shows all-time income
          </div>

          <div className="bg-blue-400 rounded-2xl px-4 py-4">
            Total Savings
            {dashbaorddata.totalSavings}
            <br />
            Income - Expenses
          </div>

          <div className="bg-blue-400 rounded-2xl px-4 py-4">
            Monthly Budget Left
            <br />
            Remaining budget this month
          </div>

          {/* Main Analytics */}
          <div className="bg-blue-400 rounded-2xl px-4 py-4 col-span-2 row-span-2">
            Income vs Expense Trend
            <br />
            Line / Area chart
          </div>

          <div className="bg-blue-400 rounded-2xl px-4 py-4 row-span-2">
            Category Breakdown
            <br />
            Pie chart showing Food, Rent, Travel, etc.
          </div>

          <div className="bg-blue-400 rounded-2xl px-4 py-4">
            Daily Spending Limit
            <br />
            Budget remaining today
          </div>

          {/* Secondary Analytics */}
          <div className="bg-blue-400 rounded-2xl px-4 py-4 col-span-2">
            Monthly Expense Heatmap
            <br />
            Spending intensity by day
          </div>

          <div className="bg-blue-400 rounded-2xl px-4 py-4">
            Top Expense Category
            <br />
            Highest spending category
          </div>

          <div className="bg-blue-400 rounded-2xl px-4 py-4">
            Most Recent Expense
            <br />
            Latest transaction
          </div>

          {/* Bottom Section */}
          <div className="bg-blue-400 rounded-2xl px-4 py-4 col-span-2">
            Budget Progress
            <br />
            Progress bars for each category budget
          </div>

          <div className="bg-blue-400 rounded-2xl px-4 py-4">
            Upcoming Subscriptions
            <br />
            Netflix, Spotify, etc.
          </div>

          <div className="bg-blue-400 rounded-2xl px-4 py-4">
            Financial Health Score
            <br />
            Savings rate + budget adherence
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
