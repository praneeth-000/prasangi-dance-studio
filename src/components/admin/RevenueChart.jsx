import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const RevenueChart = () => {

  const [chartData, setChartData] = useState(null);

  useEffect(() => {

    const loadRevenue = async () => {

      const months = {
        Jan: 0,
        Feb: 0,
        Mar: 0,
        Apr: 0,
        May: 0,
        Jun: 0,
        Jul: 0,
        Aug: 0,
        Sep: 0,
        Oct: 0,
        Nov: 0,
        Dec: 0
      };

      const studentsSnapshot = await getDocs(collection(db, "students"));

      for (const studentDoc of studentsSnapshot.docs) {

        const paymentsSnapshot = await getDocs(
          collection(db, "students", studentDoc.id, "payments")
        );

        paymentsSnapshot.docs.forEach(doc => {

          const payment = doc.data();

          if (!payment.date) return;

          const date = payment.date.toDate();

          const month = date.toLocaleString("default", { month: "short" });

          months[month] += payment.amount;

        });

      }

      setChartData({
        labels: Object.keys(months),
        datasets: [
          {
            label: "Monthly Revenue",
            data: Object.values(months),
            backgroundColor: "#ef4444",
            borderRadius: 6
          }
        ]
      });

    };

    loadRevenue();

  }, []);

  if (!chartData) return <p>Loading chart...</p>;

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mt-10">

      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Monthly Revenue
      </h3>

      <Bar data={chartData} />

    </div>
  );

};

export default RevenueChart;