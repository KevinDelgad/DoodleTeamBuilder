import DoodleSearch from "./doodleSearchBar";
import Image from "next/image";
import React, { useEffect } from "react";
import TypeChart from "../../../public/data/typechart.json";
import SpecialMoves from "../../../public/data/specialMoves.json";

function DoodleQuickSearch() {
  const [selectedDoodle, setSelectedDoodle] = React.useState("");
  const [selectedDoodleInfo, setSelectedDoodleInfo] = React.useState();
  const [matchingDoodle, setMatchingDoodle] = React.useState([]);
  const hasPageBeenRendered = React.useRef({
    effect1: false,
    effect2: false,
    effect3: false,
  });
  const doodleTypePath = "/typeImages/";
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

  useEffect(() => {
    if (hasPageBeenRendered.current["effect1"]) {
      setMatchingDoodle([]);
    }
    hasPageBeenRendered.current["effect1"] = true;
  }, [selectedDoodle]);

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

      return found === "" ? null : (
        <>
          <li className="text-black badge-lg badge badge-neutral text-xl basis-1/6 outline-4 flex flex-1">
            Move: {found}
          </li>
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
        className={`text-black badge grow-0 badge badge-neutral text-lg outline-4 ${
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
  return (
    <div className="bg-stone-600 flex flex-col h-80 my-3 rounded-xl border-4 px-5 py-2">
      <DoodleSearch
        setSelectedDoodle={setSelectedDoodle}
        selectedDoodle={selectedDoodle}
        matchingDoodle={matchingDoodle}
        setSelectedDoodleInfo={setSelectedDoodleInfo}
        hasPageBeenRendered={hasPageBeenRendered}
        setMatchingDoodle={setMatchingDoodle}
        hasBorder={false}
      />

      <section className="flex w-full h-full" id="searchedDoodle">
        {selectedDoodleInfo ? (
          <>
            <div className="flex w-1/3 shrink-0 flex-col justify-center items-center">
              <Image
                src={selectedDoodleInfo["DoodleImgPath"]}
                height={125}
                width={125}
                alt="Selected Doodle Img"
                className="h-fit"
              />
              <ul className=" flex-col flex">
                {typeImgs}
              </ul>
            </div>

            <div className="flex flex-col w-2/3 h-full justify-evenly">
              <ul className="border-b-2 flex">
                <div className="border-r-2 flex justify-center w-2/12 text-md text-red-500">
                  4X
                </div>
                <div className="flex-1 flex-nowrap flex overflow-auto">
                  {quickSearchTypeHelper(4)}
                </div>
              </ul>
              <ul className="border-b-2 flex">
                <div className="border-r-2 flex justify-center w-2/12 text-md text-red-200">
                  2X
                </div>
                <div className="flex-1 flex-nowrap flex overflow-auto">
                  {quickSearchTypeHelper(2)}
                </div>
              </ul>
              <ul className="border-b-2 flex">
                <div className="border-r-2 flex justify-center w-2/12 text-md text-white">
                  1X
                </div>
                <div className="flex-1 flex-nowrap flex overflow-auto">
                  {quickSearchTypeHelper(1)}
                </div>
              </ul>
              <ul className="border-b-2 flex">
                <div className="border-r-2 flex justify-center w-2/12 text-md text-green-100">
                  0.5X
                </div>
                <div className="flex-1 flex-nowrap flex overflow-auto">
                  {quickSearchTypeHelper(0.5)}
                </div>
              </ul>
              <ul className="border-b-2 flex">
                <div className="border-r-2 flex justify-center w-2/12 text-md text-green-300">
                  0.25X
                </div>
                <div className="flex-1 flex-nowrap flex overflow-auto">
                  {quickSearchTypeHelper(0.25)}
                </div>
              </ul>
              <ul className="border-b-2 flex">
                <div className="border-r-2 flex justify-center  w-2/12 text-md text-green-500">
                  0X
                </div>
                <div className="flex-1 flex-nowrap flex overflow-auto">
                  {quickSearchTypeHelper(0)}
                </div>
              </ul>
            </div>
          </>
        ) : null}
      </section>
    </div>
  );
}

export default DoodleQuickSearch;
