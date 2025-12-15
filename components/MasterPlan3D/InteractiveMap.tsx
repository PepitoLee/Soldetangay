import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Html,
  useCursor,
  Float,
  Sky
} from '@react-three/drei';
import * as THREE from 'three';
import { ALL_LOTS, AMENITIES, STATUS_COLORS } from './constants';
import { LotData, AmenityData } from './types';

// Fix for missing JSX types for Three.js elements in this environment
declare global {
  namespace JSX {
    // Use a catch-all index signature to prevent errors for missing element definitions
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

interface SceneProps {
  onSelectLot: (lot: LotData) => void;
  onSelectAmenity: (amenity: AmenityData) => void;
  selectedId: string | null;
}

// --- 3D Assets & Components ---

const Person = ({ position, routeOffset = 0 }: { position: [number, number, number], routeOffset?: number }) => {
  const group = useRef<THREE.Group>(null);
  const speed = 0.02 + Math.random() * 0.02;

  useFrame((state) => {
    if (group.current) {
      // Simple walking animation logic
      const time = state.clock.getElapsedTime();
      // Move back and forth along Z (or X depending on path)
      // Here we walk along Z
      group.current.position.z = position[2] + Math.sin(time * speed + routeOffset) * 20;

      // Rotate based on direction
      const dir = Math.cos(time * speed + routeOffset);
      group.current.rotation.y = dir > 0 ? 0 : Math.PI;

      // Bobbing motion (walking bounce)
      group.current.position.y = position[1] + Math.abs(Math.sin(time * 10)) * 0.1;
    }
  });

  return (
    <group ref={group} position={position}>
      {/* Body */}
      <mesh position={[0, 0.75, 0]} castShadow>
         <capsuleGeometry args={[0.2, 0.9, 4, 8]} />
         <meshStandardMaterial color={["#ef4444", "#3b82f6", "#eab308", "#ffffff"][Math.floor(Math.random()*4)]} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.4, 0]} castShadow>
         <sphereGeometry args={[0.15, 8, 8]} />
         <meshStandardMaterial color="#fca5a5" />
      </mesh>
    </group>
  );
};

const Tree = ({ position, scale = 1, type = 'round' }: { position: [number, number, number], scale?: number, type?: 'round' | 'pine' }) => {
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.3, 1, 8]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      {/* Foliage */}
      <mesh position={[0, 2, 0]} castShadow receiveShadow>
        {type === 'round' ? (
             <dodecahedronGeometry args={[1.5, 0]} />
        ) : (
             <coneGeometry args={[1.5, 3, 8]} />
        )}
        <meshStandardMaterial color={type === 'round' ? "#4ade80" : "#15803d"} roughness={0.8} />
      </mesh>
    </group>
  );
};

