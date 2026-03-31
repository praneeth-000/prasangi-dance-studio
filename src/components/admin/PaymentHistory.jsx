import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Plus, CreditCard } from "lucide-react";

import { db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  Timestamp
} from "firebase/firestore";

const PaymentHistory = () => {
  const { id } = useParams();

  const [student, setStudent] = useState(null);
  const [payments, setPayments] = useState([]);

  const [month, setMonth] = useState("");
  const [amount, setAmount] = useState("");

  // 🔥 LOAD STUDENT
  useEffect(() => {
    const loadStudent = async () => {
      const studentRef = doc(db, "students", id);
      const studentSnap = await getDoc(studentRef);

      if (studentSnap.exists()) {
        setStudent({
          id: studentSnap.id,
          ...studentSnap.data()
        });
      }
    };

    loadStudent();
  }, [id]);

  // 🔥 LOAD PAYMENTS
  useEffect(() => {
    const loadPayments = async () => {
      const paymentRef = collection(db, "students", id, "payments");

      const querySnapshot = await getDocs(paymentRef);

      const paymentList = querySnapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
        date: docItem.data().date?.toDate().toISOString().split("T")[0]
      }));

      setPayments(paymentList);
    };

    loadPayments();
  }, [id]);

  // 🔥 ADD PAYMENT
  const handleAddPayment = async (e) => {
    e.preventDefault();

    if (!month || !amount) return;

    const newPayment = {
      month,
      amount: Number(amount),
      date: Timestamp.now()
    };

    const paymentRef = collection(db, "students", id, "payments");

    await addDoc(paymentRef, newPayment);

    setPayments([
      {
        ...newPayment,
        id: Date.now(),
        date: new Date().toISOString().split("T")[0]
      },
      ...payments
    ]);

    setMonth("");
    setAmount("");
  };

  if (!student)
    return (
      <div className="p-8 text-center text-gray-500">
        Loading student...
      </div>
    );

  return (
    <div className="animate-in fade-in duration-500 max-w-[1000px] mx-auto">

      <div className="mb-8">
        <Link
          to="/admin/students"
          className="inline-flex items-center text-[13px] font-semibold text-gray-500 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft size={16} className="mr-1.5" /> Back to Roster
        </Link>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <div>
            <h2 className="text-[28px] font-bold text-gray-900 tracking-tight leading-tight">
              Payment History
            </h2>
            <div className="flex items-center mt-2 text-sm">
              <span className="text-gray-500 mr-1.5">Record for</span>
              <span className="font-semibold text-gray-900">{student.name}</span>
              <span className="mx-2 text-gray-300">•</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-gray-100 text-gray-600 tracking-wide uppercase">
                {student.batch}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">

        {/* ADD PAYMENT */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] sticky top-6">

            <h3 className="text-base font-bold text-gray-900 mb-5 flex items-center">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center mr-3 shadow-sm border border-emerald-100/50">
                <Plus size={16} className="text-emerald-600" />
              </div>
              Record Payment
            </h3>

            <form onSubmit={handleAddPayment} className="space-y-4">

              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-700">
                  Billing Period
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. July 2025"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 placeholder-gray-500 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-700">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  required
                  placeholder={`e.g. ${student.fee}`}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 placeholder-gray-500 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 mt-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <CreditCard size={16} /> Save Record
              </button>

            </form>
          </div>
        </div>

        {/* PAYMENT LIST */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-[20px] border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] overflow-hidden">

            <div className="px-6 py-5 border-b border-gray-100/80 flex justify-between items-center bg-gray-50/30">
              <h3 className="font-bold text-gray-900 text-[15px]">
                Transaction Ledger
              </h3>
              <span className="text-[11px] font-bold px-2 py-1 bg-gray-100 text-gray-600 rounded-md tracking-wider uppercase">
                {payments.length} Records
              </span>
            </div>

            {payments.length === 0 ? (
              <div className="p-16 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                  <CreditCard size={28} className="text-gray-400" />
                </div>
                <h3 className="text-gray-900 font-bold mb-1">
                  No payment history
                </h3>
                <p className="text-gray-500 text-sm">
                  Add a payment record using the form.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {payments.map((payment) => (
                  <li
                    key={payment.id}
                    className="p-5 sm:px-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 text-emerald-600 border border-emerald-100/50">
                        <CreditCard size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-[15px] leading-tight mb-1">
                          {payment.month}
                        </p>
                        <p className="text-[12px] font-medium text-gray-500">
                          Recorded: {payment.date}
                        </p>
                      </div>
                    </div>

                    <div className="font-bold text-gray-900 text-lg">
                      ₹{payment.amount.toLocaleString()}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;