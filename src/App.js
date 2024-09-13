import React, {useEffect, useState} from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";


export default function App () {
    const [fetchedData, setFetchedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect (() => {
        axios.get ('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                setFetchedData (response.data);
                setLoading (false);
            })
            .catch (error => {
                setError (error);
                setLoading (false);
            })
    }, []);
    if (loading) {
        return (
            <p>Data loading...</p>
        )
    }
    if (error) {
        return (
            <p>Error fetching data: {error.message}</p>
        )
    }


    return (
        <div>
            <h1>Rendering item lists</h1>
            <Swiper
                // spaceBetween={50}  // Space between each slide
                // slidesPerView={1}   // Number of slides visible at a time
                // navigation         // Add navigation buttons
                // pagination={{ clickable: true }} 
            >
                {
                    fetchedData.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div style={{ padding: '20px', border: '1px solid #ccc' }}>
                                <h1>{item.title}</h1>
                                <h4>{item.body}</h4>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}