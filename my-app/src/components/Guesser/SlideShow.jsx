import React, { useContext, useState, useEffect } from 'react';
import Slider from 'react-slick';
import { useGuesserContext } from './GuesserContextProvider';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SlideShow = () => {
  const { carId } = useGuesserContext();  // Get carId from context
  const imgCount=[0,9,8,5,7,5,8,8,8,8,5,8,7,8,8,7,6,5,7,8,8];
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!carId) return;
    const loadImages = async () => {
      const imageArray = [];
      for (let i = 1; i <= imgCount[carId]; i++) { // Assuming you have 5 images in each car's folder
        imageArray.push(`/gruzy/auto${carId}/image${i}.jpg`); // Adjust image paths/naming as needed
      }
      setImages(imageArray);
    };

    loadImages();
  }, [carId]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="car-image-slideshow" style={{width:'1000px', height:'700px', margin:'auto'}}>
      {images.length > 0 ? (
        <Slider {...settings}>
          {images.map((img, index) => (
            <div key={index}>
              <img src={img} alt={`Car ${carId} - Slide ${index + 1}`} style={{ width: 'auto', height: '40em' }} />
            </div>
          ))}
        </Slider>
      ) : (
        <p>Loading images...</p>
      )}
    </div>
  );
};

export default SlideShow;
