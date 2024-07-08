import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useSearch = () => {
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

//page = 1 di default
const searchBooks = async (query, page = 1, orderBy) => {
        try {
            const response = await axios.get('http://localhost:4000/api/book/search', { params: { query, page, orderBy } });
            return response.data;
        } catch (error) {
            console.error('Error searching books:', error);
            return { success: false, message: 'Error fetching data' };
        }
    };

    return { searchBooks };
};

export default useSearch;