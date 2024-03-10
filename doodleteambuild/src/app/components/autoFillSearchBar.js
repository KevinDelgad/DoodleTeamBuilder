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

      
      for (let i = 0; i < allDoodleValueAll.length; i++) {
        if (
          allDoodleValueAll[i].substring(0, selectedValue.length).toLowerCase() ===
          selectedValue.toLowerCase()
        ) {
          tempDoodleListAll.push(allDoodleValueAll[i]);
        }
      }

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
      } w-full border-2`}
      placeholder="Search Doodle..."
      onChange={handleTextChange}
      value={selectedValue}
      onClick={() => (document.getElementById(idToOpen).open = true)}
    />
  );
}

export default SearchBar;
