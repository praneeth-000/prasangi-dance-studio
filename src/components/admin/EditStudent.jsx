import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guardianName: '',
    guardianPhone: '',
    batch: '',
    fee: '',
    startDate: '',
    expiryDate: '',
    notes: ''
  });

  useEffect(() => {
    const stored = localStorage.getItem('prasangi_students');
    if (stored) {
      const students = JSON.parse(stored);
      const student = students.find(s => s.id === id);
      if (student) {
        setFormData(student);
      } else {
        alert("Student not found!");
        navigate('/admin/students');
      }
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const stored = localStorage.getItem('prasangi_students');
    if (stored) {
      let students = JSON.parse(stored);
      // Map to update the specific student
      students = students.map(s => s.id === id ? { ...formData, fee: Number(formData.fee) } : s);
      localStorage.setItem('prasangi_students', JSON.stringify(students));
    }
    
    navigate('/admin/students');
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-[1000px] mx-auto">
      
      {/* Header section */}
      <div className="mb-8">
        <h2 className="text-[28px] font-bold text-gray-900 tracking-tight leading-tight">
          Edit Student
        </h2>
        <p className="text-gray-500 font-medium mt-1 text-sm">
          Update details for <span className="font-bold text-gray-900">{formData.name}</span>
        </p>
      </div>

      <div className="bg-white rounded-[20px] shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="divide-y divide-gray-100">
          
          <div className="p-6 md:p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-700">Student Name</label>
                <input
                  type="text" value={formData.name} disabled
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-100/50 text-gray-500 outline-none text-sm cursor-not-allowed shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-700">Student Phone</label>
                <input
                  type="text" value={formData.phone} disabled
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-100/50 text-gray-500 outline-none text-sm cursor-not-allowed shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                />
              </div>

              {/* Editable Fields */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-700">Batch Name *</label>
                <input
                  type="text" name="batch" required value={formData.batch} onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-700">Fee Amount (₹) *</label>
                <input
                  type="number" name="fee" required value={formData.fee} onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-700">Start Date *</label>
                <input
                  type="date" name="startDate" required value={formData.startDate} onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-700">Expiry Date *</label>
                <input
                  type="date" name="expiryDate" required value={formData.expiryDate} onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">Notes</label>
              <textarea
                name="notes" rows="3" value={formData.notes || ''} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-[0_1px_2px_rgba(0,0,0,0.02)] resize-y"
              ></textarea>
            </div>
          </div>

          <div className="px-6 md:px-8 py-5 bg-gray-50/50 flex items-center justify-end gap-3 rounded-b-[20px]">
            <button
              type="button" onClick={() => navigate('/admin/students')}
              className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-all shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 border border-transparent rounded-xl shadow-sm hover:shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all active:scale-[0.98]"
            >
              Save Changes
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default EditStudent;
