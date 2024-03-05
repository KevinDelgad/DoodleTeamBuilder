import React, { useEffect, useState } from "react";
import doodleMoves from "../../../public/data/doodleSpecificMoves.json";
import { useId } from "react";

function DoodleMoveSelect(doodleName) {
  const [doodleAllMoves, setDoodleAllMoves] = useState(
    doodleMoves[doodleName["doodleName"]]
  );
  const [doodleSelectableMoves, setDoodleSelectableMoves] = useState(
    doodleMoves[doodleName["doodleName"]]
  );

  const [matchingMoveIndex, setMatchingMoveIndex] = useState(4);

  const updateMoveIndexForward = () => {
    let indexToAdd = 0;
    for (let i = 0; i < 3; i++) {
      if (matchingMoveIndex + i <= matchingDoodle.length) {
        indexToAdd++;
      }
    }
    setMatchingMoveIndex(matchingMoveIndex + indexToAdd);
  };

  const updateMoveIndexBackward = () => {
    let indexToSub = 3;
    for (let i = 0; i < 3; i++) {
      if (matchingMoveIndex - i > 3) {
        continue;
      }
      indexToSub--;
    }

    setMatchingMoveIndex(matchingMoveIndex - indexToSub);
  };

  const [selectedMove, setSelectedMove] = useState("Move");

  const personalId = useId();

  const populateMoveList = doodleSelectableMoves.map((move) => (
    <li key={move} className="w-full">
      <button
        onClick={() => {
          setSelectedMove(move);
          document.getElementById(personalId).open = false;
        }}
      >
        {move}
      </button>
    </li>
  ));
  return (
    <details id={personalId} className="dropdown moveList">
      <summary
        className="m-1 border-4 flex flex-1 text-white px-3"
        onClick={() => {
          console.log(document.getElementsByTagName("details"));
          //TODO: Add Ability to close other move options upon opening a new one
        }}
      >
        {selectedMove}
      </summary>
      <ul className="p-2 menu dropdown-content bg-base-100 rounded-box w-52 z-10">
        {populateMoveList}
      <div>
        <button className="btn">{"<"}</button>
        <button className="btn">{">"}</button>
      </div>
      </ul>
    </details>
  );
}

export default DoodleMoveSelect;
