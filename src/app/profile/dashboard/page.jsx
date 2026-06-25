"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ExpenseCategoryChart from "@/components/charts/ExpenseCategoryChart";
import IncomeExpenseBarChart from "@/components/charts/IncomeExpenseBarChart";
import Card from "@/components/dashboard_components/Card";
import { ChartData } from "@/components/charts/chartData";
import { pieChartData } from "@/components/charts/pieChartData";
function Dashboard() {
  const [dashbaorddata, setdashboardData] = useState({
    totalExpenses: 0,
    totalIncomes: 0,
    totalSavings: 0,
    categoryExpenses: [],
    monthlyExpense: [],
    monthlyIncome: [],
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
        monthlyExpense: res.data.monthlyExpenseRes,
        monthlyIncome: res.data.monthlyIncomeRes,
      });
    } catch (error) {
      console.log("something went wrong while fetching total expense");
      console.log(error);
    }
  }

  useEffect(() => {
    getExp();
  }, []);
  //data for the charts
  const income = Array(12).fill(0);
  const expense = Array(12).fill(0);

  dashbaorddata?.monthlyExpense.forEach((item) => {
    expense[item.month - 1] = item.total;
  });
  dashbaorddata?.monthlyIncome.forEach((item) => {
    income[item.month - 1] = item.total;
  });
  const chartData = ChartData(income, expense);
  const pieData = pieChartData(dashbaorddata.categoryExpenses);

  return (
    <>
      <div className="min-h-screen ">
        <div className="grid grid-cols-3 gap-3 auto-rows-[180px]">
          {/* KPI Cards */}
          <Card title="Income" value={dashbaorddata.totalIncomes} />
          <Card title="Expenses" value={dashbaorddata.totalExpenses} />
          <Card title="Savings" value={dashbaorddata.totalSavings} />

          {/* Main Analytics */}
          <div className="rounded-2xl px-4 py-4 col-span-2 row-span-2">
            Income vs Expense Trend
            <br />
            <IncomeExpenseBarChart chartData={chartData} />
          </div>

          <div className="rounded-2xl px-4 py-4 row-span-2">
            Category Breakdown
            <br />
            <ExpenseCategoryChart chartdata={pieData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
