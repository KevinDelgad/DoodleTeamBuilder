import React, { useEffect, useState } from "react";
import doodleMoves from "../../../public/data/doodleSpecificMoves.json";
import allMovesData from "../../../public/data/allMoves.json";
import { useId } from "react";
import SearchBar from "./autoFillSearchBar";
import Image from "next/image";
import { stringify } from "postcss";
function DoodleMoveSelect({ doodleName, hasPageBeenRendered }) {
  const [doodleAllMoves, setDoodleAllMoves] = useState([]);
  const [allDoodleSpecificMoves, setAllDoodleSpecificMoves] = useState(
    doodleMoves[doodleName]
  );
  const [doodleSelectableMoves, setDoodleSelectableMoves] = useState([]);

  const [typedMove, setTypedMove] = useState("");

  //Why?? Fix Later
  const [matchingMoves, setMatchingMoves] = useState([]);

  const [selectedMove, setSelectedMove] = useState("Move");
  const doodleTypePath = "/typeImages/";

  useEffect(() => {
    let allMoves = [];
    for (var type in allMovesData) {
      var obj = allMovesData[type];
      for (var key in obj) {
        var value = obj[key];
        allMoves.push(value);
      }
    }
    setDoodleAllMoves(allMoves);
  }, []);

  useEffect(() => {
    setAllDoodleSpecificMoves(doodleMoves[doodleName]);
    setSelectedMove("");
    setTypedMove("");
  }, [doodleName]);

  const personalId = useId();

  const findMoveType = (moveName) => {
    for (var type in allMovesData) {
      var obj = allMovesData[type];
      for (var key in obj) {
        var value = obj[key];
        if (value === moveName) {
          console.log(type);
          return type.toLowerCase();
        }
      }
    }
  };

  const populateMoveList = doodleAllMoves.map((move) => (
    <li key={move} className="w-full">
      <button
        className="w-full hover:bg-sky-100 flex pl-8"
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

  const populatePersonalMoveList = doodleSelectableMoves.map((move) => (
    <li key={move} className="w-full">
      <button
        className="w-full hover:bg-sky-100 flex pl-8"
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
          selectedValue={typedMove}
          allValue={doodleAllMoves}
          allDoodleValue={allDoodleSpecificMoves}
          setMatchingValue={setDoodleSelectableMoves}
          valueToWatch={typedMove}
          hasBorder={false}
        />
      </summary>
      <ul className="p-2 dropdown-content bg-base-100 rounded-box w-52 h-40 z-10 overflow-auto">
        Valid Moves
        {populatePersonalMoveList}
        All Moves
        {populateMoveList}
      </ul>
    </details>
  );
}

export default DoodleMoveSelect;
