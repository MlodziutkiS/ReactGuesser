import React from 'react';
import '../Guesser/Guesser.css'

function PrevDummy({data}){
return (
    <div className='Zadywarka' style={{width:'76ex', padding:'2em'}}>
        <h1 id="tytul">{data.title}</h1>
                <input 
            type="number" 
            value={data.price} 
            className='BuyField'
            readOnly
        />
        <button className='BuyButton'>Kup teraz</button>
        <p style={{ whiteSpace: 'pre-line', overflow: 'auto', height:'25em'}}>{data.description}</p>
    </div>
);
}
export default PrevDummy;