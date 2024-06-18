/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 public/models/tile-A.glb -0 src/Title-A.jsx -r public 
*/

import { useGLTF } from "@react-three/drei";

import { degreesToRadians } from "../../../../hooks/custom-project-hooks/degrees_to_radians";

import { Outlines } from "@react-three/drei";
import { startingTileData } from "../data/title-puzzle-data";
import { useSpring, animated } from "@react-spring/three";

export function TileA({
  positionX,
  positionZ,

  modelClickHandler,
  modelRef,
  textRef,
  elementClicked,
  moveTriggered,
  previousPositionX,
  previousPositionZ,
}) {
  const { nodes, materials } = useGLTF("/models/tile-A.glb");

  const { x, z } = useSpring({
    from: {
      x: previousPositionX,
      z: previousPositionZ,
    },

    to: [
      {
        x: moveTriggered ? positionX : previousPositionX,
        z: moveTriggered ? positionZ : previousPositionZ,
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
      rotation-y={degreesToRadians(startingTileData.tileA.yRotationInDegrees)}
      onClick={modelClickHandler}
      scale={[1.35, 1, 1.35]}
    >
      <mesh
        geometry={nodes["tile-puzzle-A_v2_1"].geometry}
        material={materials.Base}
        ref={modelRef}
      >
        {elementClicked && <Outlines thickness={0.45} color="white" />}
      </mesh>
      <mesh
        geometry={nodes["tile-puzzle-A_v2_2"].geometry}
        material={materials.Text}
        ref={textRef}
      />
    </animated.group>
  );
}

useGLTF.preload("/models/tile-A.glb");
