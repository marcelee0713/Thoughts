"use client";
import { PostType } from "@/models/post-user";
import Image from "next/image";
import { ButtonLS } from "./button";
import { useGlobalContext } from "@/app/context/UserContext";
import { BsExclamationTriangleFill, BsTrash3Fill } from "react-icons/bs";
import { AiFillCheckCircle, AiFillEdit } from "react-icons/ai";
import { useState } from "react";
import { useRouter } from "next/navigation";

export type ThoughtBoxType = {
  post: PostType;
  editCB: Function;
  animDelay: string;
};

export function ThoughtBox(letter: ThoughtBoxType) {
  const { pass } = useGlobalContext();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();

  const secretPass = process.env.NEXT_PUBLIC_ADMIN_PASS;

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
        {(pass?.password === secretPass ||
          pass?.password === letter.post.password) && (
          <div className="flex gap-2">
            <AiFillEdit
              size={15}
              className="cursor-pointer duration-300 ease-in-out hover:scale-105"
              onClick={() => letter.editCB()}
            />
            <BsTrash3Fill
              size={15}
              className="cursor-pointer duration-300 ease-in-out hover:scale-105"
              onClick={() => {
                setModal(true);
              }}
            />
          </div>
        )}

        <div>
          by <strong>{letter.post.nickname}</strong>
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-secondary text-primary dark:bg-primary dark:text-secondary flex flex-col gap-2 justify-center items-center text-sm px-3 py-4">
          <Image
            src={"/loading.svg"}
            alt="Guy throwing Trash"
            width={50}
            height={50}
            className="animate-spin bg-secondary dark:bg-primary"
          />
        </div>
      )}

      {error && (
        <div className="fixed inset-0 bg-secondary text-primary dark:bg-primary dark:text-secondary flex flex-col gap-2 justify-center items-center text-sm px-3 py-4">
          <div className="flex flex-col gap-2 flex-1 justify-center items-center">
            <BsExclamationTriangleFill size={50} />
            <div className="animate-animfadeRightSide text-sm text-center">
              Something went wrong!
            </div>
            <ButtonLS
              text="Try again"
              callback={async () => {
                setModal(true);
                setError(false);
                setSuccess(false);
                setLoading(false);
              }}
            />
          </div>
        </div>
      )}

      {success && (
        <div className="w-full flex flex-col items-center justify-center bg-accent text-secondary p-4 h-letterPageHeight dark:bg-secondary dark:text-primary mb-5  shadow-rightLetterShadow shadow-primary dark:shadow-accent drop-shadow-2xl transition-colors duration-300">
          <AiFillCheckCircle size={50} />
          <div className="flex flex-col gap-2 items-center">
            <div>
              <strong>Success</strong>
            </div>
            <div>Reloading...</div>
          </div>
        </div>
      )}

      {modal && !loading && !success && !error && (
        <div className="fixed inset-0 bg-secondary text-primary dark:bg-primary dark:text-secondary flex flex-col gap-2 justify-center items-center text-sm px-3 py-4">
          <div className="flex flex-col gap-2 flex-1 justify-center items-center">
            <Image
              src={"/ThrowingTrash.svg"}
              alt="Guy throwing Trash"
              width={150}
              height={150}
              className="animate-animfadeLeftSide bg-secondary dark:bg-primary"
            />
            <div className="animate-animfadeRightSide text-sm text-center">
              Are you sure you want to delete this post?
            </div>
            <ButtonLS
              text="Yes"
              callback={async () => {
                try {
                  setLoading(true);
                  setError(false);
                  await fetch("/api/thoughtbox?id=" + letter.post.id, {
                    method: "DELETE",
                  });
                  router.refresh();
                  setModal(false);
                } catch (e) {
                  setError(true);
                } finally {
                  setLoading(false);
                }
              }}
            />
          </div>
          <div
            onClick={() => {
              setModal(false);
            }}
            className="self-center hover:underline cursor-pointer animate-animfadeBelow"
          >
            I’ve changed my mind.
          </div>
        </div>
      )}
    </div>
  );
}
