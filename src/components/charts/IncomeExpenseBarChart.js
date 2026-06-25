"use client";
import "./chartConfig";
import { Bar } from "react-chartjs-2";

export default function IncomeExpenseBarChart({ chartData }) {
  return <Bar data={chartData} />;
}
