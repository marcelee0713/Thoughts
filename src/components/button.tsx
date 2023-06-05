"use client";
type Button = {
  text: string;
  callback: Function;
};

export function ButtonLS(b: Button) {
  return (
    <button
      onClick={() => b.callback()}
      className={`w-buttonWidth font-bold text-secondary dark:text-primary bg-accent dark:bg-secondary text-center p-3 shadow-leftButtonShadow shadow-primary dark:shadow-accent drop-shadow-2xl transition-all duration-300 ease-linear hover:shadow-none hover:text-secondary hover:bg-primary dark:hover:bg-accent dark:hover:text-secondary`}
    >
      {b.text}
    </button>
  );
}
export function ButtonRS(b: Button) {
  return (
    <button
      onClick={b.callback()}
      className={`w-buttonWidth font-bold text-secondary dark:text-primary bg-accent dark:bg-secondary text-center p-3 shadow-rightButtonShadow shadow-primary dark:shadow-accent drop-shadow-2xl transition-all duration-300 ease-linear hover:shadow-none hover:text-secondary hover:bg-primary dark:hover:bg-accent dark:hover:text-secondary`}
    >
      {b.text}
    </button>
  );
}
