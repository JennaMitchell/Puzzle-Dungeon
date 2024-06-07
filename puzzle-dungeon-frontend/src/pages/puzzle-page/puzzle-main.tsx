import { Canvas } from "@react-three/fiber";
import { TitlePuzzleBoard } from "../../library/assets/models/tile-puzzle/board/Title-Puzzle-Board";
import { OrbitControls } from "@react-three/drei";
import { TileA } from "../../library/assets/models/tile-puzzle/tiles/Tile-A";
const PuzzleMain = (): JSX.Element => {
  return (
    <>
      <Canvas camera={{ position: [0, 120, 0] }}>
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 20, 0]} intensity={2} />
        {/* <pointLight intensity={1000000} distance={1000} position={[0, 0, 0]} /> */}

        <axesHelper args={[200]} />

        {/* <Stats /> */}
        <OrbitControls />
        <TitlePuzzleBoard />
        <TileA />
      </Canvas>
    </>
  );
};

export default PuzzleMain;
