import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Edit,
  Trash2,
  MessageSquare,
  CreditCard,
  Search,
  Plus,
  Users,
  RefreshCw,
  Send
} from "lucide-react";

import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc, updateDoc, addDoc } from "firebase/firestore";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const fetchStudents = async () => {
      const querySnapshot = await getDocs(collection(db, "students"));

      const studentsList = querySnapshot.docs.map((docItem) => {
        const data = docItem.data();

        return {
          id: docItem.id,
          ...data,
          startDate: data.startDate?.toDate().toISOString().split("T")[0],
          expiryDate: data.expiryDate?.toDate().toISOString().split("T")[0]
        };
      });

      setStudents(studentsList);
    };

    fetchStudents();
  }, []);

  const handleRenew = async (student) => {
    if (window.confirm(`Renew membership for ${student.name}?`)) {
      try {
        const newExpiry = new Date(student.expiryDate);
        if (isNaN(newExpiry.getTime())) {
          alert("Invalid current expiry date.");
          return;
        }
        newExpiry.setDate(newExpiry.getDate() + 30);

        await updateDoc(doc(db, "students", student.id), {
          expiryDate: newExpiry
        });

        await addDoc(collection(db, "students", student.id, "payments"), {
          amount: student.fee || 0,
          date: new Date()
        });

        // Update local state
        setStudents((prev) =>
          prev.map((s) => {
            if (s.id === student.id) {
              return {
                ...s,
                expiryDate: newExpiry.toISOString().split("T")[0]
              };
            }
            return s;
          })
        );
      } catch (error) {
        console.error("Error renewing student:", error);
        alert("Failed to renew student.");
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this student?")) {
      await deleteDoc(doc(db, "students", id));
      setStudents((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const calculateStatus = (expiryDate) => {
    const expiry = new Date(expiryDate);
    const today = new Date();

    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Expired";
    if (diffDays <= 7) return "Expiring Soon";
    return "Active";
  };

  const batchCounts = useMemo(() => {
    const counts = { All: students.length };

    students.forEach((s) => {
      const batch = s.batch || "Other";
      counts[batch] = (counts[batch] || 0) + 1;
    });

    return counts;
  }, [students]);

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchesSearch =
        s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.phone?.includes(searchQuery);

      const matchesBatch =
        activeFilter === "All" ||
        s.batch === activeFilter ||
        (!s.batch && activeFilter === "Other");

      return matchesSearch && matchesBatch;
    });
  }, [students, searchQuery, activeFilter]);

  const getStatusBadge = (status) => {
    if (status === "Active")
      return (
        <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          Active
        </span>
      );

    if (status === "Expiring Soon")
      return (
        <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
          Expiring Soon
        </span>
      );

    return (
      <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
        Expired
      </span>
    );
  };

  return (
    <div className="animate-in fade-in duration-500 w-full">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">

        <div>
          <h2 className="text-[28px] font-bold text-gray-900 tracking-tight leading-tight">
            Student Roster
          </h2>
          <p className="text-gray-500 font-medium mt-1 text-sm">
            Manage and view all enrolled students.
          </p>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">

          <div className="relative flex-1 sm:w-64">

            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm bg-white shadow-sm transition-all"
            />

          </div>

          <Link
            to="/admin/students/add"
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors shadow-sm text-sm"
          >
            <Plus size={18} /> Add Student
          </Link>

        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2.5 px-1">

        {Object.entries(batchCounts).map(([batchName, count]) => (

          <button
            key={batchName}
            onClick={() => setActiveFilter(batchName)}
            className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-all shadow-sm ${
              activeFilter === batchName
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:text-gray-900"
            }`}
          >
            {batchName}

            <span
              className={`ml-1 px-1.5 py-0.5 rounded-md text-[10px] ${
                activeFilter === batchName
                  ? "bg-white/20 text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {count}
            </span>

          </button>

        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-[20px] overflow-hidden shadow-sm">

        <div className="overflow-x-auto p-4">

          <table className="w-full text-left">

            <thead>
              <tr className="bg-gray-50 border-b text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Gender</th>
                <th className="px-6 py-4">Batch</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Fee</th>
                <th className="px-6 py-4">Pending Fee</th>
                <th className="px-6 py-4">Dates</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {filteredStudents.length === 0 ? (

                <tr>

                  <td colSpan="7" className="text-center py-16">

                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users size={28} className="text-gray-400" />
                    </div>

                    <p className="text-gray-900 font-bold mb-1">
                      No students found
                    </p>

                    <p className="text-gray-500 text-sm">
                      Try adjusting your search criteria
                    </p>

                  </td>

                </tr>

              ) : (

                filteredStudents.map((student) => {

                  const status = calculateStatus(student.expiryDate);

                  return (

                    <tr
                      key={student.id}
                      className="hover:bg-gray-50 transition-colors group"
                    >

                      <td className="px-6 py-4 font-semibold text-gray-900 text-sm">
                        {student.name}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                        {student.gender || "-"}
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 border">
                          {student.batch}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                        {student.phone}
                      </td>

                      <td className="px-6 py-4 font-bold text-sm text-gray-900">
                        ₹{student.fee?.toLocaleString() || 0}
                      </td>

                      <td className="px-6 py-4 font-bold text-sm text-orange-600">
                        ₹{student.pendingFee?.toLocaleString() || 0}
                      </td>

                      <td className="px-6 py-4 text-[13px] text-gray-500">

                        <div className="flex flex-col gap-1">

                          <span>
                            <span className="font-semibold text-gray-700">
                              Start:
                            </span>{" "}
                            {student.startDate}
                          </span>

                          <span>
                            <span className="font-semibold text-gray-700">
                              Expires:
                            </span>{" "}
                            {student.expiryDate}
                          </span>

                        </div>

                      </td>

                      <td className="px-6 py-4">
                        {getStatusBadge(status)}
                      </td>

                      <td className="px-6 py-4 text-right">

                        <div className="flex justify-end gap-2">

                          <button
                            onClick={() => handleRenew(student)}
                            title="Renew for 30 days"
                            className="p-2 text-amber-600 bg-amber-50 hover:bg-amber-100 rounded-lg border"
                          >
                            <RefreshCw size={16} />
                          </button>

                          <a
                            href={`https://wa.me/91${student.phone}?text=${encodeURIComponent(
                            `Hello ${student.name},

Welcome to Prasangi Dance Studio and Fitness Center

You are successfully registered as a student.

Please carry the following when you come to the studio:
• Water bottle  
• Handkerchief  
• Shoes  

We look forward to seeing you in studio!

Prasangi Dance Studio`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 text-teal-600 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors border border-teal-100/50"
                            title="Send Welcome Message"
                          >
                            <Send size={16} />
                          </a>

                          <a
                            href={`https://wa.me/91${student.phone}?text=${encodeURIComponent(
                            `Hello ${student.name},Your dance class membership at Prasangi Dance Studio is expiring soon.
Please send the renewal payment to this number: 9573551643.
After making the payment, kindly send the payment screenshot to the same number for confirmation.
Thank you!
Prasangi Dance Studio`
                            )}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-100/50"
                              title="Send Renewal Reminder"
                            >
                            <MessageSquare size={16} />
                          </a>

                          <Link
                            to={`/admin/students/${student.id}/payments`}
                            title="View Payments"
                            className="p-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg border"
                          >
                            <CreditCard size={16} />
                          </Link>

                          <Link
                            to={`/admin/students/edit/${student.id}`}
                            title="Edit Student"
                            className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg border"
                          >
                            <Edit size={16} />
                          </Link>

                          <button
                            onClick={() => handleDelete(student.id)}
                            title="Delete Student"
                            className="p-2 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg border"
                          >
                            <Trash2 size={16} />
                          </button>

                        </div>

                      </td>

                    </tr>

                  );
                })

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Students;