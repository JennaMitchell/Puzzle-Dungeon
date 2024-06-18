import { CameraControls } from "@react-three/drei";

import { button, useControls } from "leva";
import { useRef, useEffect, useMemo } from "react";
import { degreesToRadians } from "../../../../library/hooks/custom-project-hooks/degrees_to_radians";
import { useAppSelector } from "../../../../library/store/typescript-hooks";

export const CanvasCameraControls = () => {
  const cameraPositions = useMemo(() => {
    return {
      front: [0, 119.99999999994, 0.00011999999999998, 0, 0, 0],
      back: [
        -9.253767555679911e-7, -127.12828553708103, -0.00012712491758087852, 0,
        0, 0,
      ],
      top: [-8.73511360651096, 4.370438156071585, -239.63603182604942, 0, 0, 0],
      rear: [
        8.360688996458844, -5.755151396796746, 143.23890937541864, 0, 0, 0,
      ],
      left: [
        -143.47414318203928, -5.755151396796746, 1.5673282153376409, 0, 0, 0,
      ],
      right: [
        143.5504057169529, -3.662900683791081, -0.5217511225172826, 0, 0, 0,
      ],
    };
  }, []);

  const controls = useRef(null);
  const cameraView = useAppSelector((state) => state.tilePuzzle.cameraView);

  // const intro = async () => {
  //   controls.current.setLookAt(0, 0, 5, 0, 0, 0, false);
  //   await controls.current.dolly(3, true);
  //   await controls.current.rotate(
  //     degreesToRadians(45),
  //     degreesToRadians(25),
  //     true
  //   );
  // };
  // useControls("Helper", {
  //   getLookAt: button(() => {
  //     const position = controls.current.getPosition();
  //     const target = controls.current.getTarget();
  //     console.log([...position, ...target]);
  //   }),
  // });

  useEffect(() => {
    const playTransition = async () => {
      await controls.current.setLookAt(...cameraPositions[cameraView], true);
    };
    playTransition();
  }, [cameraView, cameraPositions]);

  return (
    <>
      <CameraControls ref={controls} />
    </>
  );
};
