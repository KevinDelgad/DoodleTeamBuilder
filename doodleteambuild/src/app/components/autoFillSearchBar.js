import React, { useEffect, useState } from "react";

function SearchBar({
  textToSet,
  idToOpen,
  hasPageBeenRendered,
  matchingValue,
  selectedValue,
  allValue,
  setMatchingValue,
  setIndex,
  valueToWatch,
  hasBorder,
}) {
  //Searchbar word matching
  useEffect(() => {
    if (hasPageBeenRendered.current["effect2"]) {
      if (matchingValue.length === 0) {
        if (selectedValue === "") {
          setMatchingValue(allValue);
        } else {
          let tempDoodleList = [];
          for (let i = 0; i < allValue.length; i++) {
            if (
              allValue[i].substring(0, selectedValue.length).toLowerCase() ===
              selectedValue.toLowerCase()
            ) {
              tempDoodleList.push(allValue[i]);
            }
          }
          if (tempDoodleList.length > 0) {
            setMatchingValue(tempDoodleList);
          }
          setIndex(4);
        }
      }
    }
    hasPageBeenRendered.current["effect2"] = true;
  }, [valueToWatch]);

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
