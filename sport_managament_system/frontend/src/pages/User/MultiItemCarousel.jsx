import React, { useEffect, useState } from 'react'
import CarouselItem from './CarouselItem';
import { message } from 'antd';



import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';


const MultiItemCarousel = (props) => {



    const settings = {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2750,
        arrows: false
    };

    const [data, setData] = useState([]);

    const fetchData = async () => {

        await fetch('http://localhost:5000/api/achivement/show')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                return response.json();
            })
            .then(data => {
                setData(data) // get frist time data otherwise empty table load
            })
            .catch(error => {
                // Handle errors here
                console.error('Fetch error:', error);
                // Notify the user
                // alert('An error occurred while fetching data. Please try again.');
                message.info("An error occurred while fetching data. Please try again.");

            });
    }



    useEffect(() => {
        fetchData();


    }, []);



    return (
        <div>

            <Slider {...settings}>
                {

                    data.map((item) => <CarouselItem key={item} image={require(`../../../../backend/public/${item._id}.jpg`)} title={item.gameType} dis={item.discription} achivName={item.achivementName}/>)
                }
            </Slider>

        </div>
    )
}

export default MultiItemCarousel