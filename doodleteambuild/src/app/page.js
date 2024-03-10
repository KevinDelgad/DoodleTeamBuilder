"use client";

import DoodleSelection from "./components/doodleTeamMember";
import DoodleQuickSearch from "./components/doodleQuickSearch";
import TeamBar from "./components/mobileDoodleTeamBar";
import React, { useEffect, useState } from "react";

export default function Home() {
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

  const [doodleTeam, setDoodleTeam] = useState([
    "Pupskey",
    "-1",
    "-1",
    "-1",
    "-1",
    "-1",
  ]);
  const [focusedMember, setFocusedMember] = useState();

  // Trait list Creator
  const traitList = doodleTypes.map((doodle) => (
    <li
      key={doodle}
      className={`text-black badge-lg badge badge-neutral text-xl basis-1/4 outline-4 ${doodle[1]}`}
    >
      {doodle[0]}
    </li>
  ));

  return (
    <main className="flex h-full flex-col items-center">
      <header className="flex w-full justify-center items-center bg-neutral-700 h-20">
        <h1 className={`text-white lg:text-5xl text-3xl`}>
          Doodle World Teambuilder
        </h1>
      </header>
      <div className="px-1.5 w-full h-full">
        <TeamBar doodleTeam={doodleTeam} setFocusedMember={setFocusedMember} />
        <DoodleSelection/>
      </div>
    </main>
  );
}
