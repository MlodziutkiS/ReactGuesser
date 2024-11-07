import './CarCard.css'
import React from 'react'
function CarCard({data}){

    const {id=-1, title="Loading...", photos="/guesser.png", price=0} = data

    return(
        <aside className='wholeCard'>
            <img className="previewImage" key={id} src={photos[0]}></img>
            <div className='params'>
                <p>{title.length>=49? title.substr(0,50)+"...":title}</p>
                <p style={{fontWeight:"500"}}>{price} zł</p>
            </div>
            
        </aside>
    );
}
export default CarCard;