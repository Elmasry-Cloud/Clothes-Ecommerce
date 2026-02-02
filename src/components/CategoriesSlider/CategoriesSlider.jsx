import React, { useEffect, useState } from "react";
import "./CategoriesSlider.module.css";
import Slider from "react-slick";
import axios from "axios";

export default function CategoriesSlider() {
  const [subCategories, setSubCategories] = useState(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 3,
    arrows: false,
    autoplay: true,
  };

  async function getSubCategories() {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        // console.log(data?.data);
        setSubCategories(data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getSubCategories();
  }, []);
  return (
    <>
      <div className="container my-12 mx-auto hidden md:block">
        <Slider {...settings}>
          {subCategories?.map((cat) => (
            <div key={cat?._id}>
              <img className="w-full h-[200px]" src={cat?.image} />
              <h1 className="mt-2 text-green-500">{cat?.name}</h1>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
