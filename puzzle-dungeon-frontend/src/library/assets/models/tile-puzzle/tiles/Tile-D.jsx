/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 public/models/tile-D.glb -o src/Tile-D.jsx -r public 
*/
import { useGLTF } from "@react-three/drei";

import { degreesToRadians } from "../../../../hooks/custom-project-hooks/degrees_to_radians";

import { Outlines } from "@react-three/drei";
import { startingTileData } from "../data/title-puzzle-data";
import { useSpring, animated } from "@react-spring/three";

export function TileD({
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
  const { nodes, materials } = useGLTF("/models/tile-D.glb");
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
      rotation-y={degreesToRadians(startingTileData.tileD.yRotationInDegrees)}
      onClick={modelClickHandler}
      scale={[1.35, 1, 1.35]}
    >
      <mesh
        geometry={nodes["tile-puzzle-D_v1_1"].geometry}
        material={materials.Mesh}
        ref={modelRef}
      >
        {elementClicked && <Outlines thickness={0.45} color="white" />}
      </mesh>
      <mesh
        geometry={nodes["tile-puzzle-D_v1_2"].geometry}
        material={materials.Text}
        ref={textRef}
      />
    </animated.group>
  );
}

useGLTF.preload("/models/tile-D.glb");
