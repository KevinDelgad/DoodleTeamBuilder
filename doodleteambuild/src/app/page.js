"use client";
import Image from "next/image";
import Doodles from "../../public/data/doodles.json";
import TypeChart from "../../public/data/typechart.json";
import SpecialMoves from "../../public/data/specialMoves.json";

import magnifyGlass from "../../public/images/magnifying-glass.svg";
import React, { useEffect } from "react";

export default function Home() {
  const [selectedDoodle, setSelectedDoodle] = React.useState("");
  const [selectedDoodleInfo, setSelectedDoodleInfo] = React.useState();

  const [matchingDoodle, setMatchingDoodle] = React.useState([]);
  const [matchingDoodleIndex, setmatchingDoodleIndex] = React.useState(3);

  const [allDoodleName, setAllDoodleName] = React.useState([]);

  const hasPageBeenRendered = React.useRef({ effect1: false, effect2: false });

  const doodleImgPath = "/doodleImages/";
  const doodleTypePath = "/typeImages/";

  useEffect(() => {
    setAllDoodleName(Object.keys(Doodles["DoodleData"]));
    setMatchingDoodle(Object.keys(Doodles["DoodleData"]));
  }, []);

  useEffect(() => {
    if (hasPageBeenRendered.current["effect1"]) {
      updateMatchingDoodle();
    }
    hasPageBeenRendered.current["effect1"] = true;
  }, [selectedDoodle]);

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

  const doodleTypes = [
    ["basic", "bg-basic"],
    ["fire", "bg-fire"],
    ["water", "bg-water"],
    ["plant", "bg-plant"],
    ["spark", "bg-spark"],
    ["beast", "bg-beast"],
    ["air", "bg-air"],
    ["insect", "bg-insect"],
    ["earth", "bg-earth"],
    ["mind", "bg-mind"],
    ["melee", "bg-melee"],
    ["food", "bg-food"],
    ["light", "bg-light"],
    ["crystal", "bg-crystal"],
    ["metal", "bg-metal"],
    ["spirit", "bg-spirit"],
    ["ice", "bg-ice"],
    ["dark", "bg-dark"],
    ["poison", "bg-poison"],
    ["mythic", "bg-mythic"],
  ];

  //Doodle Quicksearch type lister
  const doodleTypeAtSingle = (effective) => {
    let effectiveTypes = [];
    const keys = Object.keys(
      TypeChart["defense"][selectedDoodleInfo["Types"][0].toLowerCase()]
    );
    keys.forEach((key) => {
      var value =
        TypeChart["defense"][selectedDoodleInfo["Types"][0].toLowerCase()][key];
      if (value === effective) {
        const capitalized = key.charAt(0).toUpperCase() + key.slice(1);
        effectiveTypes.push(capitalized);
      }
    });
    return effectiveTypes;
  };

  const moveEffectiveCheck = () => {
    if (selectedDoodleInfo["Types"].length > 1) {
      let affectedTypes = [];
      let checkType = [];
      let typeToCheck = "";
      let found = "";
      for (const key in SpecialMoves) {
        if (
          SpecialMoves[key].Efvs.toLowerCase() ===
            selectedDoodleInfo["Types"][0].toLowerCase() ||
          SpecialMoves[key].Efvs.toLowerCase() ===
            selectedDoodleInfo["Types"][1].toLowerCase()
        ) {
          affectedTypes.push(SpecialMoves[key].Efvs.toLowerCase());
          checkType.push([key, SpecialMoves[key].Type.toLowerCase()]);
        }
      }

      affectedTypes.includes(selectedDoodleInfo["Types"][0].toLowerCase())
        ? (typeToCheck = selectedDoodleInfo["Types"][0].toLowerCase())
        : affectedTypes.includes(selectedDoodleInfo["Types"][1].toLowerCase())
        ? (typeToCheck = selectedDoodleInfo["Types"][1].toLowerCase())
        : (typeToCheck = null);

      for (const option in checkType) {
        if (TypeChart["defense"][typeToCheck][checkType[option][1]] === 2) {
          found = checkType[option][0];
        }
      }

      return (
        <>
          <li className="text-black badge-lg badge badge-neutral text-xl basis-1/6 outline-4 flex flex-1">{found}</li>
        </>
      );
    }
  };

  const doodleTypeAtMulti = (effective) => {
    let effectiveTypes = [];
    const keys = Object.keys(
      TypeChart["defense"][selectedDoodleInfo["Types"][0].toLowerCase()]
    );

    keys.forEach((key) => {
      var typeOneValue =
        TypeChart["defense"][selectedDoodleInfo["Types"][0].toLowerCase()][key];
      var typeTwoValue =
        TypeChart["defense"][selectedDoodleInfo["Types"][1].toLowerCase()][key];
      if (typeOneValue * typeTwoValue === effective) {
        const capitalized = key.charAt(0).toUpperCase() + key.slice(1);
        effectiveTypes.push(capitalized);
      }
    });

    return effectiveTypes;
  };

  const quickSearchTypeHelper = (effective) => {
    let effectiveTypes = [];
    selectedDoodleInfo["Types"].length === 1
      ? (effectiveTypes = doodleTypeAtSingle(effective))
      : (effectiveTypes = doodleTypeAtMulti(effective));

    const typeList = effectiveTypes.map((type) => (
      <li
        key={type}
        className={`text-black badge-lg badge badge-neutral text-xl basis-1/6 outline-4 ${
          doodleTypes[
            doodleTypes.findIndex(
              (curtype) => curtype[0] === type.toLowerCase()
            )
          ][1]
        }`}
      >
        {type}
      </li>
    ));

    return <>{typeList}</>;
  };

  //Doodle QuickSearch doodle info retriever
  const retrieveDoodleInfo = (doodleName) => {
    let foundDoodleData = {};
    foundDoodleData["Name"] = doodleName;
    foundDoodleData["Types"] = Doodles["DoodleData"][doodleName]["Type"];
    foundDoodleData["DoodleImgPath"] = doodleImgPath + doodleName + ".webp";
    setSelectedDoodleInfo(foundDoodleData);
  };

  // Trait list Creator
  const traitList = doodleTypes.map((doodle) => (
    <li
      key={doodle}
      className={`text-black badge-lg badge badge-neutral text-xl basis-1/4 outline-4 ${doodle[1]}`}
    >
      {doodle[0]}
    </li>
  ));

  //Doodle QuickSearch list Creator
  const doodleDrop = matchingDoodle
    .slice(matchingDoodleIndex - 3, matchingDoodleIndex)
    .map((doodle) => (
      <li key={doodle} className="w-full text-2xl">
        <button className="btn" onClick={() => {retrieveDoodleInfo(doodle); document.getElementById("quickSerachDrop").open = false;}}>
          {doodle}
        </button>
      </li>
    ));

  const typeImgs =
    selectedDoodleInfo &&
    selectedDoodleInfo["Types"].map((type) => (
      <li key={type}>
        <Image
          src={doodleTypePath + type.toLowerCase() + ".webp"}
          width={50}
          height={50}
          alt="Type Img"
        />
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

  const updateMatchingDoodle = () => {
    setMatchingDoodle([]);
  };

  const handleTextChange = (e) => {
    setSelectedDoodle(e.target.value);
  };

  return (
    <main className="flex h-screen flex-col items-center justify-between bg-neutral-500">
      <header className="flex w-full justify-center items-center bg-neutral-700 h-28 shrink-0">
        <h1 className={`text-white lg:text-5xl sm:text-xl`}>
          Doodle World Teambuilder
        </h1>
      </header>

      <section className="flex w-full h-full justify-between">
        <section className="flex basis-3/5">
          <p>placeholder</p>
        </section>

        <section className="flex basis-2/5 flex-col items-center">
          <section className="flex flex-col basis-2/3 justify-around">
            <div className="flex grow flex-col bg-stone-600 border-4 border-black rounded-2xl">
              <p className={` text-white text-3xl flex justify-center`}>
                Team Defense
              </p>
              <div className="flex grow">
                <ul className="flex flex-wrap">{traitList}</ul>
              </div>
            </div>
            <div className="flex grow flex-col bg-stone-600 border-4 border-black rounded-2xl">
              <p className={` text-white text-3xl flex justify-center`}>
                Team Coverage
              </p>
              <div className="flex grow">
                <ul className="flex flex-wrap">{traitList}</ul>
              </div>
            </div>
          </section>
          <section className="flex-col justify-around flex shrink-0 basis-1/3">
            <div className="flex flex-col">
              <button className="btn">VIEW TYPE CHART</button>
              <button
                className="btn"
                onClick={() =>
                  document.getElementById("quickLookMod").showModal()
                }
              >
                QUICK LOOKUP
              </button>
              <dialog id="quickLookMod" className="modal">
                <div className="w-2/6 h-4/5 bg-neutral-600 flex flex-col items-center p-5 text-textGray rounded-3xl">
                  <div className="flex flex-row w-full">
                    <button className="flex ml-3" onClick={() =>
                    document.getElementById("quickLookMod").close()
                  }>X</button>

                  </div>
                  <label className="input input-bordered border-4 flex bg-neutral-600 w-1/2">
                    <details id="quickSerachDrop" className="dropdown">
                      <summary className="flex">
                        <input
                          type="text"
                          className="bg-neutral-600 w-full text-2xl"
                          placeholder="Search Doodle..."
                          onChange={handleTextChange}
                          value={selectedDoodle}
                          onClick={() => document.getElementById("quickSerachDrop").open = true}
                        />

                        <svg
                          xmlns={magnifyGlass}
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

                  <section className="flex flex-col flex-1" id="searchedDoodle">
                    {selectedDoodleInfo ? (
                      <>
                        <h1 className="flex justify-center">
                          {selectedDoodleInfo["Name"]}
                        </h1>
                        <div className="flex justify-center">
                          <ul>{typeImgs}</ul>
                          <Image
                            src={selectedDoodleInfo["DoodleImgPath"]}
                            height={100}
                            width={100}
                            alt="Selected Doodle Img"
                          />
                        </div>
                        <div className="flex flex-col flex-1 justify-evenly">
                          <div className="flex items-center flex-col">
                            <h2 className="text-red-600">
                              super, super effective from (4x)
                            </h2>
                            <ul className="flex flex-wrap justify-center">
                              {moveEffectiveCheck()}
                              {quickSearchTypeHelper(4)}
                            </ul>
                          </div>
                          <div className="flex items-center flex-col">
                            <h2 className="text-rose-400">
                              super effective from (2x)
                            </h2>
                            <ul className="flex flex-wrap justify-center">
                              {quickSearchTypeHelper(2)}
                            </ul>
                          </div>
                          <div className="flex items-center flex-col">
                            <h2 className="text-white">
                              moderately effective from (1x)
                            </h2>
                            <ul className="flex flex-wrap justify-center">
                              {quickSearchTypeHelper(1)}
                            </ul>
                          </div>
                          <div className="flex items-center flex-col">
                            <h2 className="text-green-200">
                              not so effective from (1/2x)
                            </h2>
                            <ul className="flex flex-wrap justify-center">
                              {quickSearchTypeHelper(0.5)}
                            </ul>
                          </div>
                          <div className="flex items-center flex-col">
                            <h2 className="text-green-500">
                              no effect from (0x)
                            </h2>
                            <ul className="flex flex-wrap justify-center">
                              {quickSearchTypeHelper(0)}
                            </ul>
                          </div>
                          <button onClick={() => moveEffectiveCheck()}>
                            Test
                          </button>
                        </div>
                      </>
                    ) : null}
                  </section>
                </div>
              </dialog>
            </div>

            <div className="flex flex-col">
              <button className="btn">Export a team</button>
              <button className="btn">Import a team</button>
            </div>
          </section>
        </section>
      </section>
    </main>
  );
}
