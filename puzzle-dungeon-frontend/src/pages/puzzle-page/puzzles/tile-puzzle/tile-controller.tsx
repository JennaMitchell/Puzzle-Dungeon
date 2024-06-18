import { useRef } from "react";

import { hexToRGBValue } from "../../../../library/hooks/custom-project-hooks/hex_to_rgb_value";

import useDefault from "../../../../library/hooks/hook-library/useDefault";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../../library/store/typescript-hooks";
import { tilePuzzleStoreActions } from "../../../../library/store/tile-puzzle-store";
import { popupStoreActions } from "../../../../library/store/popup-store";

import { useEffect, useMemo } from "react";

import tilePuzzleMoveHandler from "../../../../library/hooks/custom-project-hooks/tile-puzzle/tilePuzzleMoveHandler";

import { TileA } from "../../../../library/assets/models/tile-puzzle/tiles/Tile-A";
import { TileB } from "../../../../library/assets/models/tile-puzzle/tiles/Tile-B";
import { TileC } from "../../../../library/assets/models/tile-puzzle/tiles/Tile-C";
import { tilePositionFinder } from "../../../../library/hooks/custom-project-hooks/tile-puzzle/tilePositionFinder";
import { tileLetterExtrator } from "../../../../library/hooks/custom-project-hooks/tile-puzzle/tileLetterExtractor";
import { useState } from "react";
import { tilePositionData } from "../../../../library/assets/models/tile-puzzle/data/title-puzzle-data";

export type TilePropsType = {
  positionX: number;
  positionZ: number;

  modelClickHandler: () => void;
  modelRef: any;
  textRef: any;
  elementClicked: boolean;
};

