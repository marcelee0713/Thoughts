"use client";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BsExclamationTriangleFill } from "react-icons/bs";
import { AiFillCheckCircle } from "react-icons/ai";
import { PostType } from "@/models/post-user";
import { useGlobalContext } from "../context/UserContext";
import { useRouter, useSearchParams } from "next/navigation";

export const metadata = {
  title: "Thoughts | Edit",
  description: "Is there something on your mind lately?",
};

export default function Page() {
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [success, setSuccess] = useState(false);

  const [passErr, setPassErr] = useState(false);
  const [showContentErr, setContentError] = useState(false);

  const router = useRouter();
  const params = useSearchParams();
  const currentId = params.get("id");
  const currentNickname = params.get("nickname");
  const currentContent = params.get("content");
  const currentPassword = params.get("password");

  const { setPassword } = useGlobalContext();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const nickname = !formData.get("nickname")
      ? "Anonymous"
      : formData.get("nickname")?.toString().trim();
    const password = formData.get("password")?.toString().trim();
    const content = formData.get("content")?.toString().trim();

    if (password === "") {
      setPassErr(true);
    } else if (password!.length < 6) {
      setPassErr(true);
    } else {
      setPassErr(false);
    }

    if (content === "") {
      setContentError(true);
      return;
    } else {
      setContentError(false);
    }

    if (!passErr && !showContentErr) {
      try {
        setIsLoading(true);
        setHasError(false);

        const response = await fetch("/api/write", {
          body: JSON.stringify({
            id: currentId,
            content: content,
            nickname: nickname,
            password: password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
        });
        const user: PostType = await response.json();
        setPassword(user.password);
        setSuccess(true);

        setTimeout(() => {
          router.back();
          router.refresh();
        }, 2000);
      } catch (e) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <div className="h-full w-full justify-center flex flex-col">
      <div className="h-fit w-full items-center flex gap-16 px-20 md:gap-8 sm:gap-4 lg:flex-col md:px-10 sm:px-5">
        <Image
          src={"/CountingStars.svg"}
          alt="2 guys staring at the stars"
          width={400}
          height={400}
          className="animate-animfadeLeftSide"
        />

        {isLoading && (
          <div className="w-full flex flex-col items-center justify-center bg-accent text-secondary p-4 h-letterPageHeight dark:bg-secondary dark:text-primary mb-5  shadow-rightLetterShadow shadow-primary dark:shadow-accent drop-shadow-2xl transition-colors duration-300">
            <Image
              src={"/loading.svg"}
              alt="A loading screen"
              width={100}
              height={100}
              className="animate-spin"
            />
          </div>
        )}

        {success && (
          <div className="w-full flex flex-col items-center justify-center bg-accent text-secondary p-4 h-letterPageHeight dark:bg-secondary dark:text-primary mb-5  shadow-rightLetterShadow shadow-primary dark:shadow-accent drop-shadow-2xl transition-colors duration-300">
            <AiFillCheckCircle size={50} />
            <div className="flex flex-col gap-2 items-center">
              <div>
                <strong>Edit Success</strong>
              </div>
              <div>Redirecting you back...</div>
            </div>
          </div>
        )}

        {hasError && (
          <div className="w-full flex flex-col items-center justify-center bg-accent text-secondary p-4 h-letterPageHeight dark:bg-secondary dark:text-primary mb-5  shadow-rightLetterShadow shadow-primary dark:shadow-accent drop-shadow-2xl transition-colors duration-300">
            <BsExclamationTriangleFill size={50} />
            <div className="flex flex-col gap-2 items-center">
              <div className="flex flex-col items-center">
                <div>
                  <strong>Error</strong>
                </div>
                <div>Something went wrong please try again later!</div>
              </div>

              <button
                onClick={() => {
                  setIsLoading(false);
                  setHasError(false);
                  setVisible(false);
                }}
                className={`w-buttonWidth font-bold text-primary dark:text-secondary bg-secondary dark:bg-accent text-center p-3 shadow-rightButtonShadow shadow-primary drop-shadow-2xl transition-all duration-300 ease-linear hover:shadow-none hover:text-secondary hover:bg-primary dark:hover:bg-primary dark:hover:text-secondary`}
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {!hasError && !isLoading && !success && (
          <div className="animate-animfadeRightSide w-full flex flex-col bg-accent text-secondary p-4 dark:bg-secondary dark:text-primary mb-5  shadow-rightLetterShadow shadow-primary dark:shadow-accent drop-shadow-2xl transition-colors duration-300">
            <div className="flex-1 flex flex-col gap-5">
              <div className="text-3xl font-bold md:text-xl sm:text-base">
                Edit
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <label className="md:text-sm">
                    Edit your <strong>nickname?</strong>
                  </label>
                  <input
                    name="nickname"
                    type="text"
                    className={`flex-1 border border-secondary outline-none bg-accent p-2 dark:bg-secondary dark:border-primary dark:text-primary md:text-sm`}
                    maxLength={15}
                    defaultValue={currentNickname ? currentNickname : ""}
                  ></input>
                  <div className="text-secondary opacity-50 text-sm dark:text-primary italic md:text-xs">
                    You can leave this blank again
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="flex gap-1 items-center md:text-sm">
                    <div>
                      Edit your <strong>password?</strong>
                    </div>
                    <div className="text-xs text-red-400">
                      {passErr
                        ? "Input is required and password is not less than 6 characters"
                        : ""}
                    </div>
                  </label>
                  <div className="flex items-center relative">
                    <input
                      name="password"
                      type={!visible ? "password" : "text"}
                      className={`flex-1 border border-secondary outline-none bg-accent p-2 dark:bg-secondary dark:border-primary dark:text-primary md:text-sm`}
                      minLength={6}
                      maxLength={20}
                      defaultValue={currentPassword ? currentPassword : ""}
                    ></input>
                    {!visible ? (
                      <FaEyeSlash
                        size={30}
                        className="absolute right-0 cursor-pointer mr-2 scale-90 transition-transform duration-500 hover:scale-100"
                        onClick={() => setVisible(true)}
                      />
                    ) : (
                      <FaEye
                        size={30}
                        className="absolute right-0 cursor-pointer mr-2 scale-90 transition-transform duration-500 hover:scale-100"
                        onClick={() => setVisible(false)}
                      />
                    )}
                  </div>
                  <div className="text-secondary opacity-50 text-sm dark:text-primary italic md:text-xs">
                    Again, Do not share this. This is when you can
                    <strong> edit</strong> and <strong>delete</strong> your
                    post.
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="flex gap-1 items-center">
                    <div className="font-bold md:text-sm">Let it all out</div>
                    <div className="text-xs text-red-400">
                      {showContentErr ? "Input is required!" : ""}
                    </div>
                  </label>
                  <textarea
                    rows={3}
                    name="content"
                    className={`border border-secondary outline-none bg-accent p-2 dark:bg-secondary dark:border-primary dark:text-primary md:text-sm`}
                    maxLength={1000}
                    defaultValue={currentContent ? currentContent : ""}
                  ></textarea>
                  <div className="text-secondary opacity-50 text-sm dark:text-primary italic">
                    Same information as before. It’s 2023
                  </div>
                </div>

                <button
                  type="submit"
                  className={`self-end md:w-20 sm:mb-2 w-buttonWidth font-bold text-primary dark:text-secondary bg-secondary dark:bg-accent text-center p-3 shadow-rightButtonShadow shadow-primary drop-shadow-2xl transition-all duration-300 ease-linear hover:shadow-none hover:text-secondary hover:bg-primary dark:hover:bg-primary dark:hover:text-secondary`}
                >
                  Submit
                </button>
              </form>
            </div>
            <div
              onClick={() => {
                router.refresh();
                router.back();
              }}
              className="self-center hover:underline cursor-pointer md:text-sm sm:text-xs"
            >
              I’ve changed my mind.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
