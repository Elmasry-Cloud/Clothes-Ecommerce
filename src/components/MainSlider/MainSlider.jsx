import React, { useEffect } from "react";
import "./MainSlider.module.css";
import Slider from "react-slick";
import Image1 from "../../assets/img (1).jpg";
import Image2 from "../../assets/img (2).jpg";
import Image3 from "../../assets/img (3).jpg";
import Image4 from "../../assets/img (4).jpg";
import Image5 from "../../assets/img (5).jpg";

export default function MainSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  useEffect(() => {}, []);
  return (
    <>
      <div className="container md:w-2/3 mx-auto mt-20 flex flex-wrap flex-col md:flex-row">
        <div className="w-full md:w-3/5 mb-12 md:mb-0">
          <Slider {...settings}>
            <img
              src={Image1}
              alt=""
              className="w-full h-[600px] md:h-[400px] object-cover"
            />
            <img
              src={Image2}
              alt=""
              className="w-full h-[600px] md:h-[400px] object-contain"
            />
            <img
              src={Image3}
              alt=""
              className="w-full h-[600px] md:h-[400px] object-contain"
            />
          </Slider>
        </div>
        <div className="w-full md:w-2/5">
          <img
            src={Image4}
            className="w-full h-[300px] md:h-[200px] object-cover"
            alt=""
          />
          <img
            src={Image5}
            className="w-full h-[300px] md:h-[200px] object-cover"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
