// GuesserContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import {useNavigate} from 'react-router';
import axios from 'axios';

const GuesserContext = createContext();

// 2. Create a Provider component
export const GuesserProvider = ({ children }) => {

  const [totalCars,setTotalCars]=useState(0);
  useEffect(()=>{
    axios.get("/api/statistical").then(
      response => setTotalCars(response.data)
    ).catch(()=>{
      console.log("error fetching /api/statistical");
    })
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
    let url=`/api/cars/${carId}`
      axios.get(url).then(
        data => {
          setCarData(data.data)}
      ).finally(
        setDataReady(true)
    ).catch((err)=> console.log(err))
  },[carId])
  
  function changeCar ()  {
    const newId = Math.floor(Math.random() * totalCars)
      setCarId((prev) =>  prev === newId ? newId + 1 : newId)
  }

   function sendScore(){
    let prompt= window.prompt("Please enter your name");
    if(!prompt){
      return
    }
    prompt.slice(0,20);
    setUsername(prompt);
    const queryParams = new URLSearchParams({
      user: prompt,
      score: points,
      mode: currentMode,
      cheated: cheater
    });

    //console.log(queryParams)

    axios.post(`/api/submit-score/`, {
      user: prompt,
      mode: currentMode,
      score: points,
      cheated: cheater
    }).then(
      resp=>console.log(resp.data))
      .catch(err=>console.log(err))

  }

  function countAndCheck(){
    setCount(prev=> prev+1)
    //console.log("counted")
    checkEnd();
  }
  function checkEnd(){
    console.log(count)
    if(count>=5){
      navigate("/kontakt");
      sendScore();
      //console.log("Mode was: "+currentMode);
      //console.log("Score was: "+points);
      setPoints(0);
      setCount(0);
    }
  }

  function addPoint(){
    setPoints(prev=>parseInt(prev+1));
  }

  function addScore(n){
    setPoints(prev=>parseInt(prev+parseInt(n)));
  }

  useEffect(()=>{     //here to detect cheaters
    if(count!==1){
      setCheater(true);
      //console.log("cheater")
      //console.log(count)
    }
  },[currentMode])

  useEffect(()=>{localStorage.setItem("points",points)},[points])

  return (
    <GuesserContext.Provider value={{ dataReady, carData, changeCar, currentMode, setCurrentMode , points, addPoint, addScore, countAndCheck}}>
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
