"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Html,
  OrbitControls,
  Sparkles,
  Stars,
  useCursor,
} from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import { Suspense, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { PLANETS, RITU_STAR, type PlanetConfig } from "@/data/universe";
import AmbientAudio from "@/components/shell/AmbientAudio";
/* ---------------------------------- Sun ---------------------------------- */

function Sun() {
  const coreRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (coreRef.current) coreRef.current.rotation.y += 0.0012;
    if (haloRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.04;
      haloRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group>
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.3, 64, 64]} />
        <meshStandardMaterial
          color="#e8ddf8"
          emissive="#c4b7ff"
          emissiveIntensity={1.4}
          roughness={0.35}
        />
      </mesh>

      <mesh ref={haloRef}>
        <sphereGeometry args={[1.85, 32, 32]} />
        <meshBasicMaterial
          color="#9485ed"
          transparent
          opacity={0.14}
          side={THREE.BackSide}
        />
      </mesh>

      <Html center distanceFactor={14} position={[0, 2.4, 0]}>
        <div className="pointer-events-none select-none text-center">
          <p className="text-[9px] uppercase tracking-[0.32em] text-[#b8a4ff]">
            {RITU_STAR.designation}
          </p>
          <p className="font-serif text-xl text-[#e8ddf8]">{RITU_STAR.name}</p>
          <p className="text-[9px] tracking-[0.25em] text-[#929fbd]">
            {RITU_STAR.birthday}
          </p>

        </div>
      </Html>
    </group>
  );
}

/* ---------------------------------- Orbit -------------------------------- */

function OrbitRing({
  radius,
  tilt = 0,
  color = "#7469d8",
  opacity = 0.14,
}: {
  radius: number;
  tilt?: number;
  color?: string;
  opacity?: number;
}) {
  const line = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 160;
    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * Math.PI * 2;
      points.push(
        new THREE.Vector3(Math.cos(t) * radius, 0, Math.sin(t) * radius)
      );
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity,
    });
    return new THREE.Line(geometry, material);
  }, [radius, color, opacity]);

  return (
    <group rotation={[0, 0, tilt]}>
      <primitive object={line} />
    </group>
  );
}

/* ---------------------------------- Planet -------------------------------- */

function Planet({
  config,
  onSelect,
  paused,
}: {
  config: PlanetConfig;
  onSelect: (config: PlanetConfig) => void;
  paused: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useCursor(hovered);

  // Stable starting angle per planet — derived from the id so the scene is
  // deterministic across renders (and React stays happy about purity).
  const baseAngle = useMemo(() => {
    let h = 0;
    for (let i = 0; i < config.id.length; i++) {
      h = (h * 31 + config.id.charCodeAt(i)) % 360;
    }
    return (h / 360) * Math.PI * 2;
  }, [config.id]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime * config.orbitSpeed + baseAngle;
    groupRef.current.position.x = Math.cos(t) * config.orbitRadius;
    groupRef.current.position.z = Math.sin(t) * config.orbitRadius;
    groupRef.current.position.y =
      Math.sin(t * 0.6) * config.orbitRadius * config.orbitInclination;

    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
      const target = hovered ? 1.25 : 1;
      const s = meshRef.current.scale;
      s.lerp(new THREE.Vector3(target, target, target), 0.12);
    }
  });

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (!paused) onSelect(config);
  };

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[config.size, 48, 48]} />
        <meshStandardMaterial
          color={config.color}
          emissive={config.emissive}
          emissiveIntensity={hovered ? 1.0 : 0.55}
          roughness={0.55}
          metalness={0.1}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[config.size * 1.42, 24, 24]} />
        <meshBasicMaterial
          color={config.emissive}
          transparent
          opacity={hovered ? 0.18 : 0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Story chapters get a decorative ring — they are not science planets. */}
      {config.kind === "story" && (
        <mesh rotation={[Math.PI / 2.35, 0, hovered ? 0.2 : 0.08]}>
          <ringGeometry
            args={[config.size * 1.55, config.size * 2.15, 72]}
          />
          <meshBasicMaterial
            color={config.emissive}
            transparent
            opacity={hovered ? 0.42 : 0.26}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      <Html
        center
        distanceFactor={18}
        position={[0, config.size + 0.55, 0]}
      >
        <div
          onClick={() => onSelect(config)}
          className="pointer-events-auto cursor-pointer select-none whitespace-nowrap text-center"
        >
          <p className="text-[9px] uppercase tracking-[0.28em] text-[#7685a7]">
            {config.chapter}
          </p>
          <p className="text-xs font-medium text-[#e8ddf8]">{config.name}</p>
          {hovered && (
            <p className="mt-0.5 text-[9px] text-[#b8a4ff]">
              {config.subtitle}
            </p>
          )}
        </div>
      </Html>
    </group>
  );
}

/* --------------------------------- Scene --------------------------------- */

