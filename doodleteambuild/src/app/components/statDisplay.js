import React, { useEffect, useState } from "react";
export default function StatDisplay() {
  const [defenseValues, setDefenseValues] = useState({
    Basic: 0,
    Fire: 0,
    Water: 0,
    Plant: 0,
    Spark: 0,
    Beast: 0,
    Air: 0,
    Insect: 0,
    Earth: 0,
    Mind: 0,
    Melee: 0,
    Food: 0,
    Light: 0,
    Crystal: 0,
    Metal: 0,
    Spirit: 0,
    Ice: 0,
    Dark: 0,
    Poison: 0,
    Mythic: 0,
  });
  const [coverageValues, setCoverageValues] = useState({
    Basic: 0,
    Fire: 0,
    Water: 0,
    Plant: 0,
    Spark: 0,
    Beast: 0,
    Air: 0,
    Insect: 0,
    Earth: 0,
    Mind: 0,
    Melee: 0,
    Food: 0,
    Light: 0,
    Crystal: 0,
    Metal: 0,
    Spirit: 0,
    Ice: 0,
    Dark: 0,
    Poison: 0,
    Mythic: 0,
  });

  const doodleTypes =
    {
      Basic: "bg-basic",
      Fire: "bg-fire",
      Water: "bg-water",
      Plant: "bg-plant",
      Spark: "bg-spark",
      Beast: "bg-beast",
      Air: "bg-air",
      Insect: "bg-insect",
      Earth: "bg-earth",
      Mind: "bg-mind",
      Melee: "bg-melee",
      Food: "bg-food",
      Light: "bg-light",
      Crystal: "bg-crystal",
      Metal: "bg-metal",
      Spirit: "bg-spirit",
      Ice: "bg-ice",
      Dark: "bg-dark",
      Poison: "bg-poison",
      Mythic: "bg-mythic",
    }
  ;
  const [selectedView, setSelectedView] = useState("Defense");

  const populateDefenseStats = Object.keys(
    selectedView === "Defense" ? defenseValues : coverageValues
  ).map((type) => (
    <li
      className="w-1/4 justify-center items-center flex flex-col text-white"
      key={type}
    >
      <div className={`text-white w-11/12 flex justify-center rounded-lg text-lg ${doodleTypes[type]} textOutline`} title={type}>{type}</div>
      {defenseValues[type]}
    </li>
  ));

  return (
    <div className="my-3">
      <div className="h-7 flex justify-evenly lg:hidden">
        <button
          className="bg-stone-600 w-1/3 rounded-t-md border-2 text-white"
          onClick={() => console.log("Defense Click!")}
        >
          Defense
        </button>

        <button
          className="bg-stone-600 w-1/3 rounded-t-md border-2 text-white"
          onClick={() => console.log("Coverage Click!")}
        >
          Coverage
        </button>
      </div>
      <div className="bg-stone-600 h-96 lg:h-full lg:py-2 lg:w-full rounded-xl border-4 px-5">
        <ul className="flex h-full flex-wrap">{populateDefenseStats}</ul>
      </div>
    </div>
  );
}
