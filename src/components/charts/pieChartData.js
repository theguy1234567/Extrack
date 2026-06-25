export function pieChartData(categoryExpenses) {
  return {
    labels: categoryExpenses.map((item) => item.category),

    datasets: [
      {
        data: categoryExpenses.map((item) => item.total),
        borderWidth: 1,
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
          "#F97316",
          "#14B8A6",
          "#EC4899",
        ],
      },
    ],
  };
}