function Scene({
  onSelect,
  paused,
  reducedMotion,
}: {
  onSelect: (c: PlanetConfig) => void;
  paused: boolean;
  reducedMotion: boolean;
}) {
  return (
    <>
      <color attach="background" args={["#05080f"]} />
      <ambientLight intensity={0.18} />
      <pointLight
        position={[0, 0, 0]}
        intensity={3}
        color="#e8ddf8"
        distance={60}
      />

      <Suspense fallback={null}>
        <Stars
          radius={60}
          depth={50}
          count={3500}
          factor={4}
          saturation={0}
          fade
          speed={reducedMotion ? 0 : 0.6}
        />
        <Sparkles
          count={60}
          scale={40}
          size={2}
          speed={reducedMotion ? 0 : 0.2}
          color="#b8a4ff"
        />
      </Suspense>

      <Sun />

      {PLANETS.map((config) => (
        <group key={config.id}>
          <OrbitRing
            radius={config.orbitRadius}
            tilt={config.tilted ? config.orbitInclination * 1.4 : 0}
            color={config.kind === "story" ? "#a8b87a" : "#7469d8"}
            opacity={config.kind === "story" ? 0.2 : 0.14}
          />
          <Planet config={config} onSelect={onSelect} paused={paused} />
        </group>
      ))}

      <OrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.05}
        minDistance={8}
        maxDistance={42}
        autoRotate={!reducedMotion && !paused}
        autoRotateSpeed={0.15}
      />

      <EffectComposer>
        <Bloom
          intensity={0.7}
          luminanceThreshold={0.3}
          mipmapBlur
          radius={0.7}
        />
      </EffectComposer>
    </>
  );
}

/* ------------------------------ HUD + panel ------------------------------ */

function HUD() {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-5 md:p-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#7685a7]">
            Private research initiative
          </p>
          <h1 className="mt-2 font-serif text-2xl leading-tight text-[#e8ddf8] md:text-4xl">
            The Observable Universe
          </h1>
          <p className="mt-1 text-xs text-[#929fbd]">
            RITU-001 · An ongoing investigation into one extraordinary human
            being
          </p>
        </div>
        <div className="text-right text-[10px] uppercase tracking-[0.3em] text-[#929fbd]">
          <p className="flex items-center justify-end gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            System online
          </p>
          <p className="mt-1 text-[#7685a7]">{RITU_STAR.birthday}</p>
        </div>
      </div>

      <div className="flex items-end justify-between gap-4">
        <p className="max-w-xs text-[11px] leading-6 text-[#929fbd]">
          Drag to explore. Click a planet to begin an experiment.
          <span className="mt-1 block text-[#7685a7]">
            Some things cannot be measured. Some things can only be felt.
          </span>
        </p>
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#7685a7]">
          Made for Ritu
        </p>
      </div>
    </div>
  );
}

function PlanetPanel({
  config,
  onClose,
  onEnter,
}: {
  config: PlanetConfig;
  onClose: () => void;
  onEnter: () => void;
}) {
  return (
    <div className="pointer-events-none absolute inset-x-4 bottom-4 z-10 flex justify-end md:inset-x-auto md:right-8 md:top-1/2 md:bottom-auto md:-translate-y-1/2 md:w-96">
      <div className="panel pointer-events-auto w-full p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="lab-label">Chapter {config.chapter}</p>
            <h3 className="mt-1 font-serif text-2xl text-[#e8ddf8]">
              {config.name}
            </h3>
            <p className="mt-1 text-xs text-[#b8a4ff]">{config.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="text-[#7685a7] transition hover:text-[#e8ddf8]"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <p className="mt-4 text-sm leading-7 text-[#929fbd]">
          {config.description}
        </p>

        {config.whisper && (
          <p className="mt-4 border-l-2 border-[#4a3b2a] pl-3 font-hand text-lg leading-7 text-[#e8ddf8]">
            {config.whisper}
          </p>
        )}

        {config.achievement && (
          <div className="mt-4 rounded-lg border border-[#3b3470] bg-[#1d1a36] p-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#b8a4ff]">
              Achievement
            </p>
            <p className="mt-1 text-xs text-[#e8ddf8]">{config.achievement}</p>
          </div>
        )}

        <button
          onClick={onEnter}
          className="mt-5 w-full rounded-xl bg-[#7469d8] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#8579e8]"
        >
          Enter Chapter →
        </button>
      </div>
    </div>
  );
}

/* ------------------------------ Entry point ------------------------------ */

export default function UniverseScene() {
  const router = useRouter();
  const [selected, setSelected] = useState<PlanetConfig | null>(null);

  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-[#05080f]">
      <Canvas
        camera={{ position: [0, 14, 32], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <Scene
          onSelect={setSelected}
          paused={selected !== null}
          reducedMotion={reducedMotion}
        />
      </Canvas>

      <HUD />
        <AmbientAudio/>
      {selected && (
        <PlanetPanel
          config={selected}
          onClose={() => setSelected(null)}
          onEnter={() => router.push(selected.href)}
        />
      )}
    </div>
  );
}