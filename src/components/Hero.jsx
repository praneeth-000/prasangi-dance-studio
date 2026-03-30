import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Link } from "react-router-dom";
import "./Hero.css";

// ======================
// 3D MODEL COMPONENT
// ======================
function Dancer() {
  const { scene } = useGLTF("/models/dancer.glb");
  const groupRef = useRef();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect screen size
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Center pivot properly
  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    scene.position.sub(center);
  }, [scene]);

  return (
    <group
      ref={groupRef}
      position={[0, isMobile ? 0.2 : -0.2, 0]} // slightly higher on phone
    >
      <primitive
        object={scene}
        scale={isMobile ? 4.3 : 3.1} // 🔥 bigger only on phone
        rotation={[0, Math.PI, 0]}
        castShadow
        receiveShadow
      />
    </group>
  );
}

// ======================
// HERO SECTION
// ======================
function Hero() {
  const isMobile = window.innerWidth < 768;

  const renderAnimatedText = (text) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className={`hover-char ${char === ' ' ? 'space' : ''}`}
        style={{ '--char-index': index }}
      >
        {char}
      </span>
    ));
  };

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1 className="brand-title animated-heading">
          {renderAnimatedText("Prasangi Dance Studio ")}
          <span className="fitness-text">& Fitness Center</span>
        </h1>

        <p className="tagline">Where Passion Meets Performance.</p>
        <p className="location">Jammikunta</p>

        <Link to="/contact" className="primary-btn">
          Contact Master
        </Link>
      </div>

      <div className="hero-image-container">
        <Canvas
          camera={{
            position: isMobile ? [0, 1.5, 7] : [0, 1.8, 6], // adjusted camera for mobile
            fov: 40,
          }}
          shadows
        >
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.8}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
          />

          {/* LIGHTING */}
          <ambientLight intensity={0.6} />

          <directionalLight
            position={[5, 8, 5]}
            intensity={1.5}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />

          <spotLight
            position={[0, 10, 5]}
            intensity={2}
            angle={0.4}
            penumbra={1}
            castShadow
          />

          {/* GROUND */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -1.6, 0]}
            receiveShadow
          >
            <planeGeometry args={[50, 50]} />
            <shadowMaterial opacity={0.35} />
          </mesh>

          <Suspense fallback={null}>
            <Dancer />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
}

useGLTF.preload("/models/dancer.glb");

export default Hero;