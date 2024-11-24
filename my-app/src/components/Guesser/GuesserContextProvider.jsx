// GuesserContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import Mode from './Mode';

const GuesserContext = createContext();

// 2. Create a Provider component
export const GuesserProvider = ({ children }) => {

  const [totalCars,setTotalCars]=useState(0);
  useEffect(()=>{
    fetch("/api/statistical").then(
      response => response.json()
    ).then(
      data => setTotalCars(data)
    )
  },[])
  // Initialize the context values with useState hooks
  const [carId, setCarId] = useState(Math.floor(Math.random() * 20));        // Default to `null` or a specific ID if needed
  const [currentMode, setCurrentMode] = useState(1); // Initialize currentMode, e.g., 'default'
  const [points, setPoints]= useState(Number(localStorage.getItem("points")) ?? 0)
  const [count, setCount]=useState(1);
  const [carData, setCarData]=useState(undefined);
  const [dataReady, setDataReady]=useState(false);
  const [cheater, setCheater]=useState(undefined);
  const [user, setUsername]=useState(undefined);
  const navigate = useNavigate();

  useEffect(()=>{
    setDataReady(false);
    let url="/api/cars/"+carId
    fetch(url).then(
      response => response.json()
    ).then(
      data => setCarData(data)
    ).finally(
      setDataReady(true)
    )
  },[carId])
  
  function changeCar ()  {
    const newId = Math.floor(Math.random() * totalCars)
      setCarId((prev) =>  prev === newId ? newId + 1 : newId)
  }

  function sendScore(){
    let prompt= prompt("Please enter your name");
    setUsername(prompt);
    const queryParams = new URLSearchParams({
      user: user,
      score: points,
      mode: currentMode,
      cheated: cheater
    }).toString();

    fetch(`/api/submit-score?${queryParams}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(resp=>resp.json).then(d=>console.log(d))

  }

  function checkEnd(){
    if(count>=5){
      navigate("kontakt");
      sendScore();
      console.log("Mode was: "+currentMode);
      console.log("Score was: "+points);
      setPoints(0);
      setCount(0);
    }else{
      setCount(prev=>parseInt(prev+1));
    }
  }
  function addPoint(){
    setPoints(prev=>parseInt(prev+1));
    checkEnd();
  }
  function addScore(n){
    setPoints(prev=>parseInt(prev+parseInt(n)));
    checkEnd();
  }

  useEffect(()=>{     //here to detect cheaters *review
    if(points!==0){
      setCheater(true);
    }
  },[currentMode])

  useEffect(()=>{localStorage.setItem("points",points)},[points])

  return (
    <GuesserContext.Provider value={{ dataReady, carData, changeCar, currentMode, setCurrentMode , points, addPoint, addScore}}>
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
