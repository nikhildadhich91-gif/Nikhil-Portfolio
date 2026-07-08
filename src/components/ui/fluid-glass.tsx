"use client";

/* eslint-disable react/no-unknown-property */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from 'three';
import { useRef, useState, useEffect, memo } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import {
  useFBO,
  useGLTF,
  MeshTransmissionMaterial,
  Text
} from '@react-three/drei';
import { easing } from 'maath';

interface NavItem {
  label: string;
  link: string;
}

interface FluidGlassProps {
  mode?: 'lens' | 'bar' | 'cube';
  lensProps?: any;
  barProps?: any;
  cubeProps?: any;
}

export default function FluidGlass({
  mode = 'bar',
  lensProps = {},
  barProps = {},
  cubeProps = {}
}: FluidGlassProps) {
  const Wrapper = mode === 'bar' ? Bar : mode === 'cube' ? Cube : Lens;
  const rawOverrides = mode === 'bar' ? barProps : mode === 'cube' ? cubeProps : lensProps;

  const {
    navItems = [
      { label: 'Home', link: '#home' },
      { label: 'Work', link: '#work' },
      { label: 'Services', link: '#services' },
      { label: 'About', link: '#about' },
      { label: 'Contact', link: '#contact' }
    ],
    ...modeProps
  } = rawOverrides;

  return (
    <div className="w-full h-full relative pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 15 }}
        gl={{ alpha: true, antialias: true }}
        className="pointer-events-none"
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        {mode === 'bar' && <NavItems items={navItems} />}
        
        <Wrapper modeProps={modeProps}>
          {/* Subtle 3D background elements inside the portal so the glass has something beautiful to refract */}
          <BackgroundElements />
        </Wrapper>
      </Canvas>
    </div>
  );
}

