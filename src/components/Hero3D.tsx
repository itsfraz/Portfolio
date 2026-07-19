import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

function Icosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();

  // Subtle rotation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x += delta * 0.1;
    }
  });

  const materialColor = theme === 'dark' ? '#a78bfa' : '#2563eb'; // Primary color variants
  const emissiveColor = theme === 'dark' ? '#22d3ee' : '#2dd4bf';

  return (
    <Float 
      speed={2} 
      rotationIntensity={1.5} 
      floatIntensity={2} 
      floatingRange={[-0.2, 0.2]}
    >
      <mesh ref={meshRef} castShadow receiveShadow>
        <icosahedronGeometry args={[2, 1]} />
        <meshPhysicalMaterial 
          color={materialColor}
          emissive={emissiveColor}
          emissiveIntensity={0.2}
          roughness={0.1}
          metalness={0.8}
          transmission={0.9}
          thickness={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          wireframe={false}
        />
        {/* Inner wireframe for cool geometric look */}
        <mesh>
          <icosahedronGeometry args={[1.99, 1]} />
          <meshBasicMaterial color={theme === 'dark' ? '#ffffff' : '#000000'} wireframe transparent opacity={0.1} />
        </mesh>
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#22d3ee" />
        
        <PresentationControls 
          global 
          config={{ mass: 2, tension: 500 }} 
          snap={{ mass: 4, tension: 1500 }} 
          rotation={[0, 0.3, 0]} 
          polar={[-Math.PI / 3, Math.PI / 3]} 
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <Icosahedron />
        </PresentationControls>
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
