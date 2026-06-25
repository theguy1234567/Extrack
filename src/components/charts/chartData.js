export function ChartData(income, expense) {
  return {
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
        data: income,
        backgroundColor: "rgba(34,197,94,.7)",
        borderColor: "rgb(34,197,94)",
        borderWidth: 1,
      },
      {
        label: "Expense",
        data: expense,
        backgroundColor: "rgba(239,68,68,.7)",
        borderColor: "rgb(239,68,68)",
        borderWidth: 1,
      },
    ],
  };
}
