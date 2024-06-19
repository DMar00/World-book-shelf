import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const useQueryBooks = () => {
    const [topRatedBooks, setTopRatedBooks] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const fetchTopRatedBooks = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/book/topRatingBooks');
                if (response.data.success) {
                    setTopRatedBooks(response.data.books);
                } else {
                    console.error('Failed to fetch top rated books:', response.data.message);
                }
            } catch (error) {
                console.error('Error while fetching top rated books:', error);
            }
        };
        fetchTopRatedBooks();
       
    }, [location]); // Dipendenza vuota, se non ne hai

    return { topRatedBooks };
};

export default useQueryBooks;
