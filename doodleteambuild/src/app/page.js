import Image from "next/image";
import { Fredoka } from "next/font/google";

const fredoka = Fredoka({ weight: "700", subsets: ["latin"] });
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

const traitList = doodleTypes.map(doodle => <li className={`${fredoka.className} text-black badge-lg badge badge-neutraltext-xl basis-1/5 outline-4 ${doodle[1]}`} >{doodle[0]}</li>);

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-between bg-neutral-500">
      <header className="flex w-full justify-center items-center bg-neutral-700 h-28 shrink-0">
        <h1
          className={`${fredoka.className} text-white lg:text-5xl sm:text-xl`}
        >
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
              <p className={`${fredoka.className} text-white text-3xl flex justify-center`}>Team Defense</p>
              <div className="flex grow">
                <ul className="flex flex-wrap">{traitList}</ul>
              </div>
            </div>
            <div className="flex grow flex-col bg-stone-600 border-4 border-black rounded-2xl">
              <p className={`${fredoka.className} text-white text-3xl flex justify-center`}>Team Coverage</p>
              <div className="flex grow">
                <ul className="flex flex-wrap">{traitList}</ul>
              </div>
            </div>
          </section>
          <section className="flex-col justify-around flex shrink-0 basis-1/3">
            <div>
              <button>VIEW TYPE CHART</button>
              <button>QUICK LOOKUP</button>
            </div>

            <div>
              <button>Export a team</button>
              <button>Import a team</button>
            </div>

          </section>
        </section>
      </section>
    </main>
  );
}
