import Image from "next/image";
import React, { useEffect } from "react";
import DoodleSearch from "./doodleSearch";

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

  useEffect(() => {
    if (hasPageBeenRendered.current["effect1"]) {
      setMatchingDoodle([]);
    }
    hasPageBeenRendered.current["effect1"] = true;
  }, [selectedDoodle]);

  return (
    <div className="bg-stone-600 flex flex-col basis-2/6 rounded-xl border-4 border-black m-2">
      <div>
        <DoodleSearch
          setSelectedDoodle={setSelectedDoodle}
          selectedDoodle={selectedDoodle}
          matchingDoodle={matchingDoodle}
          setSelectedDoodleInfo={setSelectedDoodleInfo}
          hasPageBeenRendered={hasPageBeenRendered}
          setMatchingDoodle={setMatchingDoodle}
        />
      </div>
      {selectedDoodleInfo ? (
        <>
          <div className="flex">
            <div>
              <Image
                src={selectedDoodleInfo["DoodleImgPath"]}
                height={160}
                width={160}
                alt="Selected Doodle Img"
              />
            </div>

            <div className="flex flex-1">
              <div className="flex flex-col">
                <details className="dropdown">
                  <summary className="m-1 border-4">Move</summary>
                  <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                    <li>
                      <a>Item 1</a>
                    </li>
                    <li>
                      <a>Item 2</a>
                    </li>
                  </ul>
                </details>
                <details className="dropdown">
                  <summary className="m-1 border-4">Move</summary>
                  <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                    <li>
                      <a>Item 1</a>
                    </li>
                    <li>
                      <a>Item 2</a>
                    </li>
                  </ul>
                </details>
                <details className="dropdown">
                  <summary className="m-1 border-4">Move</summary>
                  <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                    <li>
                      <a>Item 1</a>
                    </li>
                    <li>
                      <a>Item 2</a>
                    </li>
                  </ul>
                </details>
                <details className="dropdown">
                  <summary className="m-1 border-4">Move</summary>
                  <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                    <li>
                      <a>Item 1</a>
                    </li>
                    <li>
                      <a>Item 2</a>
                    </li>
                  </ul>
                </details>
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
