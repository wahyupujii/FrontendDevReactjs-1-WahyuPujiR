import axios from "axios";

const instance = axios.create({
    baseURL: "https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants",
    headers: {
        'X-RapidAPI-Key': "X-RapidAPI-Key Anda",
        'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
    },
    params: { locationId: '304554' },
})

export default instance;