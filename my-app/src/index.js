import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Button from './components/Button/Button';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Guesser  from './components/Guesser/Guesser';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className='banner'>
    <Home/>
    <Button text="muza" style="olx"/>
    <Button text="Kinematografia" style="olx"/>
    <Button text="Info" style="olx"/>
    <Button text="Przegladaj gruzy" style="olx"/>
    </div>
    <div className='menu'>
    <Guesser/>
    </div>
    <div className='stopka'>
    <Footer/>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
