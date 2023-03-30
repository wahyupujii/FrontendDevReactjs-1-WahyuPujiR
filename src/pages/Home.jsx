import React, {useState, useEffect} from 'react'
import CardResto from '../components/CardResto';
import Header from '../components/Header';

import { getRestaurants } from '../constants/restaurants';

const Home = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

    const [filter, setFilter] = useState({
        openNow: false,
        priceLevel: "",
        cuisineData: [],
        cuisineFilter: ""
    })

    useEffect(() => {
        const fetchData = () => {
            const storedData = localStorage.getItem("restaurants")
            if (storedData) {
                setRestaurants(JSON.parse(storedData))
                setLoading(false)
                return;
            } else {
                getRestaurants()
                    .then(response => {
                        setRestaurants(response.data.data.data)
                        localStorage.setItem("restaurants", JSON.stringify(response.data.data.data))
                        setLoading(false)
                    })
                    .catch(() => setLoading(false))
            }
        }

        fetchData()
    }, [])

    const handleOpenNow = () => {
        setFilter({ ...filter, openNow: !filter.openNow });
    }

    const handlePriceLevel = (event) => {
        setFilter({ ...filter, priceLevel: event.target.value })
    }

    const handleCuisine = (event) => {
        setFilter({ ...filter, cuisineFilter: event.target.value })
    }

    const filteredData = restaurants.filter(resto => {
        if (filter.openNow && !(resto.currentOpenStatusCategory === "OPEN")) {
            return false;
        }

        if (filter.priceLevel && resto.priceTag !== filter.priceLevel) {
            return false;
        }

        if (filter.cuisineFilter && !resto.establishmentTypeAndCuisineTags.includes(filter.cuisineFilter)) {
            return false
        }

        return true;
    })

    const getCuisine = Array.from(
        new Set(restaurants.reduce((acc, curr) => acc.concat(curr.establishmentTypeAndCuisineTags), []))
    );

    return (
        <div className='py-5 mt-5 mb-5'>
            <Header />

            <hr />

            <div className='flex container mx-auto w-3/4 py-5'>
                <span>Filter by : </span>

                <div className='border-b-4 mx-2'>
                    <label>
                        <input
                            type="checkbox"
                            checked={filter.openNow}
                            onChange={handleOpenNow}
                            className="mr-2"
                        />
                        Open Now
                    </label>
                </div>

                <select value={filter.priceLevel} onChange={handlePriceLevel} className="bg-white border-b-4 mx-2">
                    <option value="">All Prices</option>
                    <option value="$$ - $$$">$$ - $$$</option>
                    <option value="$$$$">$$$$</option>
                </select>

                <select value={filter.cuisineFilter} onChange={handleCuisine} className="bg-white border-b-4 mx-2">
                    <option value="">All Cuisine</option>
                    {
                        getCuisine.map(cuisine => (
                            <option value={cuisine} key={cuisine}>{cuisine}</option>
                        ))
                    }
                </select>

            </div>

            <hr />

            <div className='container mx-auto w-3/4 py-5'>
                <h2 className='text-2xl mt-10 mb-10'>All Restaurants</h2>

                <div className='flex justify-between flex-wrap'>

                    {
                        loading ? <span className='text-3xl font-semibold'>Loading ...</span> :
                            filteredData.length === 0 ? <span className='text-xl font-semibold'>Not Data Found</span> :
                                filteredData.map((resto, index) => (
                                    <CardResto resto={resto} key={index} />
                                ))
                    }

                </div>

                <div className='text-center mt-10'>
                    <button className='border bg-slate-800 text-white text-sm py-5 px-10'>LOAD MORE</button>
                </div>

            </div>

        </div>
    )
}

export default Home