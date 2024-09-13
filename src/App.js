import React, {useEffect, useState} from "react";
import axios from "axios";

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
            <ul>
                {
                    fetchedData.map((item) => (
                        <li key={item.id}>{item.title}</li>
                    ))
                }
            </ul>
        </div>
    )
}