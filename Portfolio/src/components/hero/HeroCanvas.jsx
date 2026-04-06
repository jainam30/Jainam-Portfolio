import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Float, 
  MeshDistortMaterial, 
  OrbitControls, 
  PerspectiveCamera,
  Stars,
  Environment
} from "@react-three/drei";

function FloatingShape() {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(time / 4);
      meshRef.current.rotation.y = Math.cos(time / 2);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.3, 256, 64]} />
        <MeshDistortMaterial
          color="#64FFDA"
          speed={4}
          distort={0.4}
          radius={1}
          metalness={0.9}
          roughness={0.1}
          emissive="#64FFDA"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

export default function HeroCanvas() {
  return (
    <div className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] cursor-grab active:cursor-grabbing">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 75 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#64FFDA" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#0EA5E9" />
        <spotLight position={[0, 5, 10]} angle={0.3} penumbra={1} intensity={1.5} color="#FFF" />
        
        <Suspense fallback={null}>
          <FloatingShape />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Suspense>

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} makeDefault />
      </Canvas>
    </div>
  );
}
