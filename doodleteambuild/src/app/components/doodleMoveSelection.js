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
    <details id={personalId} className="dropdown">
      <summary className="m-1 border-4 flex flex-1">{selectedMove}</summary>
      <ul className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
        {populateMoveList}
      </ul>
    </details>
  );
}

export default DoodleMoveSelect;