// Background elements to render inside the refraction portal scene
function BackgroundElements() {
  const mesh1 = useRef<THREE.Mesh>(null);
  const mesh2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mesh1.current) {
      mesh1.current.position.x = Math.sin(t * 0.5) * 4;
      mesh1.current.position.y = Math.cos(t * 0.3) * 2;
      mesh1.current.rotation.y = t * 0.2;
    }
    if (mesh2.current) {
      mesh2.current.position.x = Math.cos(t * 0.4) * -4;
      mesh2.current.position.y = Math.sin(t * 0.6) * -2;
      mesh2.current.rotation.x = t * 0.3;
    }
  });

  return (
    <group>
      {/* Floating colored spheres for high-quality refraction mapping */}
      <mesh ref={mesh1} position={[2, 1, -5]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color="#ff8a3d" opacity={0.6} transparent />
      </mesh>
      <mesh ref={mesh2} position={[-2, -1, -5]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial color="#5227ff" opacity={0.5} transparent />
      </mesh>
    </group>
  );
}

const ModeWrapper = memo(function ModeWrapper({
  children,
  glb,
  geometryKey,
  lockToBottom = false,
  followPointer = true,
  modeProps = {},
  ...props
}: any) {
  const ref = useRef<any>();
  const { nodes } = useGLTF(glb) as any;
  const buffer = useFBO();
  const { viewport: vp } = useThree();
  const [scene] = useState(() => new THREE.Scene());
  const geoWidthRef = useRef(1);

  useEffect(() => {
    if (nodes && nodes[geometryKey]) {
      const geo = nodes[geometryKey].geometry;
      geo.computeBoundingBox();
      geoWidthRef.current = geo.boundingBox.max.x - geo.boundingBox.min.x || 1;
    }
  }, [nodes, geometryKey]);

  useFrame((state, delta) => {
    const { gl, viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    const destX = followPointer ? (pointer.x * v.width) / 2 : 0;
    // Lower position offset so it fits perfectly on screen bounds
    const destY = lockToBottom ? -v.height / 2 + 0.5 : followPointer ? (pointer.y * v.height) / 2 : 0;
    
    if (ref.current) {
      easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

      if (modeProps.scale == null) {
        const maxWorld = v.width * 0.9;
        const desired = maxWorld / geoWidthRef.current;
        // Keep the scale relative and elegant
        ref.current.scale.setScalar(Math.min(0.22, desired));
      }
    }

    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    // Dynamic clean transparent background render clear
    gl.setClearColor(0x000000, 0);
  });

  const { scale, ior, thickness, anisotropy, chromaticAberration, ...extraMat } = modeProps;

  if (!nodes || !nodes[geometryKey]) return null;

  return (
    <>
      {createPortal(children, scene)}
      <mesh scale={[vp.width, vp.height, 1]} position={[0, 0, 0]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent opacity={1.0} />
      </mesh>
      <mesh
        ref={ref}
        scale={scale ?? 0.18}
        rotation-x={Math.PI / 2}
        geometry={nodes[geometryKey].geometry}
        {...props}
      >
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior ?? 1.25}
          thickness={thickness ?? 3.5}
          anisotropy={anisotropy ?? 0.1}
          chromaticAberration={chromaticAberration ?? 0.15}
          roughness={0.05}
          transmission={1.0}
          distortion={0.1}
          distortionScale={0.2}
          temporalDistortion={0.0}
          {...extraMat}
        />
      </mesh>
    </>
  );
});

// Pre-load assets
useGLTF.preload('/assets/3d/lens.glb');
useGLTF.preload('/assets/3d/cube.glb');
useGLTF.preload('/assets/3d/bar.glb');

function Lens({ modeProps, ...p }: any) {
  return <ModeWrapper glb="/assets/3d/lens.glb" geometryKey="Cylinder" followPointer modeProps={modeProps} {...p} />;
}

function Cube({ modeProps, ...p }: any) {
  return <ModeWrapper glb="/assets/3d/cube.glb" geometryKey="Cube" followPointer modeProps={modeProps} {...p} />;
}

function Bar({ modeProps = {}, ...p }: any) {
  const defaultMat = {
    transmission: 1.0,
    roughness: 0.05,
    thickness: 6,
    ior: 1.25,
    color: '#ffffff',
    attenuationColor: '#ffffff',
    attenuationDistance: 0.5
  };

  return (
    <ModeWrapper
      glb="/assets/3d/bar.glb"
      geometryKey="Cube"
      lockToBottom
      followPointer={false}
      modeProps={{ ...defaultMat, ...modeProps }}
      {...p}
    />
  );
}

const DEVICE = {
  mobile: { max: 639, spacing: 0.35, fontSize: 0.045 },
  tablet: { max: 1023, spacing: 0.45, fontSize: 0.042 },
  desktop: { max: Infinity, spacing: 0.52, fontSize: 0.04 }
};

const getDevice = (): 'mobile' | 'tablet' | 'desktop' => {
  if (typeof window === 'undefined') return 'desktop';
  const w = window.innerWidth;
  return w <= DEVICE.mobile.max ? 'mobile' : w <= DEVICE.tablet.max ? 'tablet' : 'desktop';
};

function NavItems({ items }: { items: NavItem[] }) {
  const group = useRef<THREE.Group>(null);
  const { viewport, camera } = useThree();

  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>(getDevice);

  useEffect(() => {
    const onResize = () => setDevice(getDevice());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const { spacing, fontSize } = DEVICE[device];

  useFrame(() => {
    if (!group.current) return;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);
    // Align items with the bar at the bottom
    group.current.position.set(0, -v.height / 2 + 0.5, 15.1);

    group.current.children.forEach((child: any, i) => {
      child.position.x = (i - (items.length - 1) / 2) * spacing;
    });
  });

  const handleNavigate = (link: string) => {
    if (!link) return;
    if (link.startsWith('#')) {
      const target = document.querySelector(link);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = link;
    }
  };

  return (
    <group ref={group} renderOrder={20}>
      {items.map(({ label, link }) => (
        <Text
          key={label}
          fontSize={fontSize}
          color="#EDEFF2"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hJP0v.woff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0}
          outlineBlur="15%"
          outlineColor="#000000"
          outlineOpacity={0.4}
          onClick={(e: any) => {
            e.stopPropagation();
            handleNavigate(link);
          }}
          onPointerOver={() => {
            if (typeof document !== 'undefined') document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            if (typeof document !== 'undefined') document.body.style.cursor = 'auto';
          }}
        >
          {label}
        </Text>
      ))}
    </group>
  );
}
