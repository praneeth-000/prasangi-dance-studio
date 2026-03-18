import { useEffect, useState } from "react";
import { collection, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

import RevenueChart from "./RevenueChart";

const Revenue = () => {

  const [totalRevenue, setTotalRevenue] = useState(0);
  const [monthRevenue, setMonthRevenue] = useState(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "students"), (studentsSnapshot) => {
      let total = 0;
      let thisMonth = 0;

      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      studentsSnapshot.docs.forEach((studentDoc) => {
        const student = studentDoc.data();
        const baseFee = Number(student.fee) || 0;
        
        let date;
        if (student.startDate && typeof student.startDate.toDate === 'function') {
            date = student.startDate.toDate();
        } else if (student.startDate) {
            date = new Date(student.startDate);
        }

        if (date && baseFee) {
          total += baseFee;
          if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
            thisMonth += baseFee;
          }
        }
      });

      setTotalRevenue(total);
      setMonthRevenue(thisMonth);
    });

    return () => unsubscribe();

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