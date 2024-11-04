import React from 'react';
import cars from '../../database/cars';
import CarCard from './CarCard';

function CarBrowser(){
    return(
        <div>
            {cars.map((car)=> <CarCard key={car.id} data={car}/>)}
        </div>
    );
}
export default CarBrowser;