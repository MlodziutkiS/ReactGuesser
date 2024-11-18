import React, { useContext, useState, useEffect } from 'react';
import { useGuesserContext } from './GuesserContextProvider';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SlideShow.css';
import TestSlideShow from './TestSlider';

const SlideShow = () => {
  const { dataReady, carData} = useGuesserContext();  // Get carId from context
  //const imgCount=[0,9,8,5,7,5,8,8,8,8,5,8,7,8,8,7,6,5,7,8,8];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
  };

  if(!dataReady || carData===undefined){
    return <p>Loading...</p>;
  }
 return(
  <div className="App">
    <TestSlideShow images={carData.photos} />
  </div>
);

};

export default SlideShow;
