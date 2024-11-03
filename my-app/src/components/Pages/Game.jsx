import React from 'react';
import '../../index.css';
import Footer from '../Footer/Footer'
import Guesser  from '../Guesser/Guesser';
import Navi from './Navi';

function Game(){
    return (
    <div>
        <Navi/>
        <Guesser/>
        <Footer/>
    </div>
    );
}
export default Game;