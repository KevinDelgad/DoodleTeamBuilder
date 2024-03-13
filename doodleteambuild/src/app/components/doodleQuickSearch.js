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
  return (
    <div className="lg:w-2/6 h-80 sm:w-1/2 w-full bg-neutral-600 flex flex-col items-center p-5 text-textGray rounded-3xl">
      <DoodleSearch
        setSelectedDoodle={setSelectedDoodle}
        selectedDoodle={selectedDoodle}
        matchingDoodle={matchingDoodle}
        setSelectedDoodleInfo={setSelectedDoodleInfo}
        hasPageBeenRendered={hasPageBeenRendered}
        setMatchingDoodle={setMatchingDoodle}
        hasBorder={true}
      />

      <section className="flex flex-1" id="searchedDoodle">
        {selectedDoodleInfo ? (
          <>
            <div className="flex flex-col">
              <Image
                src={selectedDoodleInfo["DoodleImgPath"]}
                height={125}
                width={125}
                alt="Selected Doodle Img"
                className="h-fit"
                />
                <ul className="justify-center flex ">{typeImgs}</ul>
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
                <h2 className="text-rose-400">super effective from (2x)</h2>
                <ul className="flex flex-wrap justify-center">
                  {quickSearchTypeHelper(2)}
                </ul>
              </div>
              <div className="flex items-center flex-col">
                <h2 className="text-white">moderately effective from (1x)</h2>
                <ul className="flex flex-wrap justify-center">
                  {quickSearchTypeHelper(1)}
                </ul>
              </div>
              <div className="flex items-center flex-col">
                <h2 className="text-green-200">not so effective from (1/2x)</h2>
                <ul className="flex flex-wrap justify-center">
                  {quickSearchTypeHelper(0.5)}
                </ul>
              </div>
              <div className="flex items-center flex-col">
                <h2 className="text-green-300">
                  not so, so effective from (1/4x)
                </h2>
                <ul className="flex flex-wrap justify-center">
                  {quickSearchTypeHelper(0.25)}
                </ul>
              </div>
              <div className="flex items-center flex-col">
                <h2 className="text-green-500">no effect from (0x)</h2>
                <ul className="flex flex-wrap justify-center">
                  {quickSearchTypeHelper(0)}
                </ul>
              </div>
            </div>
          </>
        ) : null}
      </section>
    </div>
  );
}

export default DoodleQuickSearch;
