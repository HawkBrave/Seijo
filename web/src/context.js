import React, { useContext, useState } from "react";

const AuthContext = React.createContext(undefined);

export function AuthProvider({ children }) {
  const [ auth, setAuth ] = useState({ authenticated: false });
  const handleAuth = ({ username, token }, logout=false) => {
    if (auth.authenticated && logout) {
      setAuth({ authenticated: false });
    } else {
      setAuth({ authenticated: true, username, token });
    }
  }
  const intface = [auth, handleAuth];
  return <AuthContext.Provider value={ intface }>{ children }</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth can only be used inside AuthProvider");
  }
  return context;
}