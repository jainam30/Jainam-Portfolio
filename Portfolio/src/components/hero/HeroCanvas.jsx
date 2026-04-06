import React, { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Float, 
  MeshDistortMaterial, 
  PerspectiveCamera,
  Stars,
  OrbitControls
} from "@react-three/drei";
import * as THREE from "three";

function PointField({ count = 2000 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.5 + Math.random() * 2;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, [count]);

  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.001;
      ref.current.rotation.x += 0.0005;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#64FFDA" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

function TechRings() {
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ring1.current) ring1.current.rotation.z = time * 0.5;
    if (ring2.current) ring2.current.rotation.x = time * 0.3;
    if (ring3.current) ring3.current.rotation.y = time * 0.4;
  });

  return (
    <group>
      <mesh ref={ring1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.8, 0.01, 16, 100]} />
        <meshStandardMaterial color="#64FFDA" emissive="#64FFDA" emissiveIntensity={1} transparent opacity={0.5} />
      </mesh>
      <mesh ref={ring2} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[2.1, 0.008, 16, 100]} />
        <meshStandardMaterial color="#0EA5E9" emissive="#0EA5E9" emissiveIntensity={0.8} transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring3} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[2.4, 0.006, 16, 100]} />
        <meshStandardMaterial color="#64FFDA" emissive="#64FFDA" emissiveIntensity={0.5} transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

function TechCore() {
  const coreRef = useRef();
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.position.y = Math.sin(time) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <group>
        {/* Central Core */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color="#64FFDA"
            speed={3}
            distort={0.35}
            radius={1}
            metalness={0.8}
            roughness={0.2}
            emissive="#64FFDA"
            emissiveIntensity={0.4}
            transparent
            opacity={0.9}
          />
        </mesh>
        
        {/* Glow Sphere */}
        <mesh scale={1.1}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial 
            color="#0EA5E9" 
            transparent 
            opacity={0.1} 
            wireframe
          />
        </mesh>

        <TechRings />
        <PointField />
      </group>
    </Float>
  );
}

export default function HeroCanvas() {
  return (
    <div className="w-full h-[400px] md:h-[600px] cursor-grab active:cursor-grabbing">
      <Canvas shadows camera={{ position: [0, 0, 7], fov: 45 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={45} />
        
        {/* Professional Studio Lighting */}
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} color="#0EA5E9" intensity={1} />
        <pointLight position={[0, 0, 5]} color="#64FFDA" intensity={0.5} />
        <pointLight position={[5, 5, 5]} color="#FFFFFF" intensity={0.2} />
        
        <Suspense fallback={null}>
          <TechCore />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        </Suspense>

        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
          makeDefault 
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}
