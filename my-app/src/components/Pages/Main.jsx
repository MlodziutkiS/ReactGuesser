import React from 'react';
import '../../index.css';
import Footer from '../Footer/Footer';
import Navi from './Navi';
import { useOutlet } from 'react-router-dom';
import CarBrowser from '../Browse/CarBrowser';
function Main(){
    const outlet = useOutlet()
    return (
    <div style={{backgroundColor:"RGB(242, 244, 245)"}}>
        <Navi/>
            {outlet ?? <CarBrowser/>}
        <Footer/>
    </div>
    );
}
export default Main;