"use client";
import "./chartConfig";
import { Bar } from "react-chartjs-2";

export default function IncomeExpenseBarChart() {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],

    datasets: [
      {
        label: "Income",
        data: [
          5000, 6000, 4500, 7000, 5500, 6200, 4800, 7000, 6500, 7200, 6900,
          8000,
        ],

        backgroundColor: "rgba(34, 197, 94, 0.7)",
        borderColor: "rgb(34, 197, 94)",
        borderWidth: 1,
      },

      {
        label: "Expense",
        data: [
          100, 1000, 4000, 2000, 1500, 3000, 2500, 4200, 3800, 5000, 4500, 6000,
        ],

        backgroundColor: "rgba(239, 68, 68, 0.7)",
        borderColor: "rgb(239, 68, 68)",
        borderWidth: 1,
      },
    ],
  };
  return <Bar data={data} />;
}
