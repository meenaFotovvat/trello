import React, { createContext, useState, useContext } from "react";

// Define the shape of the AuthContext using an interface
interface AuthContextProps {
  isAuthenticated: boolean; // Whether the user is logged in or not
  login: () => void;
  logout: () => void;
}

// Create an authentication context to store the user's authentication state
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// AuthProvider component to wrap the app and provide authentication functions
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulate login by setting authentication to true
  const login = () => setIsAuthenticated(true);

  // Simulate logout by setting authentication to false
  const logout = () => setIsAuthenticated(false);

  return (
    // Provide the login/logout functions and auth state to child components
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily access authentication context in any component
export const useAuth = () => {
  const context = useContext(AuthContext);

  // Ensure the hook is used inside an AuthProvider
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
