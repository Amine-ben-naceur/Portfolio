"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";
import { ORBIT_START, ORBIT_END } from "@/lib/journey";
import { scrollState } from "@/lib/scroll";
import { PROJECTS } from "@/lib/data";

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

const TARGET_SIZE = 16; 
const SCALE_DAMP = 5;
const HOVER_Y = 18;     // FIX: Lifted them up slightly to clear the planet surface

const REVERSE_ALPHAS = true; 

useGLTF.preload("/models/dolphin.glb");
useGLTF.preload("/models/elephant.glb");

/* ------------------------------------------------------------------ */
/* Scroll → per-project alpha (0 = invisible, 1 = full size)          */
/* ------------------------------------------------------------------ */

function useManifestationAlphas() {
  const alphas = useRef<number[]>(PROJECTS.map(() => 0));

  useFrame(() => {
    const p = scrollState.progress;

    if (p < ORBIT_START - 0.03 || p > ORBIT_END + 0.03) {
      for (let i = 0; i < alphas.current.length; i++) alphas.current[i] = 0;
      return;
    }

    const t = THREE.MathUtils.clamp(
      (p - ORBIT_START) / (ORBIT_END - ORBIT_START),
      0,
      1
    );

    const segSize = 1 / PROJECTS.length;

    for (let i = 0; i < PROJECTS.length; i++) {
      const center = i * segSize + segSize / 2;
      const dist = Math.abs(t - center) / (segSize / 2);
      const targetIndex = REVERSE_ALPHAS ? PROJECTS.length - 1 - i : i;
      alphas.current[targetIndex] = THREE.MathUtils.smoothstep(1 - dist, 0.15, 0.5);
    }
  });

  return alphas;
}

/* ------------------------------------------------------------------ */
/* Unified GLB Manifestation (Dolphin & Elephant)                      */
/* ------------------------------------------------------------------ */

function GLBManifest({
  url,
  alphaRef,
  speed = 0.2,
  baseRotation = [0, 0, 0],
  tintColor = null,
}: {
  url: string;
  alphaRef: React.RefObject<number>;
  speed?: number;
  baseRotation?: [number, number, number];
  tintColor?: string | null;
}) {
  const { scene, animations } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);
  const mixer = useRef<THREE.AnimationMixer | null>(null);

  const { baseScale, offset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    return {
      baseScale: maxDim > 0 ? TARGET_SIZE / maxDim : 1,
      offset: center,
    };
  }, [scene]);

  const cloned = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  useEffect(() => {
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (tintColor) {
          const mats = Array.isArray(child.material) ? child.material : [child.material];
          mats.forEach((mat) => {
            if (!mat) return;
            
            const isDark = mat.color && (mat.color.r + mat.color.g + mat.color.b) < 0.3;
            
            if (!isDark && !mat.map) {
              mat.color = new THREE.Color(tintColor);
              mat.emissive = new THREE.Color(tintColor);
              mat.emissiveIntensity = 0.1; 
              mat.needsUpdate = true;
            }
          });
        }
      }
    });

    if (animations && animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(cloned);
      const action = mixer.current.clipAction(animations[0]);
      action.play();
    }

    return () => {
      if (mixer.current) mixer.current.stopAllAction();
    };
  }, [cloned, animations, tintColor]);

  useFrame((state, delta) => {
    const g = groupRef.current;
    const m = modelRef.current;
    if (!g || !m) return;

    if (mixer.current) mixer.current.update(delta);

    const alpha = alphaRef.current ?? 0;
    g.visible = alpha > 0.01;

    const target = alpha * baseScale;
    const current = m.scale.x;
    const next = THREE.MathUtils.damp(current, target, SCALE_DAMP, delta);
    m.scale.setScalar(next);

    const t = state.clock.elapsedTime;
    
    m.rotation.x = baseRotation[0];
    m.rotation.y = baseRotation[1] + Math.sin(t * speed) * 0.35;
    m.rotation.z = baseRotation[2];
    
    m.position.y = Math.sin(t * speed * 2) * 0.8;
  });

  return (
    <group ref={groupRef} position={[0, HOVER_Y, 0]}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 20, 10]} intensity={1.5} />
      <directionalLight position={[-10, -5, -10]} intensity={0.5} color="#ffffff" />

      <group ref={modelRef} scale={0}>
        <group position={[-offset.x, -offset.y, -offset.z]}>
          <primitive object={cloned} />
        </group>
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* 2D Image Manifestation (L'Aveyronnaise Logo)                        */
/* ------------------------------------------------------------------ */

function ImageManifest({
  url,
  alphaRef,
}: {
  url: string;
  alphaRef: React.RefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const planeRef = useRef<THREE.Mesh>(null);
  
  const texture = useTexture(url);

  const planeArgs = useMemo(() => {
    if (!texture || !texture.image) return [TARGET_SIZE, TARGET_SIZE] as [number, number];
    const aspect = texture.image.width / texture.image.height;
    if (aspect > 1) {
      return [TARGET_SIZE, TARGET_SIZE / aspect] as [number, number];
    } else {
      return [TARGET_SIZE * aspect, TARGET_SIZE] as [number, number];
    }
  }, [texture]);

  useFrame((state, delta) => {
    const g = groupRef.current;
    const p = planeRef.current;
    if (!g || !p) return;

    const alpha = alphaRef.current ?? 0;
    g.visible = alpha > 0.01;

    const target = alpha;
    const current = p.scale.x;
    const next = THREE.MathUtils.damp(current, target, SCALE_DAMP, delta);
    p.scale.setScalar(next);

    const t = state.clock.elapsedTime;
    p.position.y = Math.sin(t * 0.4) * 0.8;
    p.rotation.z = Math.sin(t * 0.2) * 0.05;
  });

  return (
    <group ref={groupRef} position={[0, HOVER_Y, 0]}>
      <mesh ref={planeRef} scale={0.0001}>
        <planeGeometry args={planeArgs} />
        <meshBasicMaterial 
          map={texture} 
          transparent={true} 
          side={THREE.DoubleSide} 
          toneMapped={false} 
        />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Root — wires scroll state to each manifestation                     */
/* ------------------------------------------------------------------ */

export default function ProjectManifestation() {
  const alphas = useManifestationAlphas();

  const alphaRefs = useRef(
    PROJECTS.map(() => ({ current: 0 }))
  );

  useFrame(() => {
    for (let i = 0; i < PROJECTS.length; i++) {
      alphaRefs.current[i].current = alphas.current[i] || 0;
    }
  });

  return (
    <group>
      {PROJECTS.map((project, i) => {
        const alphaRef = alphaRefs.current[i];
        let element: React.ReactElement | null = null;

        if (project.id === "dolphyo") {
          element = (
            <GLBManifest
              url="/models/dolphin.glb"
              alphaRef={alphaRef}
              speed={0.3}
              baseRotation={[-0.6, Math.PI, 0]} 
              tintColor="#0c4a6e"
            />
          );
        } else if (project.id === "pedo") {
          element = (
            <GLBManifest
              url="/models/elephant.glb"
              alphaRef={alphaRef}
              speed={0.12}
              baseRotation={[0, Math.PI, 0]} 
            />
          );
        } else if (project.id === "laveyronnaise") {
          element = (
            <ImageManifest
              url="/laveyronnaise-logo.png"
              alphaRef={alphaRef}
            />
          );
        }

        if (!element) return null;

        return (
          <Suspense key={project.id} fallback={null}>
            {element}
          </Suspense>
        );
      })}
    </group>
  );
}