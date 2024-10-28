import React, { useContext, useState, useEffect } from 'react';
import Slider from 'react-slick';
import { useGuesserContext } from './GuesserContextProvider';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import cars from '../../database/cars';
import './SlideShow.css'

const SlideShow = () => {
  const { carId } = useGuesserContext();  // Get carId from context
  //const imgCount=[0,9,8,5,7,5,8,8,8,8,5,8,7,8,8,7,6,5,7,8,8];
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      // const imageArray = cars;
      // for (let i = 0; i <= cars[carId].photos.length; i++) { // Assuming you have 5 images in each car's folder
      //   imageArray.push(`/gruzy/auto${carId+1 }/image${i}.jpg`); // Adjust image paths/naming as needed
      // }
      setImages(cars[carId].photos);
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

  return (
    <div className="car-image-slideshow" style={{width:'1000px', height:'40em', margin:'auto', background:'grey', paddingInline: "30px", overflow:"hidden", justifyContent:"center"}}>
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
};

export default SlideShow;
