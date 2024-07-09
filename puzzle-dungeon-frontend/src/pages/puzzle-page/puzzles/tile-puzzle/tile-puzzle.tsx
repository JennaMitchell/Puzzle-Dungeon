import { Canvas } from "@react-three/fiber";
import { TitlePuzzleBoard } from "../../../../library/assets/models/tile-puzzle/board/Title-Puzzle-Board";
import { OrbitControls } from "@react-three/drei";

import TileController from "./tile-controller";
import { Leva } from "leva";
import { CanvasCameraControls } from "./canvas-camera-controls";
import { CameraMenu } from "./camera-menu";
const TilePuzzle = () => {
  return (
    <>
      <Leva hidden />
      <CameraMenu />
      <Canvas camera={{ position: [0, 475, 0] }}>
        <ambientLight intensity={0.1} />
        <CanvasCameraControls />

        <directionalLight position={[0, 20, 0]} intensity={2} />
        {/* <pointLight intensity={1000000} distance={1000} position={[0, 0, 0]} /> */}

        {/* <axesHelper args={[200]} /> */}

        {/* <Stats /> */}
        <OrbitControls />
        <TitlePuzzleBoard />
        <TileController tileLetter="A" />
        <TileController tileLetter="B" />
        <TileController tileLetter="C" />
        <TileController tileLetter="D" />
        <TileController tileLetter="E" />
        <TileController tileLetter="F" />
        <TileController tileLetter="G" />
        <TileController tileLetter="H" />
      </Canvas>
    </>
  );
};
export default TilePuzzle;
