import React from 'react';
import { useGuesserContext } from './GuesserContextProvider';
import '../Button/Button.css'
import './Mode.css'
const Mode = () => {
  const { carId, setCarId, currentMode, setCurrentMode } = useGuesserContext();
  const maxMode=3;

  return (
    <div className='ModeSelect'>
      <button className='menu-nav' style={{width:"5em"}} onClick={() => currentMode==1? setCurrentMode(maxMode):setCurrentMode(currentMode-1)}>&lt;</button>
      <p>Car ID: {carId}<br/>Current Mode: {currentMode} </p>
      <button className='menu-nav'  style={{width:"5em"}} onClick={() => currentMode==maxMode? setCurrentMode(1):setCurrentMode(currentMode+1)}>&gt;</button>
    </div>
  );
};

export default Mode;
