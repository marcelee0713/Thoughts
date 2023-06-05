import { ThoughtBox } from "@/components/thoughtbox";
import { PostType } from "@/models/post-user";
import { ButtonLS } from "@/components/button";
import Image from "next/image";
import { prisma } from "@/db";

export default async function ThoughtsPage() {
  const posts: PostType[] = await prisma.post.findMany().catch((e) => {
    throw Error("Something went wrong! Error message: " + e);
  });

  let delayIncrement = 200;

  return (
    <div className="h-full flex flex-col px-20 py-10 gap-10">
      <div className="flex flex-col gap-3 animate-animfadeLeftSide">
        <h1 className="font-bold text-3xl text-primary dark:text-secondary">
          People’s thoughts
        </h1>
        <div className="flex flex-col gap-1 text-primary dark:text-secondary">
          <div className="text-sm">
            Where people share their thoughts or even their confessions.
          </div>
          <div className="text-sm">Would you like to write and share one?</div>
        </div>
        <ButtonLS
          callback={async () => {
            "use server";
          }}
          text="Write"
        />
      </div>

      <div className="flex-1 grid grid-cols-myGridTemplate gap-10">
        {posts.length !== 0 ? (
          posts.map((post, i) => (
            <ThoughtBox
              key={i}
              deleteCB={async () => {
                "use server";
              }}
              editCB={async () => {
                "use server";
              }}
              post={post}
              animDelay={(delayIncrement += 200).toString()}
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
            <div className="animate-animfadeBelow text-primary dark:text-secondary">
              The post is currently <strong>empty</strong>, like me.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
