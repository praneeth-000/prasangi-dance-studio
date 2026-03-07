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
  const [totals, setTotals] = useState({ month: 0, year: 0 });

  useEffect(() => {

    const loadRevenue = async () => {

      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth();
      
      let currentMonthTotal = 0;
      let currentYearTotal = 0;

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

          if (date.getFullYear() === currentYear) {
            currentYearTotal += payment.amount;
            if (date.getMonth() === currentMonth) {
              currentMonthTotal += payment.amount;
            }
          }

        });

      }

      setTotals({ month: currentMonthTotal, year: currentYearTotal });

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

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-lg font-bold text-gray-900">
          Revenue Analytics
        </h3>
        
        <div className="flex gap-4">
          <div className="bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-100">
            <p className="text-xs text-indigo-600 font-medium mb-0.5">This Month</p>
            <p className="text-lg font-bold text-indigo-900">₹{totals.month.toLocaleString()}</p>
          </div>
          <div className="bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-100">
            <p className="text-xs text-emerald-600 font-medium mb-0.5">This Year</p>
            <p className="text-lg font-bold text-emerald-900">₹{totals.year.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <Bar data={chartData} />

    </div>
  );

};

export default RevenueChart;