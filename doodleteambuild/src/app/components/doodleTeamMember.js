import Image from "next/image";
import React, { useEffect } from "react";
import DoodleSearch from "./doodleSearchBar";
import DoodleMoveSelect from "./moveSelectionBar";
import TraitBar from "./traitSelectionBar";
import HeldItem from "./itemSelectionBar";

function DoodleSelection({
  doodleInfo,
  teamMember,
  doodleTeam,
  setDoodleTeam,
}) {
  const doodleTypePath = "/typeImages/";

  const [selectedDoodle, setSelectedDoodle] = React.useState("");
  const [selectedDoodleInfo, setSelectedDoodleInfo] = React.useState();
  const [matchingDoodle, setMatchingDoodle] = React.useState([]);
  const hasPageBeenRendered = React.useRef({
    effect1: false,
    effect2: false,
    effect3: false,
    effect4: false,
  });

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

  function createNewObj(obj, changes, key) {
    if (changes) {
      const obj1 = {};
      const obj2 = {};
      let addToObj2 = false;
      let updatedObj = {
        [key]: {
          doodle: changes["Name"],
          type: changes["Types"],
          moveOne: null,
          moveTwo: null,
          moveThree: null,
          moveFour: null,
          heldItem: null,
          trait: null,
          imgPath: changes["DoodleImgPath"],
        },
      };

      for (const prop in obj) {
        if (prop === key) {
          addToObj2 = true;
          continue;
        }

        if (addToObj2) {
          obj2[prop] = obj[prop];
        } else {
          obj1[prop] = obj[prop];
        }
      }
      return { ...obj1, ...updatedObj, ...obj2 };
    } else {
      return doodleTeam;
    }
  }

  const typeImgs =
    doodleTeam[teamMember].doodle &&
    doodleTeam[teamMember].type.map((type) => (
      <li key={type}>
        <Image
          src={doodleTypePath + type.toLowerCase() + ".webp"}
          width={50}
          height={50}
          alt="Type Img"
        />
      </li>
    ));

  useEffect(() => {
    setDoodleTeam(createNewObj(doodleTeam, selectedDoodleInfo, teamMember));
  }, [selectedDoodleInfo]);

  useEffect(() => {
    if (hasPageBeenRendered.current["effect1"]) {
      setMatchingDoodle([]);
    }
    hasPageBeenRendered.current["effect1"] = true;
  }, [selectedDoodle]);


  //<ul className="flex flex-1 justify-evenly">{typeImgs}</ul>

  return (
    <div className="bg-stone-600 flex flex-col h-80 my-3 rounded-xl border-4 px-5">
      <div className="flex">
        <DoodleSearch
          setSelectedDoodle={setSelectedDoodle}
          selectedDoodle={selectedDoodle}
          matchingDoodle={matchingDoodle}
          setSelectedDoodleInfo={setSelectedDoodleInfo}
          hasPageBeenRendered={hasPageBeenRendered}
          setMatchingDoodle={setMatchingDoodle}
          prevDoodle={doodleTeam[teamMember]}
        />
      </div>
      {doodleTeam[teamMember].doodle ? (
        <>
          <div className="flex mt-5">
            <div className="w-2/5 flex flex-col items-center">
              <Image
                className="h-fit"
                src={doodleTeam[teamMember].imgPath}
                height={110}
                width={110}
                alt="Selected Doodle Img"
              />
              <div className="w-full">
                <ul className="flex flex-1 justify-evenly">{typeImgs}</ul>
              </div>
            </div>

            <div className="flex w-3/5">
              <div className="flex flex-col w-full">
                <div className="py-1">
                  <DoodleMoveSelect
                    doodleName={doodleTeam[teamMember].doodle}
                    hasPageBeenRendered={hasPageBeenRendered}
                    doodleTeam={doodleTeam}
                    setDoodleTeam={setDoodleTeam}
                    teamMember={teamMember}
                    moveNumber={"moveOne"}
                  />
                </div>
                <div className="py-1">
                  <DoodleMoveSelect
                    doodleName={doodleTeam[teamMember].doodle}
                    hasPageBeenRendered={hasPageBeenRendered}
                    doodleTeam={doodleTeam}
                    setDoodleTeam={setDoodleTeam}
                    teamMember={teamMember}
                    moveNumber={"moveTwo"}
                  />
                </div>
                <div className="py-1">
                  <DoodleMoveSelect
                    doodleName={doodleTeam[teamMember].doodle}
                    hasPageBeenRendered={hasPageBeenRendered}
                    doodleTeam={doodleTeam}
                    setDoodleTeam={setDoodleTeam}
                    teamMember={teamMember}
                    moveNumber={"moveThree"}
                  />
                </div>
                <div className="py-1">
                  <DoodleMoveSelect
                    doodleName={doodleTeam[teamMember].doodle}
                    hasPageBeenRendered={hasPageBeenRendered}
                    doodleTeam={doodleTeam}
                    setDoodleTeam={setDoodleTeam}
                    teamMember={teamMember}
                    moveNumber={"moveFour"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-5 justify-evenly">
            <HeldItem />
            <TraitBar />
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default DoodleSelection;
