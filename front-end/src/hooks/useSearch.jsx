import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useSearch = () => {
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const searchBooks = async (query, page = 1, limit = 15) => {
        try {
            //const response = await axios.get(`http://localhost:4000/api/book/search?query=${query}`);
            //console.log(response.data.message);
            const response = await axios.get('http://localhost:4000/api/book/search', { params: { query, page, limit } });
            return response.data;
            /*
            if (response.data.success) {
                setSearchResults(response.data.books);
                navigate('/search?query='+query, { state: { results: response.data.books } });
            } else {
                console.error('No books found');
            }*/
        } catch (error) {
            console.error('Error searching books:', error);
            return { success: false, message: 'Error fetching data' };
        }
    };

    return {
        searchBooks,
        searchResults,
    };
};

export default useSearch;