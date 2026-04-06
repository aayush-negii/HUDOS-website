"use client";

import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import {
    TextureLoader,
    Vector2,
    Color,
    MeshStandardMaterial,
    DoubleSide,
    BackSide,
    DirectionalLight,
    Mesh,
    MathUtils,
    ShaderMaterial,
    AdditiveBlending,
    Vector3
} from 'three';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

interface GlobeProps {
    scrollProgress: any; // Using MotionValue for performance
    isNightMode?: boolean;
}

// Ultra-Premium Fresnel Shader for Atmospheric Glow
const AtmosphereShader = {
    uniforms: {
        color: { value: new Color('#00f2ff') },
        coefficient: { value: 0.1 },
        power: { value: 2.0 },
    },
    vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform vec3 color;
    uniform float coefficient;
    uniform float power;
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      // Fresnel effect based on view direction
      vec3 viewDirection = normalize(-vPosition);
      float fresnel = pow(coefficient + (1.0 - dot(vNormal, viewDirection)), power);
      gl_FragColor = vec4(color, fresnel);
    }
  `
};

export default function Globe({ scrollProgress, isNightMode = false }: GlobeProps) {
    const meshRef = useRef<Mesh>(null);
    const atmosphereRef = useRef<Mesh>(null);
    const sunLightRef = useRef<DirectionalLight>(null);

    // 2K/4K High-Performance Textures (Rock-solid Stability)
    const [colorMap, normalMap, specularMap, nightMap] = useLoader(TextureLoader, [
        'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
        'https://unpkg.com/three-globe/example/img/earth-topology.png',
        'https://unpkg.com/three-globe/example/img/earth-water.png',
        'https://unpkg.com/three-globe/example/img/earth-night.jpg'
    ]);

    const atmosphereUniforms = useMemo(() => ({
        color: { value: new Color(isNightMode ? '#4040ff' : '#00f2ff') },
        coefficient: { value: 0.1 },
        power: { value: isNightMode ? 4.0 : 2.0 },
    }), [isNightMode]);

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.getElapsedTime();

        // 1. Precise Scroll-based Rotation (SLOWER & MORE MAJESTIC)
        // Read directly from MotionValue to bypass React re-render cycles
        const currentProgress = typeof scrollProgress === 'number' ? scrollProgress : scrollProgress.get();
        const targetRotation = currentProgress * Math.PI * 1.2;
        const idleDrift = time * 0.02;
        meshRef.current.rotation.y = MathUtils.lerp(meshRef.current.rotation.y, targetRotation + idleDrift, 0.08);

        // 2. Focused Floating Wobble
        const wobble = Math.sin(time * 0.3) * 0.015;
        meshRef.current.position.y = wobble;
        if (atmosphereRef.current) atmosphereRef.current.position.y = wobble;

        // 3. Crisp Zoom Transitions
        const targetScale = 2.5 + currentProgress * 1.2;
        meshRef.current.scale.setScalar(MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.08));
        if (atmosphereRef.current) atmosphereRef.current.scale.setScalar(meshRef.current.scale.x * 1.05);

        // 4. Lighting Intensity
        if (sunLightRef.current) {
            const targetLightIntensity = isNightMode ? 0.3 : 3.8;
            sunLightRef.current.intensity = MathUtils.lerp(sunLightRef.current.intensity, targetLightIntensity, 0.05);
        }

        // 5. Emissive City Lights
        if (meshRef.current.material instanceof MeshStandardMaterial) {
            const baseIntensity = isNightMode ? 4.0 : 0; // Slightly higher for 4k punch
            const pulse = (Math.sin(time * 1.25) * 0.4);
            meshRef.current.material.emissiveIntensity = MathUtils.lerp(
                meshRef.current.material.emissiveIntensity,
                baseIntensity + (isNightMode ? pulse : 0),
                0.1
            );
            meshRef.current.material.emissive = new Color(isNightMode ? "#ffffff" : "#000000");
        }
    });

    const hotspots = [
        { coords: [51.5074, -0.1278], name: 'London', color: '#ff00ff', mission: 'Neural Hub Breach' },
        { coords: [40.7128, -74.0060], name: 'New York', color: '#00f2ff', mission: 'Skyscraper Leap' },
        { coords: [35.6762, 139.6503], name: 'Tokyo', color: '#ffcf00', mission: 'Neon Ghosting' },
        { coords: [25.2048, 55.2708], name: 'Dubai', color: '#ff9d00', mission: 'Sandstorm Protocol' },
        { coords: [-33.8688, 151.2093], name: 'Sydney', color: '#00ffaa', mission: 'Coral Drift' },
    ];

    const getPosition = (lat: number, lon: number, radius: number) => {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);
        return [
            -radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.sin(theta),
        ] as [number, number, number];
    };

    return (
        <>
            <ambientLight intensity={isNightMode ? 0.05 : 0.8} />
            <directionalLight ref={sunLightRef} position={[5, 3, 5]} intensity={3.5} color={isNightMode ? "#8888ff" : "#ffffff"} />
            <pointLight position={[-5, -3, -5]} intensity={isNightMode ? 3.0 : 1.0} color="#00f2ff" />

            {/* 1. Main Planet Body (Optimized Geometry) */}
            <mesh ref={meshRef}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial
                    map={colorMap}
                    normalMap={normalMap}
                    normalScale={new Vector2(1.8, 1.8)} // Adjusted for 8k detail
                    metalnessMap={specularMap}
                    roughnessMap={specularMap}
                    emissiveMap={nightMap}
                    emissive={new Color(isNightMode ? "#ffffff" : "#000000")}
                    emissiveIntensity={0}
                    roughness={0.65}
                    metalness={0.45}
                    envMapIntensity={0.5}
                />

                {/* Hotspots */}
                {hotspots.map((city, i) => (
                    <group key={i} position={getPosition(city.coords[0], city.coords[1], 1.015)}>
                        <mesh>
                            <sphereGeometry args={[0.01, 16, 16]} />
                            <meshBasicMaterial color={city.color} />
                            <Html distanceFactor={10} position={[0, 0.03, 0]}>
                                <div className="group relative">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                                        <div className="glass-card p-6 border-white/20 min-w-[240px] mb-4 shadow-[0_0_50px_rgba(0,242,255,0.4)] backdrop-blur-3xl bg-black/80">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] font-mono">{city.name}_NODE</span>
                                                <div className={`w-2 h-2 rounded-full animate-ping`} style={{ backgroundColor: city.color }}></div>
                                            </div>
                                            <h4 className="text-2xl font-black italic tracking-tighter text-white mb-5 leading-none">{city.mission}</h4>
                                            <div className="flex gap-4 items-center mb-6">
                                                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                    <div className="h-full animate-pulse" style={{ backgroundColor: city.color, width: '70%', boxShadow: `0 0 10px ${city.color}` }}></div>
                                                </div>
                                                <span className="text-[11px] font-black text-white italic tracking-widest font-mono">70% SYNC</span>
                                            </div>
                                            <button className="w-full py-4 bg-white text-black text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-electric-blue hover:text-white transition-all duration-500 transform hover:-translate-y-1">
                                                INITIATE PROTOCOL
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Html>
                        </mesh>
                        <mesh rotation={[Math.PI / 2, 0, 0]}>
                            <ringGeometry args={[0.015, 0.022, 64]} />
                            <meshBasicMaterial color={city.color} transparent opacity={0.6} side={THREE.DoubleSide} />
                        </mesh>
                    </group>
                ))}
            </mesh>

            {/* 2. Premium Fresnel Atmosphere */}
            <mesh ref={atmosphereRef}>
                <sphereGeometry args={[1, 32, 32]} />
                <shaderMaterial
                    args={[AtmosphereShader]}
                    uniforms={atmosphereUniforms}
                    transparent
                    side={BackSide}
                    blending={AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>
        </>
    );
}
