import React from 'react';
import { useGuesserContext } from './GuesserContextProvider';
import { useState } from 'react';
import './Guesser.css';
import cars from '../../database/cars';
function Zgadywarka(){
    // let tytulY=[
    //     'Ford Fusion 1.4 disel Rok 2005',//4800
    //     'Mercedes-Benz A160 1.6 B 102KM 2000 R KLIMA',//3900
    //     'Sprzedam Toyotę Yaris 1.3',//9600
    //     'Jaguar Type S-Type 3.0 okazja',//5900
    //     'Volkswagen Golv IV 2000 1.9 TDI 5D 110km -RATY-',//4500
    //     'Volkswagen polo 1.0',//1999
    //     'Peugeot 406 coupe 3.0 V6 (Do napraw wizualnych)',//8999
    //     'Mercedes W124 kombi 2.5D Klima',//4999
    //     'Ford Escort 1.6 + LPG 16V kabriolet z 1993 - Michael Schumacher',//5800
    //     'Seat Leon 1.6 + gaz',//5400
    //     'Mercedes CLK cabrio 230 Kompressor',//9500
    //     'Sprzedam skodę felicje',//2100
    //     'Audi 80 do renowacji 1979 rok możliwa zamiana',//7000
    //     'Sprzedam Audi a4b5 2.4v6',//9999
    //     'Fiat 126p 1997r dobry stan',//10 000
    //     'Ford Focus MK1 rok 1999',//2000
    //     'Skoda Felicia 1.3 Mpi',//3600
    //     'Peugeot 306 1.4 75KM Benzyna Bez rdzy',//2200
    //     'VW golf 3 syncro 4x4 2.0 benz 115KM 5 drzwi klima',//8200
    //     'Seat Ibiza 96 rocznik',//2750

    //     ];
    //     let ceny=[4800,3900,9600,5900,4500,1999,8999,4999,5800,5400,9500,2100,7000,9999,10000,2000,3600,2200,8200,2750];
    //     let marginesbledu = 1000;
    const { carId, changeCar, addPoint, currentMode, addScore} = useGuesserContext();
    const [inputValue, setInputValue] = useState(0);

    const handleInputChange = (event) => {
        setInputValue(event.target.valueAsNumber); // Update the state with the input's current value
      };

    function handleClick() {
        switch(currentMode){
            case 1:
                if(inputValue === cars[carId].price){
                    console.log("zabieraj tego szrota")
                    addPoint()
                }else{
                    console.log(inputValue < cars[carId].price ? "co tak malo panie":"ale zes sie dal na handlarzyka")
                }
            break;
            case 2:
                if(inputValue >= cars[carId].price){
                    console.log("zabieraj tego szrota")
                    addPoint()
                    addScore(inputValue-cars[carId].price)
                    //console.log(inputValue-cars[carId].price)
                }else{
                    console.log(inputValue < cars[carId].price ? "co tak malo panie":"ale zes sie dal na handlarzyka")
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


    return (
        <div className='Zadywarka' style={{width:'30%'}}>
            <h1 id="tytul">{cars[carId].title}</h1>
                    <input 
                type="number" 
                value={inputValue} 
                onChange={handleInputChange} 
                className='BuyField'
            />
            <button className='BuyButton'onClick={handleClick}>Kup teraz</button>
            <p style={{ whiteSpace: 'pre-line', overflow: 'auto', height:'25em'}}>{cars[carId].desc}</p>
        </div>
    );
}
export default Zgadywarka;