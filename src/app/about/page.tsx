import Image from "next/image";
import { FaGithub } from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="h-full flex flex-col justify-center py-2">
      <div className="h-full flex gap-16 justify-center items-center px-10 flex-1">
        <Image
          src={"/LateAtNight.svg"}
          alt="Staring at the window"
          width={400}
          height={400}
          className="animate-animfadeLeftSide"
        />

        <div className="animate-animfadeRightSide flex flex-col bg-accent text-secondary gap-2 p-4 h-letterPageHeight dark:bg-secondary dark:text-primary mb-5  shadow-rightLetterShadow shadow-primary dark:shadow-accent drop-shadow-2xl transition-all duration-300 ease-linear hover:shadow-none hover:bg-primary dark:hover:bg-accent dark:hover:text-secondary">
          <div className="text-3xl">
            What is this all <strong>about?</strong>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-xl">
              First of all it’s because I want to <strong>learn</strong> and{" "}
              <strong>apply</strong> on what I studied. But I also do have a
              thought in my mind that I really need to let it out.
            </div>
            <div className="text-xl">
              And I want to share it with you. We all have those thoughts that
              we need to <strong>let it all out</strong>.
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-8 justify-center">
        <a
          href="https://github.com/marcelee0713"
          className="flex items-center justify-center gap-2 group text-primary dark:text-secondary"
        >
          <FaGithub
            size={30}
            className="duration-300 ease-in-out group-hover:rotate-360 animate-animfadeLeftSide"
          />
          <div className="duration-300 ease-in-out group-hover:underline animate-animfadeRightSide">
            Marcel
          </div>
        </a>
      </div>
    </div>
  );
}
