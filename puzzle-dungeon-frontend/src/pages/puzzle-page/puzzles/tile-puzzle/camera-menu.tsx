import { tilePuzzleStoreActions } from "../../../../library/store/tile-puzzle-store";
import { useAppDispatch } from "../../../../library/store/typescript-hooks";
import { MouseEvent } from "react";
export const CameraMenu = () => {
  const cameraPositions = ["Front", "Back", "Top", "Rear", "Left", "Right"];
  const dispatch = useAppDispatch();

  const buttonClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    const targetElement = event.target;
    if (targetElement) {
      const notNullTarget = targetElement as HTMLButtonElement;
      const value = notNullTarget.innerHTML;

      if (cameraPositions.includes(value)) {
        dispatch(tilePuzzleStoreActions.setCameraView(value.toLowerCase()));
      }
    }
  };

  return (
    <div className={"cameraMenu"}>
      {cameraPositions.map((cameraPosition) => {
        return (
          <button
            onClick={buttonClickHandler}
            key={`${cameraPosition}-camera-menu-button`}
            className="fs-22"
          >
            {cameraPosition}
          </button>
        );
      })}
    </div>
  );
};
