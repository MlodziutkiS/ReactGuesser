import React, { useEffect, useState } from 'react';
import CarCard from './CarCard';
import axios from 'axios';

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
        axios.get("/api/statistical").then(
            response => setTotalCars(response.data)
          ).catch(()=>{
            console.log("error fetching /api/statistical");
          })
       axios.get("/api/cars?short").then(
        data => setCars(data.data)
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