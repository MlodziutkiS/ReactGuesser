import React from 'react';
import './index.css';
import Footer from './components/Footer/Footer';
import Info from './components/Info/Info'
import Navi from './Navi';

function Kontakt(){
    return (
    <div>
        <Navi/>
        <Info/>
        <Footer/>
    </div>
    );
}
export default Kontakt;