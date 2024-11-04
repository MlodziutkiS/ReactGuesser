import React from 'react';
import cars from '../../database/cars';
import CarCard from './CarCard';

function CarBrowser(){
    const style={
        fontWeight:"500",
        fontSize:"2em",
        margin:"1em"
    }
    return(
        <div>
            <p style={style}>Znaleźliśmy ponad {cars.length} ogłoszeń</p>
            {cars.map((car)=> <CarCard key={car.id} data={car}/>)}
        </div>
    );
}
export default CarBrowser;