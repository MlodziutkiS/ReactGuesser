import React, { useContext, useState, useEffect } from 'react';
import { useGuesserContext } from './GuesserContextProvider';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SlideShow.css';
import TestSlideShow from './TestSlider';

const SlideShow = () => {
  const { carId } = useGuesserContext();  // Get carId from context
  //const imgCount=[0,9,8,5,7,5,8,8,8,8,5,8,7,8,8,7,6,5,7,8,8];
  const [images, setImages] = useState([]);
  const [doneFetching, setDoneFetching]= useState(false);
  const car={};

  useEffect(() => {
    const loadImages = async () => {
      const requestUrl="/api/cars/"+carId;
      fetch(requestUrl).then(
        response => response.json()
       ).then(
        data=> car
       ).then(
        setImages(car.photos)
       ).finally(
        setDoneFetching(true)
       )
    };
    loadImages();
  }, [carId]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
  };
/*
  return (
    <div className="car-image-slideshow" style={{width:'1000px', height:'40em', margin:'auto', background:'grey', paddingInline: "30px", overflow:"hidden"  , justifyContent:"center"}}>
      {images.length > 0 ? (
        <Slider {...settings}>
          {images.map((img, index) => (
              <img src={process.env.PUBLIC_URL + img} alt={`Car ${carId} - Slide ${index + 1}`} className='imagetoscale' />
          ))}
        </Slider>
      ) : (
        <p>Loading images...</p>
      )}
    </div>
  );
  */
  if(!doneFetching){
    return <p>Loading...</p>;
  }
 return(
  <div className="App">
    <TestSlideShow images={car.photos} />
  </div>
);

};

export default SlideShow;
