"use client";
import Image from "next/image";
import { Fredoka } from "next/font/google";
import Doodles from "../../public/data/doodles.json";
import magnifyGlass from "../../public/images/magnifying-glass.svg";
import React, { useEffect } from "react";

const fredoka = Fredoka({ weight: "700", subsets: ["latin"] });

export default function Home() {
  const [selectedDoodle, setSelectedDoodle] = React.useState("");
  const [selectedDoodleInfo, setSelectedDoodleInfo] = React.useState();

  const [matchingDoodle, setMatchingDoodle] = React.useState([]);
  const [matchingDoodleIndex, setmatchingDoodleIndex] = React.useState(3);

  const [allDoodleName, setAllDoodleName] = React.useState([]);

  const hasPageBeenRendered = React.useRef({ effect1: false, effect2: false });

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
    ["ice", "#bg-ice"],
    ["dark", "bg-dark"],
    ["poison", "bg-poison"],
    ["mythic", "bg-mythic"],
  ];

  const retrieveDoodleInfo = (doodleName) =>{
    console.log(doodleName)
  }

  const traitList = doodleTypes.map((doodle) => (
    <li
      key={doodle}
      className={`text-black badge-lg badge badge-neutraltext-xl basis-1/5 outline-4 ${doodle[1]}`}
    >
      {doodle[0]}
    </li>
  ));

  const doodleDrop = matchingDoodle
    .slice(matchingDoodleIndex - 3, matchingDoodleIndex)
    .map((doodle) => (
      <li key={doodle} className="w-full text-2xl">
        <button className="btn" onClick={() => retrieveDoodleInfo(doodle)}>{doodle}</button>
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
      if ((matchingDoodleIndex - i > 3)) {
        console.log(matchingDoodleIndex - i)
        continue;
      }
      indexToSub--;
    }

    setmatchingDoodleIndex(matchingDoodleIndex - indexToSub);
  };

  const updateMatchingDoodle = () => {
    setMatchingDoodle([]);
  };


  const getDoodleData = (doodleName) => {
    setSelectedDoodleInfo([Doodles["DoodleData"][doodleName]]);
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
                <div className="w-2/5 h-3/5 bg-neutral-500 flex flex-col items-center p-5 text-textGray rounded-3xl">
                  <label className="input input-bordered border-4 flex bg-neutral-500 w-1/2">
                    <input
                      type="text"
                      className="bg-neutral-500 w-full text-2xl"
                      placeholder="Search Doodle..."
                      onChange={handleTextChange}
                      value={selectedDoodle}
                    />
                    <button onClick={() => getDoodleData(selectedDoodle)}>
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
                    </button>
                  </label>

                  <section className="" id="searchedDoodle">
                    <h1>PlaceHolder</h1>
                    <details className="dropdown">
                      <summary className="m-1 btn">open or close</summary>
                      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 h-52">
                        {doodleDrop}
                        <div className="flex justify-between">
                          <button className="btn" onClick={() => {updateMatchingDoodleIndexBackward()}}> {"<"} </button>
                          <button className="btn" onClick={() => {updateMatchingDoodleIndexForward()}}> {">"} </button>
                        </div>
                      </ul>
                    </details>
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
