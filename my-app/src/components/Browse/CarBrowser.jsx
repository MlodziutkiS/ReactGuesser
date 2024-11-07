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
    const [request, setRequest]=useState("/api/cars/1?short");
    useEffect(()=>{
       fetch("/api/statistical").then(
            response => response.json()
       ).then(
            data=> setTotalCars(data)
       ).finally(()=> {
            for (let i = 0; i < totalCars; i++){
                fetch(request).then(
                    response => response.json()
                ).then(
                    data=> {
                        setCars([...cars,{data}])
                        console.log(cars+";"+typeof(cars));
                        setRequest("/api/cars/"+parseInt(i)+1+"?short");
                    }
                )
            }
       })
       /*
       */
    },[request])
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
    return(
        <div>
            <p style={style}>Znaleźliśmy ponad {totalCars} ogłoszeń</p>
            {cars.map((car)=> <CarCard key={car.id} data={car}/>)}
        </div>
    );
}
export default CarBrowser;