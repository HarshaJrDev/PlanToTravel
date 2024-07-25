import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const login = async () => {
    setIsLoading(true);
    setUserToken("token");
    await AsyncStorage.setItem("token", "token");
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    setUserToken(null);
    await AsyncStorage.removeItem("token");
    setIsLoading(false);
  };

  const checkLoginStatus = async () => {
    try {
      setIsLoading(true);
      let token = await AsyncStorage.getItem("token");
      setUserToken(token);
      setIsLoading(false);
    } catch (error) {
      console.log(error, "Error");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
