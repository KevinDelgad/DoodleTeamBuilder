import Image from "next/image";
import React, { useEffect } from "react";
import DoodleSearch from "./doodleSearchBar";
import DoodleMoveSelect from "./moveSelectionBar";

function DoodleSelection({ doodleInfo }) {
  const doodleImgPath = "/doodleImages/";
  const doodleTypePath = "/typeImages/";

  const [selectedDoodle, setSelectedDoodle] = React.useState("");
  const [selectedDoodleInfo, setSelectedDoodleInfo] = React.useState();
  const [matchingDoodle, setMatchingDoodle] = React.useState([]);
  const hasPageBeenRendered = React.useRef({
    effect1: false,
    effect2: false,
    effect3: false,
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

  useEffect(() => {
    if (hasPageBeenRendered.current["effect1"]) {
      setMatchingDoodle([]);
    }
    hasPageBeenRendered.current["effect1"] = true;
  }, [selectedDoodle]);

  return (
    <div className="bg-stone-600 flex flex-col basis-2/6 rounded-xl border-4 border-black m-2 h-1/4">
      <div className="flex">
        <DoodleSearch
          setSelectedDoodle={setSelectedDoodle}
          selectedDoodle={selectedDoodle}
          matchingDoodle={matchingDoodle}
          setSelectedDoodleInfo={setSelectedDoodleInfo}
          hasPageBeenRendered={hasPageBeenRendered}
          setMatchingDoodle={setMatchingDoodle}
        />

        <ul className="flex flex-1 justify-evenly">{typeImgs}</ul>
      </div>
      {selectedDoodleInfo ? (
        <>
          <div className="flex">
            <div className="w-1/2 flex justify-center">
              <Image
                src={selectedDoodleInfo["DoodleImgPath"]}
                height={160}
                width={160}
                alt="Selected Doodle Img"
              />
            </div>

            <div className="flex w-1/2">
              <div className="flex flex-col w-full px-5">
                <DoodleMoveSelect
                  doodleName={selectedDoodleInfo["Name"]}
                  hasPageBeenRendered={hasPageBeenRendered}
                />
                <DoodleMoveSelect
                  doodleName={selectedDoodleInfo["Name"]}
                  hasPageBeenRendered={hasPageBeenRendered}
                />
                <DoodleMoveSelect
                  doodleName={selectedDoodleInfo["Name"]}
                  hasPageBeenRendered={hasPageBeenRendered}
                />
                <DoodleMoveSelect
                  doodleName={selectedDoodleInfo["Name"]}
                  hasPageBeenRendered={hasPageBeenRendered}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default DoodleSelection;
