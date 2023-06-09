"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BsExclamationTriangleFill } from "react-icons/bs";
import { AiFillCheckCircle } from "react-icons/ai";
import { PostUser } from "@/models/post-user";
import { useGlobalContext } from "../context/UserContext";
import { useRouter } from "next/navigation";

export default function PasswordPage() {
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const { pass, setPassword } = useGlobalContext();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get("query")?.toString().trim();

    if (query) {
      try {
        setIsLoading(true);
        setHasError(false);

        const response = await fetch("/api/password?query=" + query);
        const user: PostUser = await response.json();

        if (!user.password) {
          throw new Error("Error, doesn't exist");
        }

        setPassword(user.password);
        setSuccess(true);
        setTimeout(() => router.replace("/thoughts"), 2000);
      } catch (e) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    } else {
      return;
    }
  }

  return (
    <div className="h-full w-full justify-center flex flex-col py-2">
      <div className="h-fit w-full items-center flex gap-16 px-20 md:p-10 sm:p-5 lg:flex-col">
        <Image
          src={"/PasswordPost.svg"}
          alt="Staring at the window"
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
                <strong>Success</strong>
              </div>
              <div>Redirecting you to people’s thoughts...</div>
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
                <div>
                  Post <strong>does not exist!</strong>
                </div>
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
          <div className="animate-animfadeRightSide w-full flex flex-col bg-accent text-secondary p-4 h-letterPageHeight dark:bg-secondary dark:text-primary mb-5  shadow-rightLetterShadow shadow-primary dark:shadow-accent drop-shadow-2xl transition-colors duration-300">
            <div className="flex-1 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <div className="text-3xl font-bold md:text-xl sm:text-base">
                  Have a password for your posts?
                </div>
                <div className="text-xl md:text-base sm:text-sm">
                  So you can edit or delete <strong>your</strong> posts.
                </div>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className="flex items-center relative">
                  <input
                    name="query"
                    type={!visible ? "password" : "text"}
                    className={`flex-1 border border-secondary outline-none bg-accent p-2 dark:bg-secondary dark:border-primary dark:text-primary md:text-sm sm:text-xs`}
                    maxLength={20}
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

                <button
                  type="submit"
                  className={`self-end w-buttonWidth sm:w-20 font-bold text-primary md:text-sm sm:text-xs dark:text-secondary bg-secondary dark:bg-accent text-center p-3 shadow-rightButtonShadow shadow-primary drop-shadow-2xl transition-all duration-300 ease-linear hover:shadow-none hover:text-secondary hover:bg-primary dark:hover:bg-primary dark:hover:text-secondary`}
                >
                  Submit
                </button>
              </form>
            </div>
            <Link
              href="/thoughts"
              className="self-center hover:underline md:text-sm sm:text-xs"
              onClick={() => setPassword("")}
            >
              No, I don’t have one
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
