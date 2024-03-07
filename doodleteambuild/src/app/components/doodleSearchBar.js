import downArrow from "../../../public/images/Arrow-down.svg";
import React, { useEffect } from "react";
import Doodles from "../../../public/data/doodles.json";
import { useId } from "react";

function DoodleSearch({
  setSelectedDoodle,
  selectedDoodle,
  matchingDoodle,
  setSelectedDoodleInfo,
  hasPageBeenRendered,
  setMatchingDoodle,
  hasBorder,
}) {
  const [matchingDoodleIndex, setmatchingDoodleIndex] = React.useState(3);
  const [allDoodleName, setAllDoodleName] = React.useState([]);
  const personalId = useId();
  const doodleImgPath = "/doodleImages/";

  const handleTextChange = (e) => {
    setSelectedDoodle(e.target.value);
  };

  useEffect(() => {
    setAllDoodleName(Object.keys(Doodles["DoodleData"]));
    setMatchingDoodle(Object.keys(Doodles["DoodleData"]));

  }, []);

  //Searchbar word matching
  useEffect(() => {
    if (hasPageBeenRendered.current["effect2"]) {
      if (matchingDoodle.length === 0) {
        if (selectedDoodle === "") {
          setMatchingDoodle(allDoodleName);
        } else {
          let tempDoodleList = [];
          for (let i = 0; i < allDoodleName.length; i++) {
            if (
              allDoodleName[i]
                .substring(0, selectedDoodle.length)
                .toLowerCase() === selectedDoodle.toLowerCase()
            ) {
              tempDoodleList.push(allDoodleName[i]);
            }
          }
          if (tempDoodleList.length > 0) {
            setMatchingDoodle(tempDoodleList);
          }
          setmatchingDoodleIndex(3);
        }
      }
    }
    hasPageBeenRendered.current["effect2"] = true;
  }, [matchingDoodle]);

  //Doodle QuickSearch doodle info retriever
  const retrieveDoodleInfo = (doodleName) => {
    let foundDoodleData = {};
    foundDoodleData["Name"] = doodleName;
    foundDoodleData["Types"] = Doodles["DoodleData"][doodleName]["Types"];
    foundDoodleData["DoodleImgPath"] = Doodles["DoodleData"][doodleName]["ImgPath"];
    //Update Text Box to reflect selected Doodle Name
    setSelectedDoodle(doodleName);
    //
    setSelectedDoodleInfo(foundDoodleData);
  };

  //Doodle QuickSearch list Creator
  const doodleDrop = matchingDoodle
    .slice(matchingDoodleIndex - 3, matchingDoodleIndex)
    .map((doodle) => (
      <li key={doodle} className="w-full text-2xl">
        <button
          className="btn"
          onClick={() => {
            retrieveDoodleInfo(doodle);
            document.getElementById(personalId).open = false;
          }}
        >
          {doodle}
        </button>
      </li>
    ));



  const updateMatchingDoodleIndexForward = () => {
    let indexToAdd = 0;
    for (let i = 0; i < 3; i++) {
      if (matchingDoodleIndex + i <= matchingDoodle.length) {
        indexToAdd++;
      }
    }
    setmatchingDoodleIndex(matchingDoodleIndex + indexToAdd);
  };

  const updateMatchingDoodleIndexBackward = () => {
    let indexToSub = 3;
    for (let i = 0; i < 3; i++) {
      if (matchingDoodleIndex - i > 3) {
        continue;
      }
      indexToSub--;
    }

    setmatchingDoodleIndex(matchingDoodleIndex - indexToSub);
  };

  return (
    <label
      className={`input ${
        hasBorder ? "border-4 bg-neutral-600 input-bordered" : "bg-stone-600"
      } flex w-1/2`}
    >
      <details
        id={personalId}
        className={`dropdown ${hasBorder ? "" : "border-b-4 border-black"}`}
      >
        <summary className={`flex`}>
          <input
            type="text"
            className={`${
              hasBorder ? "bg-neutral-600" : "bg-stone-600"
            } w-full text-2xl`}
            placeholder="Search Doodle..."
            onChange={handleTextChange}
            value={selectedDoodle}
            onClick={() => (document.getElementById(personalId).open = true)}
          />

          <svg
            xmlns={downArrow}
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-8 h-8 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 h-52">
          {doodleDrop}
          <div className="flex justify-between">
            <button
              className="btn"
              onClick={() => {
                updateMatchingDoodleIndexBackward();
              }}
            >
              {"<"}
            </button>
            <button
              className="btn"
              onClick={() => {
                updateMatchingDoodleIndexForward();
              }}
            >
              {">"}
            </button>
          </div>
        </ul>
      </details>
    </label>
  );
}

export default DoodleSearch;
