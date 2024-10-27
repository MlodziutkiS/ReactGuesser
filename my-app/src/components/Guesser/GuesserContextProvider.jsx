// GuesserContext.jsx
import React, { createContext, useState, useContext } from 'react';

// 1. Create a Context
const GuesserContext = createContext();

// 2. Create a Provider component
export const GuesserProvider = ({ children }) => {
  // Initialize the context values with useState hooks
  const [carId, setCarId] = useState(Math.floor(Math.random() * 20) + 1);        // Default to `null` or a specific ID if needed
  localStorage.setItem("points",0)
  const [currentMode, setCurrentMode] = useState(1); // Initialize currentMode, e.g., 'default'

  return (
    <GuesserContext.Provider value={{ carId, setCarId, currentMode, setCurrentMode }}>
      {children}
    </GuesserContext.Provider>
  );
};

// 3. Create a custom hook to use the context (optional)
export const useGuesserContext = () => {
  const context = useContext(GuesserContext);
  if (!context) {
    throw new Error("useGuesserContext must be used within a GuesserProvider");
  }
  return context;
};

export default GuesserContext;
