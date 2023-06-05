"use client";

//prettier-ignore
import {createContext, useState, ReactNode, useContext} from "react"
import { ThemeProvider } from "next-themes";

export type Crendetial = null | { password: string };
type CredentialTypes = {
  pass: Crendetial;
  setPassword: (password: string) => void;
};

export const UserContext = createContext<CredentialTypes>({
  pass: null,
  setPassword: (password: string) => {},
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
          setPass({ password: p });
        },
      }}
    >
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </UserContext.Provider>
  );
};

export const useGlobalContext = () => useContext(UserContext);
