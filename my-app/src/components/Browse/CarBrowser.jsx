import React, { useEffect, useState } from 'react';
import CarCard from './CarCard';

function CarBrowser(){
    const style={
        fontWeight:"500",
        fontSize:"2em",
        margin:"1em"
    }
    const [cars, setCars]=useState([]);
    const [totalCars, setTotalCars]=useState(null);
    const [doneFetching, setDoneFetching]= useState(false);
    useEffect(()=>{
       fetch("/api/statistical").then(
            response => response.json()
       ).then(
            data=> setTotalCars(data)
       )
       fetch("/api/cars").then(
        response => response.json()
       ).then(
        data =>
        setCars(data)
       ).finally(
        setDoneFetching(true)
       )
    },[])
    /*
    useEffect(()=>{
        let i=0;
        let requestUrl="/api/cars/"+i+"?short";
        fetch(requestUrl).then(response => response.json
        ).then(data => {
            setCars([...cars+data])
        })
    },totalCars)
    */ 
   if(!doneFetching){
    return <p>Loading...</p>;
   }
    return(
        <div>
            <p style={style}>Znaleźliśmy ponad {totalCars} ogłoszeń</p>
            {cars.map((car)=> <CarCard key={car.id} data={car}/>)}
        </div>
    );
}
export default CarBrowser;