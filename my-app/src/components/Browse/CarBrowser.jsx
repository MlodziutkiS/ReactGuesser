import React, { useEffect, useState } from 'react';
import CarCard from './CarCard';

function CarBrowser(){
    const style={
        fontWeight:"500",
        fontSize:"2em",
        margin:"1em"
    }
    const [cars, setCars]=useState([]);
    const totalCars=0;
    useEffect(()=>{
       fetch("/api/statistical").then(
        response => response.json()
       ).then(
        data=> totalCars
       )
       for (let i = 0; i < totalCars; i++){
        const requestUrl="/api/cars/"+i+"?short";
        let carFetch;
        fetch({requestUrl}).then(
            response => response.json()
           ).then(
            data=> carFetch
           ).then(
                setCars(prev=> [...prev+carFetch])
           )

       }
    },[])
    return(
        <div>
            <p style={style}>Znaleźliśmy ponad {cars.length} ogłoszeń</p>
            {cars.map((car)=> <CarCard key={car.id} data={car}/>)}
        </div>
    );
}
export default CarBrowser;