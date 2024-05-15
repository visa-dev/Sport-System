import React from 'react'

const CarouselItem = ({ image, title, dis ,achivName}) => {
    return (

        <div className='flex flex-col justify-center items-center'>
        
            <img src={image} alt="" className='w-[50rem] h-[15rem] lg:h-[25rem] lg:w-[90rem]  object-cover object-center' />
            <span className='py-5 font-semibold text-xl text-blue-600'>{achivName}</span>
            <span className='py-5 font-semibold text-2xl text-blue-600'>{title}</span>
            
            <h3 className="text-sm font-bold text-gray-800">{dis}</h3>
        </div>


    )
}

export default CarouselItem