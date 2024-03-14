import React, { useEffect, useState } from "react";
import doodleItems from "../../../public/data/heldItems.json"
import { useId } from "react";
import SearchBar from "./autoFillSearchBar";

function TraitBar() {
  const [allTraits, setAllTraits] = useState(Object.keys(doodleItems));
  const [typedTrait, setTypedTrait] = useState("");
  const [matchedTraits, setMatchedTraits] = useState([]);
  const [selectedTrait, setSelectedTrait] = useState();
  const personalId = useId();

  const populateTraitList = matchedTraits.map((trait) => (
    <li key={trait} className="w-full">
      <button
        className="w-full hover:bg-sky-100 flex pl-8"
        onClick={() => {
          setSelectedTrait(trait);
          setTypedTrait(trait);
          document.getElementById(personalId).open = false;
        }}
      >
        {trait}
      </button>
    </li>
  ));

  return (
    <details id={personalId} className=" moveList ml-5">
      <summary
        className="flex text-white"
        onClick={() => {
          //TODO: Add Ability to close other move options upon opening a new one
        }}
        
      >
        <SearchBar
          textToSet={setTypedTrait}
          idToOpen={personalId}
          selectedValue={typedTrait}
          primaryValue={allTraits}
          setMatchingValue={setMatchedTraits}
          valueToWatch={typedTrait}
          hasBorder={false}
          secondaryValue={null}
          setSecondaryMatchingValue={null}
          placeholder={"Search Trait"}
        />
      </summary>

      <ul className="p-2 bg-base-100 rounded-box w-40 h-40 absolute z-10 overflow-auto">
        {populateTraitList.length > 0 ? (
          <>{populateTraitList}</>
        ) : (
          ""
        )}
      </ul>
    </details>
  );
}

export default TraitBar;
