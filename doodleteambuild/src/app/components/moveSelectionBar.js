import React, { useEffect, useState } from "react";
import doodleMoves from "../../../public/data/doodleSpecificMoves.json";
import allMovesData from "../../../public/data/allMoves.json";
import { useId } from "react";
import SearchBar from "./autoFillSearchBar";
import Image from "next/image";
function DoodleMoveSelect({
  doodleName,
  hasPageBeenRendered,
  doodleTeam,
  setDoodleTeam,
  teamMember,
  moveNumber,
}) {
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

  const [selectedMove, setSelectedMove] = useState("");
  const doodleTypePath = "/typeImages/";

  //Get List of AllMoves with Type

  useEffect(() => {
    setAllDoodleSpecificMoves(doodleMoves[doodleName]);
    if (doodleTeam[teamMember][moveNumber]) {
      console.log(doodleTeam[teamMember][moveNumber]);
      setSelectedMove(doodleTeam[teamMember][moveNumber]);
      setTypedMove(doodleTeam[teamMember][moveNumber]);
    } else {
      setSelectedMove("");
      setTypedMove("");
    }
  }, [doodleName, teamMember]);

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

  function createNewObj(obj, changes, key, moveNumber) {
    if (changes) {
      const obj1 = {};
      const obj2 = {};
      let addToObj2 = false;

      let updatedObj = {
        [key]: {
          doodle: obj[key].doodle,
          type: obj[key].type,
          moveOne: obj[key].moveOne,
          moveTwo: obj[key].moveTwo,
          moveThree: obj[key].moveThree,
          moveFour: obj[key].moveFour,
          heldItem: null,
          trait: null,
          imgPath: obj[key].imgPath,
        },
      };

      updatedObj[key][moveNumber] = changes;
      for (const prop in obj) {
        if (prop === key) {
          addToObj2 = true;
          continue;
        }

        if (addToObj2) {
          obj2[prop] = obj[prop];
        } else {
          obj1[prop] = obj[prop];
        }
      }

      return { ...obj1, ...updatedObj, ...obj2 };
    } else {
      return doodleTeam;
    }
  }

  useEffect(() => {
    setDoodleTeam(
      createNewObj(doodleTeam, selectedMove, teamMember, moveNumber)
    );
  }, [selectedMove]);

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
    <li key={move  + "personal"} className="w-full">
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

  return (
    <details id={personalId} className="moveList">
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
      <ul className="p-2 bg-base-100 rounded-box w-48 h-40 overflow-auto absolute">
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
