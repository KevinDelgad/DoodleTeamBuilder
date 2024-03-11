import React, { useEffect, useState } from "react";
import doodleItems from "../../../public/data/heldItems.json"
import { useId } from "react";
import SearchBar from "./autoFillSearchBar";
function HeldItem(){

    const [allItems, setAllItems] = useState(Object.keys(doodleItems))
    const [typedItem, setTypedItem] = useState("")
    const [matchedItems, setMatchedItems] = useState([])
    const [selectedItem, setSelectedItem] = useState()
    const personalId = useId();


    
    const populateItemList = matchedItems.map((item) =>(
        <li key={item} className="w-full">
        <button
          className="w-full hover:bg-sky-100 flex pl-8"
          onClick={() => {
            setSelectedItem(item);
            setTypedItem(item);
            document.getElementById(personalId).open = false;
          }}
        >
          {item}
        </button>
      </li>
    ));

    return(
        <details id={personalId} className=" moveList mr-5">
        <summary
          className="flex text-white"
          onClick={() => {
            //TODO: Add Ability to close other move options upon opening a new one
          }}
        >
          <SearchBar
            textToSet={setTypedItem}
            idToOpen={personalId}
            selectedValue={typedItem}
            primaryValue={allItems}
            setMatchingValue={setMatchedItems}
            valueToWatch={typedItem}
            hasBorder={false}
            secondaryValue={null}
            setSecondaryMatchingValue={null}
            placeholder={"Search Item"}
          />
        </summary>

        <ul className="p-2 dropdown-content bg-base-100 rounded-box w-52 h-40 fixed overflow-auto">
          {populateItemList.length > 0 ? (
            <>
              {populateItemList}
            </>
          ) : (
            ""
          )}
        </ul>
      </details>
    )
}

export default HeldItem