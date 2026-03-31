import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const AddStudent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    gender: "",
    guardianName: "",
    guardianPhone: "",
    batch: "",
    fee: "",
    pendingFee: "",
    startDate: "",
    expiryDate: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "students"), {
        name: formData.name,
        phone: formData.phone,
        gender: formData.gender,
        guardianName: formData.guardianName,
        guardianPhone: formData.guardianPhone,
        batch: formData.batch,
        fee: Number(formData.fee),
        pendingFee: Number(formData.pendingFee) || 0,
        notes: formData.notes,
        startDate: Timestamp.fromDate(new Date(formData.startDate)),
        expiryDate: Timestamp.fromDate(new Date(formData.expiryDate)),
        createdAt: Timestamp.now(),
      });

      alert("Student added successfully!");

      navigate("/admin/students");
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Failed to add student");
    }
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-[1000px] mx-auto">
      
      {/* Header section */}
      <div className="mb-8">
        <h2 className="text-[28px] font-bold text-gray-900 tracking-tight leading-tight">
          New Admission
        </h2>
        <p className="text-gray-500 font-medium mt-1 text-sm">
          Enter details to enroll a new student into the academy.
        </p>
      </div>

      <div className="bg-white rounded-[20px] shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="divide-y divide-gray-100">
          
          <div className="p-6 md:p-8 space-y-8">
            {/* Context Section 1: Student Details */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-5">Student Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700">Student Name *</label>
                  <input
                    type="text" name="name" required value={formData.name} onChange={handleChange}
                    placeholder="Enter full name"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 placeholder-gray-500 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700">Primary Phone *</label>
                  <input
                    type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                    placeholder="Enter 10-digit number"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 placeholder-gray-500 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700">Gender *</label>
                  <select
                    name="gender" required value={formData.gender} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-[0_1px_2px_rgba(0,0,0,0.02)] appearance-none"
                  >
                    <option value="" disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Context Section 2: Guardian Details */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-5">Guardian Information (Optional)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700">Guardian Name</label>
                  <input
                    type="text" name="guardianName" value={formData.guardianName} onChange={handleChange}
                    placeholder="Parent or Guardian"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 placeholder-gray-500 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700">Secondary Contact</label>
                  <input
                    type="tel" name="guardianPhone" value={formData.guardianPhone} onChange={handleChange}
                    placeholder="Alternate number"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 placeholder-gray-500 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                  />
                </div>
              </div>
            </div>

            {/* Context Section 3: Enrollment Details */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-5">Enrollment Package</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700">Batch Type *</label>
                  <input
                    type="text" name="batch" required value={formData.batch} onChange={handleChange}
                    placeholder="e.g. Hip Hop Morning"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 placeholder-gray-500 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700">Package Fee (₹) *</label>
                  <input
                    type="number" name="fee" required value={formData.fee} onChange={handleChange}
                    placeholder="e.g. 1500"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 placeholder-gray-500 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700">Pending Fees (₹)</label>
                  <input
                    type="number" name="pendingFee" value={formData.pendingFee} onChange={handleChange}
                    placeholder="e.g. 500"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 placeholder-gray-500 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700">Start Date *</label>
                  <input
                    type="date" name="startDate" required value={formData.startDate} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 placeholder-gray-500 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700">Expiry Date *</label>
                  <input
                    type="date" name="expiryDate" required value={formData.expiryDate} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 placeholder-gray-500 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                  />
                </div>
              </div>

              <div className="space-y-1.5 mt-6">
                <label className="block text-sm font-semibold text-gray-700">Additional Notes</label>
                <textarea
                  name="notes" rows="3" value={formData.notes} onChange={handleChange}
                  placeholder="Any medical conditions or special instructions..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 placeholder-gray-500 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-[0_1px_2px_rgba(0,0,0,0.02)] resize-y min-h-[100px]"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="px-6 md:px-8 py-5 bg-gray-50/50 flex items-center justify-end gap-3 rounded-b-[20px]">
            <button
              type="button"
              onClick={() => navigate("/admin/students")}
              className="px-5 py-2.5 text-sm font-semibold text-gray-900 bg-gray-200 rounded-xl hover:bg-gray-300 transition-all shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 border border-transparent rounded-xl shadow-sm hover:shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all active:scale-[0.98]"
            >
              Confirm Registration
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default AddStudent;