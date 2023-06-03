"use client";

//prettier-ignore
import {createContext, useState, ReactNode,} from "react"

type Crendetial = null | { password: string };
type CredentialTypes = {
  pass: Crendetial;
  setPassword: (s: string) => void;
};

export const UserContext = createContext<CredentialTypes>({
  pass: null,
  setPassword: (s: string) => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [pass, setPass] = useState<Crendetial>(null);
  return (
    <UserContext.Provider
      value={{
        pass,
        setPassword: async (p: string) => {
          // TODO: Make an API Route Handler for this
          // Check if the "password" does exist in the db
          // If he did
          // setPass({ password: "password" });
          //If he didn't return an error
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
