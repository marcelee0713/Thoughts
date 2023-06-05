"use client";
import { PostType } from "@/models/post-user";
import { useGlobalContext } from "@/app/context/UserContext";
import { BsTrash3Fill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

export type ThoughtBoxType = {
  post: PostType;
  deleteCB: Function;
  editCB: Function;
  animDelay: string;
};

export function ThoughtBox(letter: ThoughtBoxType) {
  const { pass } = useGlobalContext();

  return (
    <div
      className={`duration group alt-animate flex flex-col h-letterPageHeight justify-between bg-accent dark:bg-secondary text-secondary dark:text-primary mb-5 p-4 shadow-leftLetterShadow shadow-primary dark:shadow-accent drop-shadow-2xl transition-all duration-300 ease-linear hover:shadow-none hover:bg-primary dark:hover:bg-accent dark:hover:text-secondary`}
      style={{
        animationDuration: letter.animDelay + "ms",
      }}
    >
      <div className="text-sm overflow-scroll no-scrollbar overflow-y-auto fade flex-1  ">
        {letter.post.content}
      </div>
      <div className="flex justify-between text-sm group-hover:dark:text-secondary dark:text-primary">
        {pass?.password === letter.post.password && (
          <div className="flex gap-2">
            <AiFillEdit
              size={15}
              className="cursor-pointer duration-300 ease-in-out hover:scale-105"
              onClick={() => letter.editCB()}
            />
            <BsTrash3Fill
              size={15}
              className="cursor-pointer duration-300 ease-in-out hover:scale-105"
              onClick={() => letter.deleteCB()}
            />
          </div>
        )}

        <div>
          by <strong>{letter.post.nickname}</strong>
        </div>
      </div>
    </div>
  );
}
