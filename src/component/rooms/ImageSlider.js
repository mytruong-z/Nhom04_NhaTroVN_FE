import React from "react";
import Slider from "react-slick";
import {Image} from 'react-bootstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CLOUD_IMG } from "../../config/index";

export default function ImageSlick(props) {
    const {images} = props;
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <Slider {...settings}>
            {
                images.map((item, index) => {
                    return (
                        <div className="room-box-img">
                            <Image src={`${CLOUD_IMG}/${item.name}`} fluid/>
                        </div>
                    )
                })
            }
        </Slider>
    );
}