import { createContext, useContext, useState } from "react";
import { userService } from "../services/userService";
import { User } from "../models/User";


interface AuthContextType {
  user: User | null;
  loginWithCredentials: (email: string, password: string) => { success: boolean; message: string };
  signupWithCredentials: (name: string, phone: string, username: string,  email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  // const [isLoggedIn, setIsLoggedIn] = useState(false)

  const loginWithCredentials = (email: string, password: string) => {
    const result = userService.login(email, password);
    if (result.success && result.user) {
      setUser(result.user);
    }
    return { success: result.success, message: result.message };
  };

  const signupWithCredentials = (name: string, phone: string, username: string,  email: string, password: string) => {
    const result = userService.signup({ name, phone, username,  email, password });
    // if (result.success) {
    //   const loginResult = userService.login(email, password);
    //   if (loginResult.success && loginResult.user) {
    //     setUser(loginResult.user);
    //   }
    // }
    return { success: result.success, message: result.message };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithCredentials,
        signupWithCredentials,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
