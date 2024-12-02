import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Main from './components/Pages/Main';
import Muza from './components/Pages/Muza';
import Filmy from './components/Pages/Filmy';
import Kontakt from './components/Pages/Kontakt';
import Game from './components/Pages/Game';
import AddPhotos from './components/Pages/AddPhotos';

import {BrowserRouter, Route, Routes} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main/>}>
          <Route path='muza' element={<Muza/>}/>
          <Route path='filmy' element={<Filmy/>}/>
          <Route path='kontakt' element={<Kontakt/>}/>
          <Route path='game' element={<Game/>}/>
          <Route path='addphotos' element={<AddPhotos/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
 </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
