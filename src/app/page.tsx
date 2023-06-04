// "use client";

import Link from "next/link";

// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { useGlobalContext, Crendetial } from "./context/UserContext";

export default function Home() {
  // const { pass, setPassword } = useGlobalContext();

  return (
    <div className="h-full flex items-center justify-center px-5 gap-5">
      <div className="h-full flex items-center justify-center gap-10 w-landingPageWidth">
        <div className="flex flex-col">
          <h1 className="font-bold animate-animfadeAbove text-4xl text-accent mb-2 text-center dark:text-secondary">
            Thoughts
          </h1>
          <div className="flex justify-between gap-4 text-secondary mb-3 w-buttonContainerWidth dark:text-primary font-bold">
            <Link
              href={"/"}
              className="animate-animfadeLeftSide flex-1 bg-accent dark:bg-secondary text-center p-3 shadow-leftButtonShadow shadow-primary dark:shadow-accent drop-shadow-2xl transition-all duration-300 ease-linear hover:shadow-none hover:bg-primary dark:hover:bg-accent dark:hover:text-secondary"
            >
              View
            </Link>
            <Link
              href={"/about"}
              className="animate-animfadeRightSide flex-1 bg-accent dark:bg-secondary text-center p-3 shadow-rightButtonShadow shadow-primary dark:shadow-accent drop-shadow-2xl transition-all duration-300 ease-linear hover:shadow-none hover:bg-primary dark:hover:bg-accent dark:hover:text-secondary"
            >
              About
            </Link>
          </div>
          <div className="animate-animfadeLeftSide flex flex-col w-letterWidth h-letterPageHeight justify-between bg-accent dark:bg-secondary text-secondary dark:text-primary mb-5 p-4 shadow-rightLetterShadow shadow-primary dark:shadow-accent drop-shadow-2xl transition-all duration-300 ease-linear hover:shadow-none hover:bg-primary dark:hover:bg-accent dark:hover:text-secondary">
            <div className="flex flex-col gap-2">
              <div className="text-lg">I miss her...</div>
              <div className="text-sm">
                Smell, touch, and everything. It’s just in my mind right now, I
                don’t know what to do without you.
              </div>
            </div>
            <div className="text-sm self-end justify-self-end">
              by <strong>Anonymous</strong>
            </div>
          </div>
          <div className="animate-animfadeBelow text-accent text-sm text-center w-buttonContainerWidth dark:text-secondary">
            Is there a <strong>thought</strong> in your mind that you need to{" "}
            <strong>let it out?</strong>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="animate-animfadeAbove flex flex-col w-letterWidth h-letterPageHeight justify-between bg-accent dark:bg-secondary text-secondary dark:text-primary mb-5 p-4 shadow-leftLetterShadow shadow-primary dark:shadow-accent drop-shadow-2xl transition-all duration-300 ease-linear hover:shadow-none hover:bg-primary dark:hover:bg-accent dark:hover:text-secondary">
            <div className="flex flex-col gap-2">
              <div className="text-lg">Dear, Kicho...</div>
              <div className="text-sm">
                Hey just got out from work and I kind of miss your big ‘ol
                forehead! Haha! I wish I can see you more. I’ll miss you
              </div>
            </div>
            <div className="text-sm self-end justify-self-end">
              by <strong>Cel</strong>
            </div>
          </div>
          <div className="animate-animfadeRightSide flex flex-col w-letterLandScapeWidth h-letterLandScapeHeight justify-between bg-accent dark:bg-secondary text-secondary dark:text-primary mb-5 p-4 shadow-rightLetterShadow shadow-primary dark:shadow-accent drop-shadow-2xl transition-all duration-300 ease-linear hover:shadow-none hover:bg-primary dark:hover:bg-accent dark:hover:text-secondary">
            <div className="flex flex-col gap-2">
              <div className="text-lg">Yo yo yo, it’s hump day!</div>
              <div className="text-sm">
                What I need you to do is tag my three big friends
              </div>
            </div>
            <div className="text-sm self-end justify-self-end">
              by <strong>Barber</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
