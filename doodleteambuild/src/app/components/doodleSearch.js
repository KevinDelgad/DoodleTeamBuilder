import downArrow from "../../../public/images/Arrow-down.svg";
import React, { useEffect } from "react";
import Doodles from "../../../public/data/doodles.json";


function DoodleSearch({setSelectedDoodle, selectedDoodle, matchingDoodle, setSelectedDoodleInfo, hasPageBeenRendered, setMatchingDoodle}) {
  const [matchingDoodleIndex, setmatchingDoodleIndex] = React.useState(3);
  const [allDoodleName, setAllDoodleName] = React.useState([]);
  const doodleImgPath = "/doodleImages/";
  const handleTextChange = (e) => {
    setSelectedDoodle(e.target.value);
  };

  useEffect(() => {
    setAllDoodleName(Object.keys(Doodles["DoodleData"]));
    setMatchingDoodle(Object.keys(Doodles["DoodleData"]));
  }, []);

  useEffect(() => {
    if (hasPageBeenRendered.current["effect2"] && matchingDoodle.length === 0) {
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
    foundDoodleData["Types"] = Doodles["DoodleData"][doodleName]["Type"];
    foundDoodleData["DoodleImgPath"] = doodleImgPath + doodleName + ".webp";
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
            document.getElementById("quickSerachDrop").open = false;
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
    <label className="input input-bordered border-4 flex bg-neutral-600 w-1/2">
      <details id="quickSerachDrop" className="dropdown">
        <summary className="flex">
          <input
            type="text"
            className="bg-neutral-600 w-full text-2xl"
            placeholder="Search Doodle..."
            onChange={handleTextChange}
            value={selectedDoodle}
            onClick={() =>
              (document.getElementById("quickSerachDrop").open = true)
            }
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
              {" "}
              {"<"}{" "}
            </button>
            <button
              className="btn"
              onClick={() => {
                updateMatchingDoodleIndexForward();
              }}
            >
              {" "}
              {">"}{" "}
            </button>
          </div>
        </ul>
      </details>
    </label>
  );
}

export default DoodleSearch;
