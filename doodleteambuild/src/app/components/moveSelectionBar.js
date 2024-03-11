import React, { useEffect, useState } from "react";
import doodleMoves from "../../../public/data/doodleSpecificMoves.json";
import allMovesData from "../../../public/data/allMoves.json";
import { useId } from "react";
import SearchBar from "./autoFillSearchBar";
import Image from "next/image";
function DoodleMoveSelect({ doodleName, hasPageBeenRendered }) {
  //Get and List all DoodleMoves w/o Type
  const getDoodleAllMoves = () => {
    let allMoves = [];
    for (var type in allMovesData) {
      var obj = allMovesData[type];
      for (var key in obj) {
        var value = obj[key];
        allMoves.push(value);
      }
    }
    return allMoves;
  };

  const doodleAllMoves = getDoodleAllMoves();
  const [allDoodleSpecificMoves, setAllDoodleSpecificMoves] = useState(
    doodleMoves[doodleName]
  );
  const [doodleSelectableMovesValid, setDoodleSelectableMovesValid] = useState(
    []
  );
  const [doodleSelectableMovesAll, setDoodleSelectableMovesAll] = useState([]);

  const [typedMove, setTypedMove] = useState("");

  const [selectedMove, setSelectedMove] = useState("Move");
  const doodleTypePath = "/typeImages/";

  //Get List of AllMoves with Type

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
          return type.toLowerCase();
        }
      }
    }
  };

  //Update Data formatting to allow for more optimized img retrival for move types

  // Update Script to better work with new format

  const populateMoveList = doodleSelectableMovesAll.map((move) => (
    <li key={move} className="w-full">
      <button
        className="w-full hover:bg-sky-100 flex pl-8"
        onClick={() => {
          setSelectedMove(move);
          setTypedMove(move);
          document.getElementById(personalId).open = false;
        }}
      >
        <Image
          className="h-fit"
          src={doodleTypePath + findMoveType(move) + ".webp"}
          height={25}
          width={25}
          alt="Move Type"
        />
        {move}
      </button>
    </li>
  ));

  const populatePersonalMoveList = doodleSelectableMovesValid.map((move) => (
    <li key={move} className="w-full">
      <button
        className="w-full hover:bg-sky-100 flex pl-8"
        onClick={() => {
          setSelectedMove(move);
          setTypedMove(move);
          document.getElementById(personalId).open = false;
        }}
      >
        <Image
          src={doodleTypePath + findMoveType(move) + ".webp"}
          height={25}
          width={25}
          alt="Move Type"
        />
        {move}
      </button>
    </li>
  ));

  return (
    <details id={personalId} className=" moveList">
      <summary
        className="flex text-white"
        onClick={() => {
          //TODO: Add Ability to close other move options upon opening a new one
        }}
      >
        <SearchBar
          textToSet={setTypedMove}
          idToOpen={personalId}
          selectedValue={typedMove}
          primaryValue={allDoodleSpecificMoves}
          setMatchingValue={setDoodleSelectableMovesValid}
          valueToWatch={typedMove}
          hasBorder={false}
          setSecondaryMatchingValue={setDoodleSelectableMovesAll}
          secondaryValue={doodleAllMoves}
          placeholder={"Search Move"}
        />
      </summary>
      <ul className="p-2 dropdown-content bg-base-100 rounded-box w-52 h-40 fixed overflow-auto">
        {populatePersonalMoveList.length > 0 ? (
          <>
            Valid Moves
            {populatePersonalMoveList}
          </>
        ) : (
          ""
        )}

        {populateMoveList.length > 0 ? (
          <>
            All Moves
            {populateMoveList}
          </>
        ) : (
          ""
        )}
      </ul>
    </details>
  );
}

export default DoodleMoveSelect;
