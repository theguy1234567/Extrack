import {
  Chart as chartjs,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  BarElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

chartjs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
);
