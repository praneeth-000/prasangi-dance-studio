import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, updateDoc, doc, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Users, UserCheck, AlertTriangle, UserX } from "lucide-react";

const Dashboard = () => {

  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    expiringSoon: 0,
    expired: 0,
    revenue: 0
  });

  const [expiringList, setExpiringList] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "students"), (snapshot) => {
      let total = 0;
      let active = 0;
      let expiringSoon = 0;
      let expired = 0;
      let revenue = 0;
      let expList = [];

      const today = new Date();

      snapshot.docs.forEach((docSnap) => {
        const student = docSnap.data();
        
        // Sum revenue dynamically from active students
        const baseFee = Number(student.fee) || 0;
        revenue += baseFee;

        if (!student.expiryDate) return;

        const expiry = student.expiryDate.toDate
          ? student.expiryDate.toDate()
          : new Date(student.expiryDate);

        const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

        total++;

        if (diffDays < 0) {
          expired++;
        } else if (diffDays <= 7) {
          expiringSoon++;
        } else {
          active++;
        }

        if (diffDays <= 7) {
          expList.push({
            id: docSnap.id,
            ...student,
            daysLeft: diffDays,
            expiryRaw: expiry,
            expiryFormatted: expiry.toISOString().split("T")[0]
          });
        }
      });

      expList.sort((a, b) => a.daysLeft - b.daysLeft);
      setStats({ total, active, expiringSoon, expired, revenue });
      setExpiringList(expList);
    });

    return () => unsubscribe();
  }, []);

  const handleRenew = async (student) => {
    if (window.confirm(`Renew membership for ${student.name}?`)) {
      try {
        const newExpiry = new Date(student.expiryRaw);
        newExpiry.setDate(newExpiry.getDate() + 30);

        await updateDoc(doc(db, "students", student.id), {
          expiryDate: newExpiry
        });

        await addDoc(collection(db, "students", student.id, "payments"), {
          amount: student.fee || 0,
          date: new Date()
        });
      } catch (error) {
        console.error("Error renewing student:", error);
        alert("Failed to renew student.");
      }
    }
  };

  const cards = [
    {
      title: "Total Revenue",
      value: `₹${stats.revenue.toLocaleString()}`,
      icon: Users,
      color: "bg-indigo-100 text-indigo-600"
    },
    {
      title: "Total Students",
      value: stats.total,
      icon: Users,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Active Students",
      value: stats.active,
      icon: UserCheck,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Expiring Soon",
      value: stats.expiringSoon,
      icon: AlertTriangle,
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      title: "Expired",
      value: stats.expired,
      icon: UserX,
      color: "bg-red-100 text-red-600"
    }
  ];

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Overview of your studio performance
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">

        {cards.map((card, index) => {

          const Icon = card.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border p-6 flex items-center justify-between"
            >
              <div>
                <p className="text-sm text-gray-500">
                  {card.title}
                </p>
                <h2 className="text-2xl font-bold mt-1">
                  {card.value}
                </h2>
              </div>

              <div className={`p-3 rounded-lg ${card.color}`}>
                <Icon size={22} />
              </div>
            </div>
          );
        })}

      </div>

      <div className="mt-8 bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">
            Students Expiring Soon
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Accounts expiring within 7 days or already expired
          </p>
        </div>
        
        <div className="divide-y divide-gray-100">
          {expiringList.length === 0 ? (
            <div className="p-6 text-center text-gray-500 text-sm">
              No students expiring soon.
            </div>
          ) : (
            expiringList.map(student => (
              <div key={student.id} className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-gray-50 transition-colors">
                <div>
                  <h3 className="font-semibold text-gray-900">{student.name}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{student.phone}</p>
                </div>
                
                <div className="flex flex-col sm:items-end text-sm">
                  <span className={`font-medium ${student.daysLeft < 0 ? "text-red-600" : "text-yellow-600"}`}>
                    {student.daysLeft < 0 ? `Expired ${Math.abs(student.daysLeft)} days ago` : `Expires in ${student.daysLeft} days`}
                  </span>
                  <span className="text-gray-500">Date: {student.expiryFormatted}</span>
                </div>

                <button
                  onClick={() => handleRenew(student)}
                  className="mt-2 sm:mt-0 px-4 py-2 bg-indigo-50 text-indigo-600 font-medium rounded-lg hover:bg-indigo-100 transition-colors text-sm border border-indigo-100"
                >
                  Renew
                </button>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;