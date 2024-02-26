"use client";

import DoodleSelection from "./components/doodleSelection";
import DoodleQuickSearch from "./components/doodleQuickSearch";
import React, { useEffect } from "react";

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
    <main className="flex h-full flex-col items-center justify-between bg-neutral-500">
      <header className="flex w-full justify-center items-center bg-neutral-700 h-28">
        <h1 className={`text-white lg:text-5xl sm:text-3xl text-2xl`}>
          Doodle World Teambuilder
        </h1>
      </header>

      <section className="flex w-full h-full justify-between">
        <section className="flex basis-3/5">
          <section className="flex-1 flex">
            <div className="flex-col flex flex-1">
              <div className="bg-stone-600 flex basis-2/6 rounded-xl border-4 border-black m-2">
                <DoodleSelection Doodle="a" />
              </div>
              <div className="bg-stone-600 flex basis-2/6 rounded-xl border-4 border-black m-2">
                <p>placeholder</p>
              </div>
              <div className="bg-stone-600 flex basis-2/6 rounded-xl border-4 border-black m-2">
                <p>placeholder</p>
              </div>
            </div>
          </section>

          <section className="flex-1 flex">
            <div className="flex-col flex flex-1">
              <div className="bg-stone-600 flex basis-2/6 rounded-xl border-4 border-black m-2">
                <p>placeholder</p>
              </div>
              <div className="bg-stone-600 flex basis-2/6 rounded-xl border-4 border-black m-2">
                <p>placeholder</p>
              </div>
              <div className="bg-stone-600 flex basis-2/6 rounded-xl border-4 border-black m-2">
                <p>placeholder</p>
              </div>
            </div>
          </section>
        </section>

        <section className="flex basis-2/5 flex-col items-center">
          <section className="flex flex-col basis-2/3 justify-around">
            <div className="flex basis-1/2 flex-col bg-stone-600 border-4 border-black rounded-xl m-1">
              <p className={` text-white text-3xl flex justify-center`}>
                Team Defense
              </p>
              <div className="flex grow">
                <ul className="flex flex-wrap p-5">{traitList}</ul>
              </div>
            </div>
            <div className="flex basis-1/2 flex-col bg-stone-600 border-4 border-black rounded-xl m-1">
              <p className={` text-white text-3xl flex justify-center`}>
                Team Coverage
              </p>
              <div className="flex grow">
                <ul className="flex flex-wrap p-5">{traitList}</ul>
              </div>
            </div>
          </section>
          <section className="flex-col flex-1 justify-around flex basis-1/3">
            <div className="flex flex-1 flex-col justify-evenly">
              <button className="btn">VIEW TYPE CHART</button>
              <button
                className="btn"
                onClick={() =>
                  document.getElementById("quickLookMod").showModal()
                }
              >
                QUICK LOOKUP
              </button>
              <DoodleQuickSearch />
            </div>

            <div className="flex flex-1 flex-col justify-evenly">
              <button className="btn">Export a team</button>
              <button className="btn">Import a team</button>
            </div>
          </section>
        </section>
      </section>
    </main>
  );
}
