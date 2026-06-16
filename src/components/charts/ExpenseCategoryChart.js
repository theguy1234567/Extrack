"use client";
import "./chartConfig";
import { Doughnut } from "react-chartjs-2";

export default function ExpenseCategoryChart() {
  const data = {
    labels: ["Food", "Travel", "Entertainment"],
    datasets: [
      {
        data: [500, 300, 200],
        borderWidth: 1,
        backgroundColor: ["#3B82F6", "#10B981", "#F59E0B"],
      },
    ],
  };
  return <Doughnut data={data} />;
}
