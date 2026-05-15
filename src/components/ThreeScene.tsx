import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera } from '@react-three/drei';
import { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useTheme } from '../lib/ThemeContext';

function Blob({ position, color, speed, distort, radius }: { position: [number, number, number], color: string, speed: number, distort: number, radius: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[radius, 64, 64]} position={position}>
        <MeshDistortMaterial color={color} speed={speed} distort={distort} roughness={0.1} metalness={0.8} />
      </Sphere>
    </Float>
  );
}

function Rig() {
  return useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.mouse.x * 2, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.mouse.y * 2, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
}

export default function ThreeScene() {
  const { theme } = useTheme();
  const bgColor = theme === 'dark' ? '#050505' : '#ffffff';

  return (
    <div className={`fixed inset-0 -z-10 transition-colors duration-700 ${theme === 'dark' ? 'bg-[#050505]' : 'bg-white'}`}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={75} />
        <ambientLight intensity={1} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        
        <Blob position={[-3, 1, -2]} color={theme === 'dark' ? '#444' : '#d4d4d4'} speed={2} distort={0.4} radius={1} />
        <Blob position={[3, -2, -3]} color={theme === 'dark' ? '#222' : '#e5e5e5'} speed={1.5} distort={0.5} radius={1.5} />
        <Blob position={[0, -3, -5]} color={theme === 'dark' ? '#111' : '#f5f5f5'} speed={1} distort={0.3} radius={2} />
        
        {/* Glowing accents */}
        <Blob position={[2, 2, -1]} color="#f97316" speed={3} distort={0.6} radius={0.5} />
        <Blob position={[-4, -2, -1]} color="#3b82f6" speed={2.5} distort={0.6} radius={0.4} />

        <Rig />
        <fog attach="fog" args={[bgColor, 5, 15]} />
      </Canvas>
      <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent ${theme === 'dark' ? 'to-[#050505]' : 'to-white'}`} />
    </div>
  );
}
