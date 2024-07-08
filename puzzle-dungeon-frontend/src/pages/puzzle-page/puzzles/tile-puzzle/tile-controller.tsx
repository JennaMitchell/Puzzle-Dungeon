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

import { RuneTileOne } from "../../../../library/assets/models/tile-puzzle/tiles/Rune-Tile-1";
import { RuneTileTwo } from "../../../../library/assets/models/tile-puzzle/tiles/Rune-Tile-2";
import { RuneTileThree } from "../../../../library/assets/models/tile-puzzle/tiles/Rune-Tile-3";
import { RuneTileFour } from "../../../../library/assets/models/tile-puzzle/tiles/Rune-Tile-4";
import { RuneTileFive } from "../../../../library/assets/models/tile-puzzle/tiles/Rune-Tile-5";
import { RuneTileSix } from "../../../../library/assets/models/tile-puzzle/tiles/Rune-Tile-6";
import { RuneTileSeven } from "../../../../library/assets/models/tile-puzzle/tiles/Rune-Tile-7";
import { RuneTileEight } from "../../../../library/assets/models/tile-puzzle/tiles/Rune-Tile-8";
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
  const [moveTriggered, setMoveTriggered] = useState(false);
  const [previousTilePosition, setPreviousTilePosition] = useState({
    positionX: 0,
    positionZ: 0,
  });
  const [firstRender, setFirstRender] = useState(false);

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

      if (!firstRender) {
        setPreviousTilePosition(newPositionData);
        setFirstRender(true);
      } else {
        setPreviousTilePosition(tilePoisition);
        setTilePoisition(newPositionData);
      }
    }
  }, [tilePositionMatrix, tileLetter, tilePoisition, firstRender]);

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

            copyOfTilePositionMatrix[currentTilePosition.row][
              currentTilePosition.column
            ] = "";

            // Adding in the new

            copyOfTilePositionMatrix[
              moveResponse.newTilePoisition.zeroBasedRow
            ][moveResponse.newTilePoisition.zeroBasedColumn] = tileLetter;

            // Move Sucess so triggering the new move

            setMoveTriggered(true);

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

  return (
    <>
      {tileLetter === "A" && (
        <RuneTileOne
          positionX={tilePoisition.positionX}
          positionZ={tilePoisition.positionZ}
          modelClickHandler={modelClickHandler}
          modelRef={modelRef}
          textRef={textRef}
          elementClicked={elementClicked}
          moveTriggered={moveTriggered}
          previousPositionX={previousTilePosition.positionX}
          previousPositionZ={previousTilePosition.positionZ}
        />
      )}
      {tileLetter === "B" && (
        <RuneTileTwo
          positionX={tilePoisition.positionX}
          positionZ={tilePoisition.positionZ}
          modelClickHandler={modelClickHandler}
          modelRef={modelRef}
          textRef={textRef}
          elementClicked={elementClicked}
          moveTriggered={moveTriggered}
          previousPositionX={previousTilePosition.positionX}
          previousPositionZ={previousTilePosition.positionZ}
        />
      )}
      {tileLetter === "C" && (
        <RuneTileThree
          positionX={tilePoisition.positionX}
          positionZ={tilePoisition.positionZ}
          modelClickHandler={modelClickHandler}
          modelRef={modelRef}
          textRef={textRef}
          elementClicked={elementClicked}
          moveTriggered={moveTriggered}
          previousPositionX={previousTilePosition.positionX}
          previousPositionZ={previousTilePosition.positionZ}
        />
      )}
      {tileLetter === "D" && (
        <RuneTileFour
          positionX={tilePoisition.positionX}
          positionZ={tilePoisition.positionZ}
          modelClickHandler={modelClickHandler}
          modelRef={modelRef}
          textRef={textRef}
          elementClicked={elementClicked}
          moveTriggered={moveTriggered}
          previousPositionX={previousTilePosition.positionX}
          previousPositionZ={previousTilePosition.positionZ}
        />
      )}
      {tileLetter === "E" && (
        <RuneTileFive
          positionX={tilePoisition.positionX}
          positionZ={tilePoisition.positionZ}
          modelClickHandler={modelClickHandler}
          modelRef={modelRef}
          textRef={textRef}
          elementClicked={elementClicked}
          moveTriggered={moveTriggered}
          previousPositionX={previousTilePosition.positionX}
          previousPositionZ={previousTilePosition.positionZ}
        />
      )}
      {tileLetter === "F" && (
        <RuneTileSix
          positionX={tilePoisition.positionX}
          positionZ={tilePoisition.positionZ}
          modelClickHandler={modelClickHandler}
          modelRef={modelRef}
          textRef={textRef}
          elementClicked={elementClicked}
          moveTriggered={moveTriggered}
          previousPositionX={previousTilePosition.positionX}
          previousPositionZ={previousTilePosition.positionZ}
        />
      )}
      {tileLetter === "G" && (
        <RuneTileSeven
          positionX={tilePoisition.positionX}
          positionZ={tilePoisition.positionZ}
          modelClickHandler={modelClickHandler}
          modelRef={modelRef}
          textRef={textRef}
          elementClicked={elementClicked}
          moveTriggered={moveTriggered}
          previousPositionX={previousTilePosition.positionX}
          previousPositionZ={previousTilePosition.positionZ}
        />
      )}
      {tileLetter === "H" && (
        <RuneTileEight
          positionX={tilePoisition.positionX}
          positionZ={tilePoisition.positionZ}
          modelClickHandler={modelClickHandler}
          modelRef={modelRef}
          textRef={textRef}
          elementClicked={elementClicked}
          moveTriggered={moveTriggered}
          previousPositionX={previousTilePosition.positionX}
          previousPositionZ={previousTilePosition.positionZ}
        />
      )}
    </>
  );
};

export default TileController;
