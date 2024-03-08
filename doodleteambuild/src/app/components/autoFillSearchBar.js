import React, { useEffect, useState } from "react";

function SearchBar({
  textToSet,
  idToOpen,
  hasPageBeenRendered,
  selectedValue,
  allValue,
  allDoodleValue,
  setMatchingValue,
  valueToWatch,
  hasBorder,
}) {
  //Searchbar word matching
  useEffect(() => {
    console.log("reloaded")
    if (selectedValue === "") {
      console.log("Value Reset")
      console.log(allDoodleValue)
      setMatchingValue(allDoodleValue);
    } else {
      let tempDoodleList = [];
      for (let i = 0; i < allDoodleValue.length; i++) {
        if (
          allDoodleValue[i].substring(0, selectedValue.length).toLowerCase() ===
          selectedValue.toLowerCase()
        ) {
          tempDoodleList.push(allDoodleValue[i]);
        }
      }
      if (tempDoodleList.length > 0) {
        setMatchingValue(tempDoodleList);
      }
    }
  }, [valueToWatch, allDoodleValue]);

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
