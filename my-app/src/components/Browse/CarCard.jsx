import './CarCard.css'
import React from 'react'
function CarCard({data}){

    const {id, title, photos, desc, price} = data

    return(
        <aside className='wholeCard'>
            <img className="previewImage" src={photos[0]} alt={title.substring(0,title.indexOf(" ",title.indexOf(" ")+1))}></img>
            <div className='params'>
                <p>{title.length>=49? title.substr(0,50)+"...":title}</p>
                <b>Cena: {price}zł</b>
            </div>
            
        </aside>
    );
}
export default CarCard;