const Building = ({ width, depth, height, color = "#ffffff", type = 'modern', ...props }: { width: number, depth: number, height: number, color?: string, type?: 'modern' | 'classic', [key: string]: any }) => {
  return (
    <group {...props}>
      <group position={[0, height / 2, 0]}>
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <boxGeometry args={[width, height, depth]} />
          <meshStandardMaterial color={color} roughness={0.2} />
        </mesh>

        {/* Roof */}
        {type === 'classic' ? (
            <mesh position={[0, height/2 + 0.7, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
              <coneGeometry args={[Math.max(width, depth) * 0.8, 1.5, 4]} />
              <meshStandardMaterial color="#9a3412" />
            </mesh>
        ) : (
            <mesh position={[0, height/2 + 0.1, 0]} receiveShadow>
              <boxGeometry args={[width + 0.5, 0.2, depth + 0.5]} />
              <meshStandardMaterial color="#334155" />
            </mesh>
        )}

        {/* Windows/Door Accents */}
        <mesh position={[0, -height/4, depth/2 + 0.01]}>
           <planeGeometry args={[width * 0.3, height * 0.5]} />
           <meshStandardMaterial color="#1e293b" />
        </mesh>
      </group>
    </group>
  );
};

const GrandPortico = ({ position }: { position: [number, number, number] }) => {
    return (
        <group position={position}>
            {/* Left Tower */}
            <mesh position={[-6, 4, 0]} castShadow receiveShadow>
                <boxGeometry args={[3, 8, 3]} />
                <meshStandardMaterial color="#e2e8f0" />
            </mesh>
            {/* Right Tower */}
            <mesh position={[6, 4, 0]} castShadow receiveShadow>
                <boxGeometry args={[3, 8, 3]} />
                <meshStandardMaterial color="#e2e8f0" />
            </mesh>
            {/* Top Arch/Roof */}
            <mesh position={[0, 7, 0]} castShadow>
                <boxGeometry args={[18, 2, 4]} />
                <meshStandardMaterial color="#9a3412" />
            </mesh>
             {/* Sign */}
            <mesh position={[0, 7, 2.1]}>
                <planeGeometry args={[10, 1]} />
                <meshStandardMaterial color="#1e293b" />
            </mesh>
            <Html position={[0, 7, 2.2]} transform>
                 <div className="text-white font-display font-bold text-sm tracking-widest">VISTA VERDE</div>
            </Html>

            {/* Guard Booth */}
            <mesh position={[0, 2, 0]} castShadow>
                <boxGeometry args={[2, 4, 2]} />
                <meshStandardMaterial color="#64748b" transparent opacity={0.8} />
            </mesh>
        </group>
    )
}

const LotMesh = ({ data, isSelected, onSelect }: { data: LotData, isSelected: boolean, onSelect: (lot: LotData) => void }) => {
  const [hovered, setHover] = useState(false);
  useCursor(hovered);

  const color = hovered
    ? (data.status === 'available' ? '#6ee7b7' : data.status === 'sold' ? '#cbd5e1' : '#fcd34d')
    : STATUS_COLORS[data.status].hex;

  const scale = isSelected ? 1.05 : hovered ? 1.02 : 1;
  const yOffset = isSelected ? 0.5 : hovered ? 0.2 : 0;

  return (
    <group
      position={[data.position[0], data.position[1] + yOffset, data.position[2]]}
      rotation={[data.rotation[0], data.rotation[1], data.rotation[2]]}
      onClick={(e) => { e.stopPropagation(); onSelect(data); }}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      scale={[scale, scale, scale]}
    >
      {/* The Plot Ground */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={data.dimensions} />
        <meshStandardMaterial color={color} transparent opacity={data.status === 'sold' ? 0.5 : 1} />
      </mesh>

      {/* Grass details if available */}
      {data.status === 'available' && (
          <mesh position={[0, data.dimensions[1]/2 + 0.01, 0]} rotation={[-Math.PI/2, 0, 0]}>
              <planeGeometry args={[data.dimensions[0]*0.8, data.dimensions[2]*0.8]} />
              <meshStandardMaterial color="#86efac" />
          </mesh>
      )}

      {/* House Model */}
      {data.status !== 'available' && (
          <Building
            width={data.dimensions[0] * 0.7}
            depth={data.dimensions[2] * 0.5}
            height={data.type === 'premium' ? 4.5 : 3}
            color={data.status === 'sold' ? '#f8fafc' : '#ffffff'}
            type={data.type === 'villa' ? 'modern' : 'classic'}
          />
      )}

      {/* For Sale Sign */}
      {data.status === 'available' && (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
           <group position={[0, 3, 0]}>
             <mesh>
                <boxGeometry args={[3, 1, 0.1]} />
                <meshStandardMaterial color="#059669" />
             </mesh>
             <Html transform distanceFactor={20} pointerEvents="none">
                <div className="text-white font-bold text-sm font-display tracking-wider whitespace-nowrap px-2">$ { (data.price / 1000).toFixed(0) }k</div>
             </Html>
             <mesh position={[0, -1, 0]}>
                 <cylinderGeometry args={[0.05, 0.05, 2]} />
                 <meshStandardMaterial color="#333" />
             </mesh>
           </group>
        </Float>
      )}

      {/* Pool (blue plane) for Premium/Villa */}
      {(data.type === 'premium' || data.type === 'villa') && data.status !== 'available' && (
        <mesh position={[0, 0.3, data.dimensions[2]/3]} rotation={[-Math.PI/2, 0, 0]}>
            <planeGeometry args={[4, 3]} />
            <meshStandardMaterial color="#0ea5e9" roughness={0.1} metalness={0.6} />
        </mesh>
      )}
    </group>
  );
};

const AmenityMesh = ({ data, onSelect }: { data: AmenityData, onSelect: (a: AmenityData) => void }) => {
  const [hovered, setHover] = useState(false);
  useCursor(hovered);

  return (
    <group
      position={[data.position[0], data.position[1], data.position[2]]}
      onClick={(e) => { e.stopPropagation(); onSelect(data); }}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {/* Ground Area */}
      <mesh receiveShadow>
        <boxGeometry args={data.dimensions} />
        <meshStandardMaterial color={data.type === 'park' ? '#86efac' : '#e0f2fe'} />
      </mesh>

      {/* Visuals based on type */}
      {data.type === 'park' && (
        <group>
            {/* Random Trees */}
           <Tree position={[-10, 0, -10]} scale={1.5} />
           <Tree position={[10, 0, 10]} scale={1.2} />
           <Tree position={[-5, 0, 5]} scale={1.8} type="pine" />
           <Tree position={[8, 0, -8]} scale={1.4} />

           {/* Fountain/Pond */}
           <mesh position={[0, 0.1, 0]} rotation={[-Math.PI/2, 0, 0]}>
               <circleGeometry args={[5, 32]} />
               <meshStandardMaterial color="#38bdf8" roughness={0.1} />
           </mesh>

           {data.id === 'pet-zone' && (
               // Agility obstacles
               <>
                <mesh position={[-5, 0.5, 0]} rotation={[0, 0, Math.PI/2]}>
                    <torusGeometry args={[1, 0.2, 16, 32]} />
                    <meshStandardMaterial color="#fca5a5" />
                </mesh>
                <mesh position={[5, 0.5, 0]}>
                    <boxGeometry args={[4, 0.5, 1]} />
                    <meshStandardMaterial color="#fbbf24" />
                </mesh>
               </>
           )}
        </group>
      )}

      {data.type === 'sports' && (
         <group position={[0, 0.2, 0]}>
            {/* Pools */}
            <mesh position={[-5, 0, 0]} rotation={[-Math.PI/2, 0, 0]}>
                <planeGeometry args={[10, 20]} />
                <meshStandardMaterial color="#0ea5e9" />
            </mesh>
            <mesh position={[8, 0, 0]} rotation={[-Math.PI/2, 0, 0]}>
                <planeGeometry args={[8, 8]} />
                <meshStandardMaterial color="#0ea5e9" />
            </mesh>
            {/* Club House */}
            <Building width={10} height={4} depth={6} position={[8, 0, 8]} color="#fff" type="classic" />
         </group>
      )}

      {data.type === 'commercial' && (
          <group>
             <Building width={6} depth={6} height={5} position={[-4, 0, 0]} color="#f1f5f9" />
             <Building width={6} depth={6} height={5} position={[4, 0, 0]} color="#f1f5f9" />
             <Html position={[0, 6, 0]} transform><div className="font-bold text-slate-700 bg-white px-2 rounded">PLAZA</div></Html>
          </group>
      )}

      {hovered && (
        <Html position={[0, 8, 0]} distanceFactor={15} zIndexRange={[100, 0]}>
          <div className="bg-emerald-900/90 text-white px-3 py-2 rounded-lg text-sm font-display whitespace-nowrap pointer-events-none shadow-xl border border-emerald-700">
            {data.name}
          </div>
        </Html>
      )}
    </group>
  );
};

const RoadsAndGround = () => {
  return (
    <group position={[0, 0.05, 0]} receiveShadow>
       {/* Base Green Ground for the whole world */}
       <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
            <planeGeometry args={[400, 250]} />
            <meshStandardMaterial color="#dcfce7" /> {/* Light vibrant green */}
       </mesh>

       {/* MAIN LOOP ROADS */}
       {/* Top Horizontal */}
       <mesh position={[0, 0, -50]} rotation={[-Math.PI/2, 0, 0]} receiveShadow>
         <planeGeometry args={[320, 12]} />
         <meshStandardMaterial color="#334155" />
       </mesh>
       {/* Bottom Horizontal */}
       <mesh position={[0, 0, 50]} rotation={[-Math.PI/2, 0, 0]} receiveShadow>
         <planeGeometry args={[320, 12]} />
         <meshStandardMaterial color="#334155" />
       </mesh>
       {/* Left Vertical */}
       <mesh position={[-155, 0, 0]} rotation={[-Math.PI/2, 0, 0]} receiveShadow>
         <planeGeometry args={[12, 112]} />
         <meshStandardMaterial color="#334155" />
       </mesh>
       {/* Right Vertical */}
       <mesh position={[-155, 0, 0]} rotation={[-Math.PI/2, 0, 0]} receiveShadow>
         <planeGeometry args={[12, 112]} />
         <meshStandardMaterial color="#334155" />
       </mesh>

       {/* Closing the loop on the right */}
       <mesh position={[155, 0, 0]} rotation={[-Math.PI/2, 0, 0]} receiveShadow>
         <planeGeometry args={[12, 112]} />
         <meshStandardMaterial color="#334155" />
       </mesh>

       {/* INNER SECTION DIVIDERS (Vertical Roads separating the 6 sections) */}
       {/* -80, -40, 0, 40, 80 */}
       {[-80, -40, 0, 40, 80].map((x) => (
         <mesh key={x} position={[x, 0, 0]} rotation={[-Math.PI/2, 0, 0]} receiveShadow>
            <planeGeometry args={[8, 100]} />
            <meshStandardMaterial color="#475569" />
         </mesh>
       ))}

       {/* Striping */}
       <mesh position={[0, 0.02, -50]} rotation={[-Math.PI/2, 0, 0]}>
          <planeGeometry args={[300, 0.3]} />
          <meshBasicMaterial color="#ffffff" opacity={0.6} transparent />
       </mesh>
       <mesh position={[0, 0.02, 50]} rotation={[-Math.PI/2, 0, 0]}>
          <planeGeometry args={[300, 0.3]} />
          <meshBasicMaterial color="#ffffff" opacity={0.6} transparent />
       </mesh>
    </group>
  );
}

// --- Main Scene Component ---

export const InteractiveMap: React.FC<SceneProps> = ({ onSelectLot, onSelectAmenity, selectedId }) => {
  return (
    <div className="w-full h-full bg-sky-100 relative">
      <Canvas shadows camera={{ position: [0, 80, 120], fov: 35 }}>
        <Sky sunPosition={[100, 20, 100]} inclination={0.6} azimuth={0.25} turbidity={0.5} rayleigh={0.5} />

        {/* Lighting - Sunny Day */}
        <ambientLight intensity={0.6} />
        <directionalLight
            position={[100, 100, 50]}
            intensity={1.5}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0001}
        >
            <orthographicCamera attach="shadow-camera" args={[-200, 200, 200, -200]} />
        </directionalLight>

        <Environment preset="park" />

        <OrbitControls
            enablePan={true}
            enableZoom={true}
            maxPolarAngle={Math.PI / 2.1}
            minPolarAngle={Math.PI / 6}
            maxDistance={200}
            minDistance={20}
            dampingFactor={0.05}
        />

        <group>
            <RoadsAndGround />

            {/* Lots */}
            {ALL_LOTS.map((lot) => (
                <LotMesh
                    key={lot.id}
                    data={lot}
                    isSelected={selectedId === lot.id}
                    onSelect={onSelectLot}
                />
            ))}

            {/* Amenities */}
            {AMENITIES.map((amenity) => (
                <AmenityMesh
                    key={amenity.id}
                    data={amenity}
                    onSelect={onSelectAmenity}
                />
            ))}

            {/* Grand Entrance */}
            <GrandPortico position={[-160, 0, 0]} />

            {/* Animated People - Walking along road paths */}
            <Person position={[-80, 0, -20]} routeOffset={0} />
            <Person position={[-40, 0, 10]} routeOffset={2} />
            <Person position={[0, 0, -10]} routeOffset={4} />
            <Person position={[40, 0, 20]} routeOffset={1} />
            <Person position={[80, 0, -5]} routeOffset={3} />

            {/* Extra Trees for Atmosphere along perimeter */}
            {Array.from({length: 20}).map((_, i) => (
                 <Tree key={i} position={[-170 + (i * 18), 0, -80]} scale={2 + Math.random()} type="pine" />
            ))}
            {Array.from({length: 20}).map((_, i) => (
                 <Tree key={i+20} position={[-170 + (i * 18), 0, 80]} scale={2 + Math.random()} type="pine" />
            ))}

            <ContactShadows resolution={1024} scale={400} blur={2} opacity={0.4} far={10} color="#14532d" />
        </group>
      </Canvas>

      {/* UI Overlays */}
      <div className="absolute bottom-6 left-6 pointer-events-none select-none bg-white/90 backdrop-blur p-4 rounded-xl shadow-xl border border-white/40">
         <h4 className="font-display font-bold text-slate-800 mb-3 text-sm">Estado de Lotes</h4>
         <div className="flex flex-col gap-2 text-xs font-sans">
          {Object.entries(STATUS_COLORS).map(([key, config]) => (
            <div key={key} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full border border-slate-300 shadow-sm" style={{ backgroundColor: config.hex }}></span>
              <span className="capitalize text-slate-600">{config.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
