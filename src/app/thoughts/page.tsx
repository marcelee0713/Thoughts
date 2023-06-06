import { ThoughtBox } from "@/components/thoughtbox";
import { PostType } from "@/models/post-user";
import Image from "next/image";
import { prisma } from "@/db";
import Link from "next/link";

export const revalidate = 0;

export default async function ThoughtsPage() {
  const posts: PostType[] = await prisma.post.findMany().catch((e) => {
    throw Error("Something went wrong! Error message: " + e);
  });

  let delayIncrement = 75;

  return (
    <div className="h-full flex flex-col px-20 py-10 gap-10 md:px-10 sm:px-5">
      <div className="flex flex-col gap-3 md:gap-2 sm:gap-1 animate-animfadeLeftSide">
        <h1 className="font-bold text-3xl text-primary dark:text-secondary sm:text-xl">
          People’s thoughts
        </h1>
        <div className="flex flex-col gap-1 text-primary dark:text-secondary">
          <div className="text-sm sm:text-xs">
            Where people share their thoughts or even their confessions.
          </div>
          <div className="text-sm sm:text-xs">
            Would you like to write and share one?
          </div>
        </div>
        <Link
          href={"/write"}
          className="w-buttonWidth sm:text-xs md:w-20 font-bold text-secondary dark:text-primary bg-accent dark:bg-secondary text-center p-3 shadow-leftButtonShadow shadow-primary dark:shadow-accent drop-shadow-2xl transition-all duration-300 ease-linear hover:shadow-none hover:text-secondary hover:bg-primary dark:hover:bg-accent dark:hover:text-secondary"
        >
          Write
        </Link>
      </div>

      <div className="flex-1 grid grid-cols-myGridTemplate gap-10">
        {posts.length !== 0 ? (
          posts.map((post, i) => (
            <ThoughtBox
              key={i}
              post={post}
              animDelay={(delayIncrement += 75).toString()}
            />
          ))
        ) : (
          <div className="flex-1 flex flex-col gap-5 justify-center items-center">
            <Image
              src={"/nodata.svg"}
              alt="Staring at the window"
              width={400}
              height={400}
              className="animate-animfadeAbove"
            />
            <div className="animate-animfadeBelow text-primary dark:text-secondary md:text-sm sm:text-xs">
              The feed is currently <strong>empty</strong>, like me.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
