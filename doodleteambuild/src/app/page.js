import Image from "next/image";
import { Fredoka } from "next/font/google";

const fredoka = Fredoka({weight: '700', subsets: ['latin']})

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-between bg-neutral-500">
      <header className="flex w-full justify-center items-center bg-neutral-700 h-28">
        <h1 className={`${fredoka.className} text-white lg:text-5xl sm:text-xl`}>Doodle World Teambuilder</h1>
      </header>

      <section className="flex flex-1 w-full justify-between">
        <section className="flex basis-3/5">
          <p>placeholder</p>
        </section>

        <section className="flex basis-2/5 flex-col">
          <div>
            <p>Team Defense</p>
          </div>
          <div>
            <p>Team Coverage</p>
          </div>
        </section>

      </section>

    </main>
  );
}

/*

*/