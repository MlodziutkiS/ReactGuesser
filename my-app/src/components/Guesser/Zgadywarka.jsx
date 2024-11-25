import React, { useEffect } from 'react';
import { useGuesserContext } from './GuesserContextProvider';
import { useState } from 'react';
import './Guesser.css';
function Zgadywarka(){

    const { dataReady, carData , changeCar, addPoint, currentMode, addScore, countAndCheck} = useGuesserContext();
    const [inputValue, setInputValue] = useState(0);
 
    const handleInputChange = (event) => {
        setInputValue(event.target.valueAsNumber); // Update the state with the input's current value
      };

    function handleClick() {
        countAndCheck()
        switch(currentMode){
            case 1:
                if(inputValue === carData.price){
                    console.log("zabieraj tego szrota")
                    addPoint()
                }else{
                    console.log(inputValue < carData.price ? "co tak malo panie":"ale zes sie dal na handlarzyka")
                }
            break;
            case 2:
                if(inputValue >= carData.price){
                    console.log("zabieraj tego szrota")
                    addScore(inputValue-carData.price)
                }else{
                    console.log(inputValue < carData.price ? "co tak malo panie":"ale zes sie dal na handlarzyka")
                }
            break;
            case 3:
            break;
            default:
                console.log("no bueno mode set is bad plis fiks")
            break;
        }
        changeCar()
    }

    if(carData===undefined || !dataReady){
        return <p>Loading...</p>;
      }

    return (
        <div className='Zadywarka' style={{width:'30%'}}>
            <h1 id="tytul">{carData.title}</h1>
                    <input 
                type="number" 
                value={inputValue} 
                onChange={handleInputChange} 
                className='BuyField'
            />
            <button className='BuyButton'onClick={handleClick}>Kup teraz</button>
            <p style={{ whiteSpace: 'pre-line', overflow: 'auto', height:'25em'}}>{carData.desc}</p>
        </div>
    );
}
export default Zgadywarka;