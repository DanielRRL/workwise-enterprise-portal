
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

interface User {
  id: number;
  username: string;
  role: "admin" | "employee";
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check for existing session on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real application, this would be an API call
      // For now, we'll use a mock implementation
      if (!username || !password) {
        throw new Error("Username and password are required");
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let mockUser: User;
      
      if (username === "admin" && password === "admin") {
        mockUser = {
          id: 1,
          username: "admin",
          role: "admin",
          name: "Administrator"
        };
      } else if (username === "employee" && password === "employee") {
        mockUser = {
          id: 2,
          username: "employee",
          role: "employee",
          name: "John Doe"
        };
      } else {
        throw new Error("Invalid credentials");
      }
      
      localStorage.setItem("user", JSON.stringify(mockUser));
      localStorage.setItem("token", "mock-jwt-token-" + mockUser.role);
      setUser(mockUser);
      
      // Redirect based on user role
      if (mockUser.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/employee/profile");
      }
      
      toast.success("Login successful", {
        description: `Welcome back, ${mockUser.name}!`
      });
    } catch (error) {
      toast.error("Login failed", {
        description: error instanceof Error ? error.message : "An unknown error occurred"
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
