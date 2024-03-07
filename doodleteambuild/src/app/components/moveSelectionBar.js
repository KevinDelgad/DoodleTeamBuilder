import React, { useEffect, useState } from "react";
import doodleMoves from "../../../public/data/doodleSpecificMoves.json";
import { useId } from "react";
import SearchBar from "./autoFillSearchBar";
function DoodleMoveSelect({ doodleName, hasPageBeenRendered }) {
  const [doodleAllMoves, setDoodleAllMoves] = useState(doodleMoves[doodleName]);
  const [doodleSelectableMoves, setDoodleSelectableMoves] = useState(
    doodleMoves[doodleName]
  );

  const [matchingMoveIndex, setMatchingMoveIndex] = useState(4);

  const [typedMove, setTypedMove] = useState("");

  //Why?? Fix Later
  const [matchingMoves, setMatchingMoves] = useState([]);


  const [selectedMove, setSelectedMove] = useState("Move");

  useEffect(() =>{
    console.log(doodleSelectableMoves)
  }, [doodleSelectableMoves])

  const personalId = useId();

  const populateMoveList = doodleSelectableMoves
    .map((move) => (
      <li key={move} className="w-full">
        <button
        className="w-full hover:bg-sky-100"
          onClick={() => {
            setSelectedMove(move);
            setTypedMove(move);
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
          //TODO: Add Ability to close other move options upon opening a new one
        }}
      >
        <SearchBar
          textToSet={setTypedMove}
          idToOpen={personalId}
          hasPageBeenRendered={hasPageBeenRendered}
          matchingValue={matchingMoves}
          selectedValue={typedMove}
          allValue={doodleAllMoves}
          setMatchingValue={setDoodleSelectableMoves}
          setIndex={setMatchingMoveIndex}
          valueToWatch={typedMove}
          hasBorder={false}
        />
      </summary>
      <ul className="p-2 dropdown-content bg-base-100 rounded-box w-52 h-40 z-10 overflow-auto">
        {populateMoveList}
      </ul>
    </details>
  );
}

export default DoodleMoveSelect;
