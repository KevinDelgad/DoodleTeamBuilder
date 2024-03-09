import React, { useEffect, useState } from "react";

function SearchBar({
  textToSet,
  idToOpen,
  selectedValue,
  allValue,
  allDoodleValueValid,
  setMatchingValue,
  valueToWatch,
  hasBorder,
  setSecondaryMatchingValue,
  allDoodleValueAll
}) {
  //Searchbar word matching
  useEffect(() => {
    const allMoves= allDoodleValueAll();
    if (selectedValue === "") {
      setMatchingValue(allDoodleValueValid);
      setSecondaryMatchingValue(allDoodleValueAll)
    } else {
      let tempDoodleListValid = [];
      let tempDoodleListAll = [];
      for (let i = 0; i < allDoodleValueValid.length; i++) {
        if (
          allDoodleValueValid[i].substring(0, selectedValue.length).toLowerCase() ===
          selectedValue.toLowerCase()
        ) {
          tempDoodleListValid.push(allDoodleValueValid[i]);
        }
      }

      
      for (let i = 0; i < allMoves.length; i++) {
        if (
          allMoves[i].substring(0, selectedValue.length).toLowerCase() ===
          selectedValue.toLowerCase()
        ) {
          tempDoodleListAll.push(allMoves[i]);
        }
      }

      console.log(allMoves.length)
      setMatchingValue(tempDoodleListValid);
      setSecondaryMatchingValue(tempDoodleListAll)

    }
  }, [valueToWatch, allDoodleValueValid]);

  const handleTextChange = (e) => {
    textToSet(e.target.value);
  };

  return (
    <input
      type="text"
      className={`${
        hasBorder ? "bg-neutral-600" : "bg-stone-600"
      } w-full text-2xl`}
      placeholder="Search Doodle..."
      onChange={handleTextChange}
      value={selectedValue}
      onClick={() => (document.getElementById(idToOpen).open = true)}
    />
  );
}

export default SearchBar;
