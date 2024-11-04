//SlideShow.js
import React, {useState} from 'react';
import './SlideShow.css';
import { preload } from 'react-dom';

const TestSlideShow = ({ images }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const goToNextSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === images.length - 1 ? 0 : prevIndex + 1
		);
	};

	const goToPreviousSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? images.length - 1 : prevIndex - 1
		);
	};
	function handlePreload(){
		preload(images[currentIndex+1], {as: "image"});
		preload(images[images.length-1], {as: "image"});
		preload(images[currentIndex-1], {as: "image"});
	}

	return (
		<div className="slideshow-container">
			<img
				src={images[currentIndex]}
				alt={`Slide ${currentIndex}`}
				className="slideshow-image"
				onLoad={handlePreload}
			/>
			<div className="slideshow-buttons">
				<button onClick={goToPreviousSlide}>{"<"}</button>
				<button onClick={goToNextSlide}>{">"}</button>
			</div>
		</div>
	);
};

export default TestSlideShow;
