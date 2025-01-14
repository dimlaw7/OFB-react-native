import React, { createContext } from "react";

type authProps = {
  value: {};
  children: React.ReactNode;
};

export const AuthContext = createContext<{} | undefined>(undefined);

const AuthProvider = ({ children, value }: authProps) => {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
