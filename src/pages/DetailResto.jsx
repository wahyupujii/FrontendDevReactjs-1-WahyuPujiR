import React, { useContext, useEffect } from 'react'
import StarRatings from 'react-star-ratings';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import { RestoDetailContext } from '../App';

const DetailResto = () => {
    const { resto } = useContext(RestoDetailContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (Object.keys(resto).length === 0) {
            navigate('/')
            return
        }
    }, [])

    return (
        <div className='py-5 my-5'>
            <Header />

            <hr />

            <div className='container mx-auto w-3/4 py-5'>
                <div className='flex'>
                    <img src={resto.heroImgUrl} alt="resto-image" className='w-1/3' />
                    <div className='flex flex-col ml-5'>
                        <span className='text-lg my-2'>Name : {resto.name}</span>
                        <div className='flex items-center'>
                            <span className='text-lg my-2'>Rating : &nbsp;</span>
                            <StarRatings
                                rating={resto.averageRating}
                                starRatedColor="#ffd700"
                                numberOfStars={5}
                                name='rating'
                                starDimension="20px"
                                starSpacing='0px'
                            />
                        </div>
                        <span className='text-lg' >Review : -</span>
                        <button className='py-3 px-8 bg-blue-500 text-white mt-3 rounded' onClick={() => navigate('/')}>Back to Home</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default DetailResto