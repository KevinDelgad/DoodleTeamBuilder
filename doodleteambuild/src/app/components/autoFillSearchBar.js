import React, { useEffect, useState } from "react";

function SearchBar({
  textToSet,
  idToOpen,
  selectedValue,
  primaryValue,
  setMatchingValue,
  valueToWatch,
  hasBorder,
  setSecondaryMatchingValue,
  secondaryValue,
  placeholder
}) {
  //Searchbar word matching
  useEffect(() => {
    if (valueToWatch === "") {
      setMatchingValue(primaryValue);
      if(setSecondaryMatchingValue !== null){
        setSecondaryMatchingValue(secondaryValue)
      }
    } else {
      let tempDoodleListValid = [];
      let tempDoodleListAll = [];
      for (let i = 0; i < primaryValue.length; i++) {
        if (
          primaryValue[i].substring(0, selectedValue.length).toLowerCase() ===
          selectedValue.toLowerCase()
        ) {
          tempDoodleListValid.push(primaryValue[i]);
        }
      }

      if(secondaryValue !== null){
        for (let i = 0; i < secondaryValue.length; i++) {
          if (
            secondaryValue[i].substring(0, selectedValue.length).toLowerCase() ===
            selectedValue.toLowerCase()
          ) {
            tempDoodleListAll.push(secondaryValue[i]);
          }
        }
      }
      setMatchingValue(tempDoodleListValid);
      if(setSecondaryMatchingValue !== null){
        setSecondaryMatchingValue(tempDoodleListAll)
      }

    }
  }, [valueToWatch, primaryValue]);

  const handleTextChange = (e) => {
    textToSet(e.target.value);
  };

  return (
    <input
      type="text"
      className={`${
        hasBorder ? "bg-neutral-600" : "bg-stone-600"
      } w-full border-2`}
      placeholder={placeholder}
      onChange={handleTextChange}
      value={selectedValue}
      onClick={() => (document.getElementById(idToOpen).open = true)}
    />
  );
}

export default SearchBar;