const TileController = ({
  tileLetter,
}: {
  tileLetter: "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
}) => {
  const modelRef = useRef<any>(null);
  const textRef = useRef<any>(null);

  const convertedTextHighlightColor = useMemo(() => {
    return hexToRGBValue("#FFFFFF");
  }, []);
  const convertedTextBaseColor = useMemo(() => {
    return hexToRGBValue("#000000");
  }, []);

  const [currentTextColor, setCurrentTextColor] = useDefault("Base", "Base");
  const [elementClicked, setElementClicked] = useDefault(false, false);

  const selectedTile = useAppSelector((state) => state.tilePuzzle.selectedTile);
  const previousTile = useAppSelector(
    (state) => state.tilePuzzle.previousSelectedTile
  );
  const dispatch = useAppDispatch();

  const tilePositionMatrix = useAppSelector(
    (state) => state.tilePuzzle.tilePositionMatrix
  );

  const [tilePoisition, setTilePoisition] = useState({
    positionX: 0,
    positionZ: 0,
  });

  const modelClickHandler = () => {
    if (
      modelRef.current &&
      textRef.current &&
      convertedTextHighlightColor &&
      convertedTextBaseColor
    ) {
      const notNullTextRef = textRef.current;

      if (currentTextColor === "Base") {
        notNullTextRef.material.color = {
          r: convertedTextHighlightColor[0],
          g: convertedTextHighlightColor[1],
          b: convertedTextHighlightColor[2],
          isColor: true,
        };
        setCurrentTextColor("Hightlight");
        setElementClicked(true);
        dispatch(tilePuzzleStoreActions.setPreviousSelectedTile(selectedTile));

        dispatch(tilePuzzleStoreActions.setSelectedTile(tileLetter));
      } else {
        notNullTextRef.material.color = {
          r: convertedTextBaseColor[0],
          g: convertedTextBaseColor[1],
          b: convertedTextBaseColor[2],
          isColor: true,
        };

        if (selectedTile === tileLetter) {
          dispatch(tilePuzzleStoreActions.setPreviousSelectedTile(null));
          dispatch(tilePuzzleStoreActions.setSelectedTile(null));
        }
        setCurrentTextColor("Base");
        setElementClicked(false);
      }
    }
  };

  // UseEffect To handle Tile Position

  useEffect(() => {
    const tileMatrixPosition = tilePositionFinder(
      tileLetter,
      tilePositionMatrix
    );

    if (
      typeof tileMatrixPosition.column === "number" &&
      typeof tileMatrixPosition.row === "number"
    ) {
      const newPositionData = {
        positionX:
          tilePositionData[tileMatrixPosition.row][tileMatrixPosition.column]
            .positionX,
        positionZ:
          tilePositionData[tileMatrixPosition.row][tileMatrixPosition.column]
            .positionZ,
      };

      setTilePoisition(newPositionData);
    }
  }, [tilePositionMatrix, tileLetter]);

  // Use Effect below is used to clear the selected tile if another tile is clicked

  useEffect(() => {
    if (
      selectedTile !== tileLetter &&
      textRef.current &&
      previousTile === tileLetter &&
      convertedTextBaseColor
    ) {
      const notNullTextRef = textRef.current;
      notNullTextRef.material.color = {
        r: convertedTextBaseColor[0],
        g: convertedTextBaseColor[1],
        b: convertedTextBaseColor[2],
        isColor: true,
      };
      setCurrentTextColor("Base");
      setElementClicked(false);
    }
  }, [
    selectedTile,
    convertedTextBaseColor,
    setElementClicked,
    setCurrentTextColor,
    previousTile,
    tileLetter,
  ]);

  // Use Effect below is used to handler when the user preses a key to move a tile

  useEffect(() => {
    const keyDownEventHandler = (event: any) => {
      const keyPressed = event.key;
      const acceptableKeyPresses = [
        "ArrowRight",
        "ArrowLeft",
        "ArrowUp",
        "ArrowDown",
      ];

      if (acceptableKeyPresses.includes(keyPressed) && selectedTile) {
        console.log("Tile Position Matrix");

        console.log(tilePositionMatrix);
        const moveResponse = tilePuzzleMoveHandler(
          keyPressed,
          tilePositionMatrix,
          selectedTile
        );
        const tileLetter = tileLetterExtrator(selectedTile);

        if (moveResponse.moveSuccess && tileLetter) {
          const copyOfTilePositionMatrix = JSON.parse(
            JSON.stringify(tilePositionMatrix)
          );

          const currentTilePosition = tilePositionFinder(
            tileLetter,
            tilePositionMatrix
          );

          if (
            typeof currentTilePosition.column === "number" &&
            typeof currentTilePosition.row === "number" &&
            typeof moveResponse.newTilePoisition.zeroBasedColumn === "number" &&
            typeof moveResponse.newTilePoisition.zeroBasedRow === "number"
          ) {
            // Removing  the current Tile the old Tile Position
            console.log("Current Position");
            console.log(currentTilePosition.column);
            console.log(currentTilePosition.row);

            copyOfTilePositionMatrix[currentTilePosition.row][
              currentTilePosition.column
            ] = "";

            // Adding in the new

            console.log("new Position");
            console.log(moveResponse.newTilePoisition.zeroBasedColumn);
            console.log(moveResponse.newTilePoisition.zeroBasedRow);
            copyOfTilePositionMatrix[
              moveResponse.newTilePoisition.zeroBasedRow
            ][moveResponse.newTilePoisition.zeroBasedColumn] = tileLetter;

            console.log(copyOfTilePositionMatrix);

            dispatch(
              tilePuzzleStoreActions.setTilePositionMatrix(
                copyOfTilePositionMatrix
              )
            );
          }
        } else {
          dispatch(popupStoreActions.setMessagePopupActive(true));
          dispatch(
            popupStoreActions.setMessagePopupData({
              error: !moveResponse.moveSuccess,
              message: moveResponse.errorMessage,
            })
          );
        }
      }
    };

    if (selectedTile) {
      window.addEventListener("keydown", keyDownEventHandler);

      return () => {
        window.removeEventListener("keydown", keyDownEventHandler);
      };
    }
  }, [selectedTile, dispatch, tilePositionMatrix]);

  console.log(" Rerender Tile Position Matrix");

  console.log(tilePositionMatrix);

  return (
    <>
      {tileLetter === "A" && (
        <TileA
          positionX={tilePoisition.positionX}
          positionZ={tilePoisition.positionZ}
          modelClickHandler={modelClickHandler}
          modelRef={modelRef}
          textRef={textRef}
          elementClicked={elementClicked}
        />
      )}
      {tileLetter === "B" && (
        <TileB
          positionX={tilePoisition.positionX}
          positionZ={tilePoisition.positionZ}
          modelClickHandler={modelClickHandler}
          modelRef={modelRef}
          textRef={textRef}
          elementClicked={elementClicked}
        />
      )}
      {tileLetter === "C" && (
        <TileC
          positionX={tilePoisition.positionX}
          positionZ={tilePoisition.positionZ}
          modelClickHandler={modelClickHandler}
          modelRef={modelRef}
          textRef={textRef}
          elementClicked={elementClicked}
        />
      )}
    </>
  );
};

export default TileController;
