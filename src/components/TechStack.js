import * as THREE from 'three';
import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Physics, RigidBody, BallCollider, CylinderCollider } from '@react-three/rapier';

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const SPHERE_SCALES = [0.7, 1, 0.8, 1, 1];
function r(limit) {
  return (Math.random() - 0.5) * 2 * limit;
}
const spheres = [...Array(30)].map(() => ({
  scale: SPHERE_SCALES[Math.floor(Math.random() * SPHERE_SCALES.length)],
  position: [r(5), r(5), r(5)],
}));

const TECH_COLORS = [
  '#61DAFB', // React
  '#000000', // Next
  '#339933', // Node
  '#888888', // Express
  '#47A248', // Mongo
  '#4479A1', // MySQL
  '#3178C6', // TypeScript
  '#F7DF1E', // JavaScript
];

function SphereGeo({ scale, material, position }) {
  const api = useRef(null);
  const vec = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    if (!api.current) return;
    delta = Math.min(0.1, delta);
    const t = api.current.translation();
    vec.set(t.x, t.y, t.z);

    if (vec.length() > 8) {
      api.current.setTranslation({ x: position[0], y: position[1], z: position[2] }, true);
      api.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      api.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
      return;
    }

    vec.normalize();
    const floatLift = Math.sin(state.clock.elapsedTime * 1.6 + position[0]) * 8 * delta * scale;
    const impulse = new THREE.Vector3(
      -45 * delta * scale * vec.x,
      -45 * delta * scale * vec.y + floatLift,
      -45 * delta * scale * vec.z
    );
    api.current.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      ref={api}
      colliders={false}
      position={position}
      linearDamping={0.5}
      angularDamping={0.5}
    >
      <BallCollider args={[scale]} />
      <mesh geometry={sphereGeometry} scale={scale}>
        <primitive object={material} attach="material" />
      </mesh>
    </RigidBody>
  );
}

function Pointer() {
  const ref = useRef(null);
  const vec = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ pointer, viewport }) => {
    if (!ref.current) return;
    const target = new THREE.Vector3(
      (pointer.x * viewport.width) / 2,
      (pointer.y * viewport.height) / 2,
      0
    );
    vec.lerp(target, 0.2);
    ref.current.setNextKinematicTranslation(vec);
  });

  return (
    <RigidBody ref={ref} type="kinematicPosition" colliders={false} position={[0, 0, 0]}>
      <CylinderCollider args={[0.5, 0.5, 2]} />
    </RigidBody>
  );
}

function Scene({ materials }) {
  return (
    <Physics gravity={[0, 0, 0]}>
      <Pointer />
      {spheres.map((props, i) => (
        <SphereGeo
          key={i}
          scale={props.scale}
          position={props.position}
          material={materials[i % materials.length]}
        />
      ))}
    </Physics>
  );
}

export default function TechStack() {
  const materials = useMemo(() => {
    return TECH_COLORS.map(
      (color) =>
        new THREE.MeshPhysicalMaterial({
          color,
          metalness: 0.5,
          roughness: 0.8,
          clearcoat: 0.15,
          emissive: color,
          emissiveIntensity: 0.15,
        })
    );
  }, []);

  return (
    <section
      id="tech-stack"
      className="relative bg-white dark:bg-darkGray overflow-hidden section-padding"
      data-aos="fade-up"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px] relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-white text-center mb-2">
          My Tech Stack
        </h2>
        <p className="text-sm sm:text-base text-accent dark:text-gray-400 text-center max-w-xl mx-auto mb-8">
          Technologies I use — interact with the 3D sphere
        </p>
      </div>
      <div className="h-[400px] sm:h-[480px] md:h-[520px] w-full relative">
        <Suspense
          fallback={
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-darkGray/50">
              <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <Canvas
            gl={{ antialias: true, alpha: true }}
            onCreated={({ gl }) => {
              gl.toneMapping = THREE.ACESFilmicToneMapping;
              gl.toneMappingExposure = 1.5;
            }}
            className="tech-stack-canvas"
            camera={{ position: [0, 0, 12], fov: 45 }}
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <directionalLight position={[-10, -10, -5]} intensity={0.4} />
            <Scene materials={materials} />
          </Canvas>
        </Suspense>
      </div>
    </section>
  );
}
