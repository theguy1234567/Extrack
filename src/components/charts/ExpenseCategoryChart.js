"use client";
import "./chartConfig";
import { Doughnut } from "react-chartjs-2";

export default function ExpenseCategoryChart({chartdata}) {
  
  return <Doughnut data={chartdata} />;
}
