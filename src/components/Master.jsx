import './Master.css'

function Master() {
  return (
    <section className="master section">
      <div className="container text-white drop-shadow-sm">
        <div className="flex flex-col gap-12 items-center justify-center w-full">

          {/* First Master */}
          <div className="master-container w-full bg-black/40 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
            <div className="master-image">
              <img src="/master.jpg" alt="Dance Master" className="rounded-xl shadow-lg w-full max-w-sm object-cover" />
            </div>

            <div className="master-content text-left">
              <h2 className="text-3xl font-bold mb-4 gradient-text">Meet Our Master</h2>
              <p className="text-gray-200 leading-relaxed max-w-2xl">
                With years of experience in classical and modern dance forms,
                our Certified Master leads Prasangi Dance Studio with passion, discipline,
                and dedication. His mission is to nurture confidence and excellence
                in every student.
              </p>
            </div>
          </div>

          {/* Second Master */}
          <div className="master-container w-full bg-black/40 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
            <div className="master-image">
              <img
                src="https://via.placeholder.com/400x500"
                alt="Dance Master"
                className="w-full h-[400px] object-cover rounded-xl shadow-lg max-w-sm"
              />
            </div>

            <div className="master-content text-left">
              <h2 className="text-3xl font-bold mb-4 gradient-text">Meet Our Master</h2>
              <p className="text-gray-200 leading-relaxed max-w-2xl">
                With years of experience in classical and modern dance forms,
                our Certified Master leads Prasangi Dance Studio with passion, discipline,
                and dedication. His mission is to nurture confidence and excellence
                in every student.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Master