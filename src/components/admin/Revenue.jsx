import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

import RevenueChart from "./RevenueChart";

const Revenue = () => {

  const [totalRevenue, setTotalRevenue] = useState(0);
  const [monthRevenue, setMonthRevenue] = useState(0);

  useEffect(() => {

    const loadRevenue = async () => {

      let total = 0;
      let thisMonth = 0;

      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      const studentsSnapshot = await getDocs(collection(db, "students"));

      for (const studentDoc of studentsSnapshot.docs) {

        const paymentsSnapshot = await getDocs(
          collection(db, "students", studentDoc.id, "payments")
        );

        paymentsSnapshot.docs.forEach(doc => {

          const payment = doc.data();

          if (!payment.date) return;

          const date = payment.date.toDate();

          total += payment.amount;

          if (
            date.getMonth() === currentMonth &&
            date.getFullYear() === currentYear
          ) {
            thisMonth += payment.amount;
          }

        });

      }

      setTotalRevenue(total);
      setMonthRevenue(thisMonth);

    };

    loadRevenue();

  }, []);

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Revenue Overview
        </h1>
        <p className="text-gray-500">
          Track studio earnings and payment trends
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <h2 className="text-3xl font-bold mt-2">
            ₹{totalRevenue.toLocaleString()}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-sm">This Month</p>
          <h2 className="text-3xl font-bold mt-2">
            ₹{monthRevenue.toLocaleString()}
          </h2>
        </div>

      </div>

      <RevenueChart />

    </div>
  );
};

export default Revenue;