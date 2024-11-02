// GuesserContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import cars from '../../database/cars';
// 1. Create a Context
const GuesserContext = createContext();

// 2. Create a Provider component
export const GuesserProvider = ({ children }) => {
  // Initialize the context values with useState hooks
  const [carId, setCarId] = useState(Math.floor(Math.random() * cars.length));        // Default to `null` or a specific ID if needed
  const [currentMode, setCurrentMode] = useState(1); // Initialize currentMode, e.g., 'default'
  const [points, setPoints]= useState(Number(localStorage.getItem("points")) ?? 0)

  function changeCar ()  {
    const newId = Math.floor(Math.random() * cars.length)
      setCarId((prev) =>  prev === newId ? newId + 1 : newId)
  }

  function addPoint(){
    setPoints(prev=>parseInt(prev+1));
  }
  function addScore(n){
    setPoints(prev=>parseInt(prev+parseInt(n)));
  }

  useEffect(()=>{localStorage.setItem("points",points)},[points])

  return (
    <GuesserContext.Provider value={{ carId, changeCar, currentMode, setCurrentMode , points, addPoint, addScore}}>
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
