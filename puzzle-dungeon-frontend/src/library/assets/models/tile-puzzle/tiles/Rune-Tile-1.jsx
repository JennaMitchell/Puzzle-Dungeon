/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 public/models/tile-A.glb -0 src/Title-A.jsx -r public 
*/

import { useGLTF } from "@react-three/drei";

import { degreesToRadians } from "../../../../hooks/custom-project-hooks/degrees_to_radians";

import { Outlines } from "@react-three/drei";
import { startingTileData } from "../data/title-puzzle-data";
import { useSpring, animated } from "@react-spring/three";

export function RuneTileOne({
  positionX,
  positionZ,
  positionY,

  modelClickHandler,
  modelRef,
  textRef,
  elementClicked,
  moveTriggered,
  previousPositionX,
  previousPositionZ,
  previousPositionY,
}) {
  const { nodes, materials } = useGLTF("/models/tile-rune-1.glb");

  const { x, z, y } = useSpring({
    from: {
      x: previousPositionX,
      z: previousPositionZ,
      y: previousPositionY,
    },

    to: [
      {
        x: moveTriggered ? positionX : previousPositionX,
        z: moveTriggered ? positionZ : previousPositionZ,
        y: moveTriggered ? positionY : previousPositionY,
      },
    ],

    config: {
      mass: 1,
      friction: 30,
    },
    onResolve: () => {},

    immediate: false,
  });

  return (
    <animated.group
      dispose={null}
      position-x={x}
      position-z={z}
      position-y={y}
      rotation-y={degreesToRadians(startingTileData.tileA.yRotationInDegrees)}
      rotation-x={degreesToRadians(startingTileData.tileA.xRotationInDegrees)}
      onClick={modelClickHandler}
      scale={[1.35, 1, 1.35]}
    >
      <mesh
        geometry={nodes["rune-tile-1_v1_1"].geometry}
        material={materials.Base}
        ref={modelRef}
      >
        {elementClicked && <Outlines thickness={0.45} color="white" />}
      </mesh>
      <mesh
        geometry={nodes["rune-tile-1_v1_2"].geometry}
        material={materials.Lettering}
        ref={textRef}
      />
    </animated.group>
  );
}

useGLTF.preload("/models/tile-rune-1.glb");
