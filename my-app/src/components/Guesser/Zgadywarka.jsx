import React, { useEffect } from 'react';
import { useGuesserContext } from './GuesserContextProvider';
import { useState } from 'react';
import './Guesser.css';
function Zgadywarka(){

    const { dataReady,carId , changeCar, addPoint, currentMode, addScore} = useGuesserContext();
    const [inputValue, setInputValue] = useState(0);
    const [doneFetching, setDoneFetching]= useState(false);
    const car={};
    
    const handleInputChange = (event) => {
        setInputValue(event.target.valueAsNumber); // Update the state with the input's current value
      };
      useEffect(() => {
        const loadImages = async () => {
          const requestUrl="/api/cars/"+carId;
          fetch(requestUrl).then(
            response => response.json()
           ).then(
            data=> car
           ).finally(
            setDoneFetching(true)
           )
        };
        loadImages();
      }, [dataReady]);

    function handleClick() {
        switch(currentMode){
            case 1:
                if(inputValue === car.price){
                    console.log("zabieraj tego szrota")
                    addPoint()
                }else{
                    console.log(inputValue < car.price ? "co tak malo panie":"ale zes sie dal na handlarzyka")
                }
            break;
            case 2:
                if(inputValue >= car.price){
                    console.log("zabieraj tego szrota")
                    addScore(inputValue-car.price)
                }else{
                    console.log(inputValue < car.price ? "co tak malo panie":"ale zes sie dal na handlarzyka")
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

    if(!doneFetching && !dataReady){
        return <p>Loading...</p>;
      }

    return (
        <div className='Zadywarka' style={{width:'30%'}}>
            <h1 id="tytul">{car.title}</h1>
                    <input 
                type="number" 
                value={inputValue} 
                onChange={handleInputChange} 
                className='BuyField'
            />
            <button className='BuyButton'onClick={handleClick}>Kup teraz</button>
            <p style={{ whiteSpace: 'pre-line', overflow: 'auto', height:'25em'}}>{car.desc}</p>
        </div>
    );
}
export default Zgadywarka;