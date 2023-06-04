"use client";

import { useState, useEffect } from "react";
import Switch from "react-switch";
import { useTheme } from "next-themes";
import Image from "next/image";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isChecked, setIsChecked] = useState(false);

  let storageTheme: string | null;

  if (typeof window !== "undefined") {
    storageTheme = localStorage.getItem("theme");
    !storageTheme && setTheme("light");
  }

  useEffect(() => {
    setMounted(true);
    if (storageTheme === "dark") {
      setTheme("dark");
      setIsChecked(true);
    } else {
      setTheme("light");
      setIsChecked(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex justify-end px-4 py-2 fixed right-0">
      <Switch
        checked={isChecked}
        onChange={() => {
          if (!isChecked) {
            localStorage.setItem("theme", "dark");
            setTheme("dark");
            setIsChecked(true);
            return;
          }

          localStorage.setItem("theme", "light");
          setTheme("light");
          setIsChecked(false);
        }}
        handleDiameter={20}
        offColor="#22293C"
        onColor="#364261"
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        uncheckedIcon={
          <Image fill src={"/moon.svg"} alt={"A moon icon"} className="p-1" />
        }
        checkedIcon={
          <Image fill src={"/sun.svg"} alt={"A sun icon"} className="p-1" />
        }
      />
    </div>
  );
};

export default ThemeSwitcher;
