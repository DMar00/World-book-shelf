import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contenxt/AuthContext'
import axios from 'axios';

const useQueryBooks = () => {
    const [booksFound, setBooksFound] = useState([]); // elenco libri funzione home page utente loggato
    const location = useLocation();
     //dati da localstorage
     const { user } = useAuth();

    useEffect(() => {
        console.log("username: " + user.username);
        //funzione nella home page utente autenticato
        const getTopRatingBooksBasedOnUserShelves = async (username) => {
            try {
                const response = await axios.post('http://localhost:4000/api/book/topRatingBooksBasedOnUserShelves', { username });
                //console.log("success: " + response.data.success);
                if(response.data.success)
                    setBooksFound(response.data.books);
                else{
                    const response2 = await axios.post('http://localhost:4000/api/book/topRatingBooks');
                    if(response2.data.success)
                        setBooksFound(response2.data.books);
                    else
                        setBooksFound([]);
                }
                    
            } catch (error) {
                console.error('Error fetching top rating books based on user shelves:', error);
                return { success: false, message: 'Error fetching data' };
            }
        };

        getTopRatingBooksBasedOnUserShelves(user.username);
       
    }, [location]); // Dipendenza vuota, se non ne hai

    return { booksFound };
};

export default useQueryBooks;