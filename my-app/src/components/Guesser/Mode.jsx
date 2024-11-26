import React from 'react';
import { useGuesserContext } from './GuesserContextProvider';
import '../Button/Button.css'
import './Mode.css'
const Mode = () => {
  const { carData, currentMode, setCurrentMode, changeCar } = useGuesserContext();
  const maxMode=3;
  function ModeLookup(){
    let output;
    if(currentMode==1){
      output="Strict";
    }else if(currentMode==2){
      output="Handlarzyk";
    }else{
      output="Jupi autka";
    }
    return output;
  }
  if(carData===undefined){
    return(<p>Loading...</p>);
  }
  return (
    <div className='ModeSelect'>
      <button className='mode-nav' style={{width:"5em"}} onClick={() => {currentMode==1? setCurrentMode(maxMode):setCurrentMode(currentMode-1); changeCar()}}>&lt;</button>
      <p>Car ID: {carData.id}<br/>Current Mode: {ModeLookup()} </p>
      <button className='mode-nav'  style={{width:"5em"}} onClick={() => {currentMode==maxMode? setCurrentMode(1):setCurrentMode(currentMode+1);changeCar()}}>&gt;</button>
    </div>
  );
};

export default Mode;
