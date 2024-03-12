"use client";

import DoodleSelection from "./components/doodleTeamMember";
import DoodleQuickSearch from "./components/doodleQuickSearch";
import TeamBar from "./components/mobileDoodleTeamBar";
import React, { useEffect, useState } from "react";
import StatDisplay from "./components/statDisplay";
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

  const [doodleTeam, setDoodleTeam] = useState({
    Member0: {
      doodle:null,
      type:null,
      moveOne: null,
      moveTwo: null,
      moveThree: null,
      moveFour: null,
      heldItem: null,
      trait: null,
      imgPath: null
    },
    Member1: {
      doodle:null,
      type:null,
      moveOne: null,
      moveTwo: null,
      moveThree: null,
      moveFour: null,
      heldItem: null,
      trait: null,
      imgPath: null
    },
    Member2: {
      doodle:null,
      type:null,
      moveOne: null,
      moveTwo: null,
      moveThree: null,
      moveFour: null,
      heldItem: null,
      trait: null,
      imgPath: null
    },
    Member3: {
      doodle:null,
      type:null,
      moveOne: null,
      moveTwo: null,
      moveThree: null,
      moveFour: null,
      heldItem: null,
      trait: null,
      imgPath: null
    },
    Member4: {
      doodle:null,
      type:null,
      moveOne: null,
      moveTwo: null,
      moveThree: null,
      moveFour: null,
      heldItem: null,
      trait: null,
      imgPath: null
    },
    Member5: {
      doodle:null,
      type:null,
      moveOne: null,
      moveTwo: null,
      moveThree: null,
      moveFour: null,
      heldItem: null,
      trait: null,
      imgPath: null
    },
  });

  const [focusedMember, setFocusedMember] = useState("Member0");

  // Trait list Creator
  const traitList = doodleTypes.map((doodle) => (
    <li
      key={doodle}
      className={`text-black badge-lg badge badge-neutral text-xl basis-1/4 outline-4 ${doodle[1]}`}
    >
      {doodle[0]}
    </li>
  ));

  useEffect(()=>{
    console.log(doodleTeam)
  }, [doodleTeam])

  return (
    <main className="flex h-full flex-col items-center">
      <header className="flex w-full bg-neutral-700 justify-center">
        <h1
          className={`text-white lg:text-5xl text-3xl h-24 flex items-center`}
        >
          Doodle World Teambuilder
        </h1>
      </header>
      <div className="px-1.5 w-full h-full">
        <TeamBar doodleTeam={doodleTeam} setFocusedMember={setFocusedMember} />
        <DoodleSelection teamMember={focusedMember} doodleTeam={doodleTeam} setDoodleTeam={setDoodleTeam} />
        <StatDisplay />
      </div>
    </main>
  );
}
