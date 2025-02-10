import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import image1 from '../../assets/c1.jpg';
import image2 from '../../assets/c2.jpg';

function ImageCarousel() {
  return (
    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} className="shadow-lg rounded-lg overflow-hidden">
      <div className="h-screen">
        <img src={image1} alt="Slide 1" className="object-cover w-full h-full" />
      </div>
      <div className="h-screen">
        <img src={image2} alt="Slide 2" className="object-cover w-full h-full" />
      </div>
    </Carousel>
  );
}

export default ImageCarousel;
