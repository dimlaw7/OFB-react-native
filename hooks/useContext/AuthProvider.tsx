import React, { createContext, useContext } from "react";

type authProps = {
  value: AuthContextType;
  children: React.ReactNode;
};

interface AuthContextType {
  user: string;
  setUser: (value: string) => void;
  isLoggedIn: boolean;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  setIsLoggedIn: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AuthProvider = ({ children, value }: authProps) => {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useGlobalContext must be used within a Gobal provider");
  }

  return context;
};

export default AuthProvider;
