import './Master.css'

function Master() {
  return (
    <section className="master section">
      <div className="container text-white drop-shadow-sm">
        <div className="flex flex-col gap-12 items-center justify-center w-full">

          {/* Master 1 - Prasangi */}
          <div className="master-container w-full bg-black/40 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
            <div className="master-image">
              <img src="/master.jpg" alt="Prasangi" className="rounded-xl shadow-lg w-full max-w-sm object-cover" />
            </div>

            <div className="master-content text-left">
              <h2 className="text-3xl font-bold mb-2 gradient-text">Prasangi</h2>
              <p className="text-pink-400 font-medium mb-4">Choreographer , Fitness Trainer and Event Manager</p>
              <p className="text-gray-200 leading-relaxed max-w-2xl">
                Prasangi is a passionate choreographer and certified fitness trainer with years of experience in dance and performance training. As the founder and lead instructor of Prasangi Dance Studio, he focuses on developing strong dance techniques, creativity, and confidence in every student. His training blends choreography, rhythm, and fitness to help students grow both physically and artistically.
              </p>
              <p className="mt-4 text-gray-100 drop-shadow-sm leading-relaxed">
                <a href="/prasangiCertificate.jpg" target="_blank" rel="noopener noreferrer" className="text-pink-500 underline font-bold hover:text-pink-400 transition-colors">View Certificate</a>
              </p>
            </div>
          </div>

          {/* Master 3 - Rajesh K */}
          <div className="master-container w-full bg-black/40 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
            <div className="master-image">
              <img
                src="/master3.jpg"
                alt="Rajesh K"
                className="w-full aspect-square object-cover rounded-xl shadow-lg max-w-sm"
              />
            </div>

            <div className="master-content text-left">
              <h2 className="text-3xl font-bold mb-2 gradient-text">Rajesh K</h2>
              <p className="text-pink-400 font-medium mb-4">Choreographer and Fitness Trainer</p>
              <p className="text-gray-200 leading-relaxed max-w-2xl">
                Rajesh K is an experienced dance instructor who specializes in training students in both folk and modern dance styles. Known for his disciplined teaching approach and attention to detail, he helps students master fundamentals while encouraging creativity and confidence on stage.
              </p>
            </div>
          </div>

          {/* Master 4 - Sidhu Master */}
          <div className="master-container w-full bg-black/40 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
            <div className="master-image">
              <img
                src="/master4.jpg"
                alt="Sidhu Master"
                className="w-full aspect-square object-cover rounded-xl shadow-lg max-w-sm"
              />
            </div>

            <div className="master-content text-left">
              <h2 className="text-3xl font-bold mb-2 gradient-text">Sidhu</h2>
              <p className="text-pink-400 font-medium mb-4">Choreographer and Event Manager</p>
              <p className="text-gray-200 leading-relaxed max-w-2xl">
                Sidhu Master is a skilled choreographer and event manager with extensive experience organizing dance shows and cultural events. His expertise in choreography and event coordination helps students gain real stage exposure and performance opportunities.
              </p>
            </div>
          </div>

          {/* Master 2 - Sanjay */}
          <div className="master-container w-full bg-black/40 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
            <div className="master-image">
              <img
                src="/master2.jpg"
                alt="Sanjay"
                className="w-full aspect-square object-cover rounded-xl shadow-lg max-w-sm"
              />
            </div>

            <div className="master-content text-left">
              <h2 className="text-3xl font-bold mb-2 gradient-text">Sanjay</h2>
              <p className="text-pink-400 font-medium mb-4">Choreographer, Director, Producer and Actor</p>
              <p className="text-gray-200 leading-relaxed max-w-2xl">
                Sanjay is a versatile artist known for his work as a choreographer, director, producer, and actor. With deep experience in the entertainment industry, he brings cinematic creativity and stage performance techniques to dance training. His classes focus on expression, stage presence, and storytelling through movement.
              </p>
            </div>
          </div>



        </div>
      </div>
    </section>
  )
}

export default Master