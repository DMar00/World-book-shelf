import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../contenxt/AuthContext'
import axios from 'axios'

const useBook = () => {
    const [bookInfo, setBookInfo] = useState(null);
    const [totalStars, setTotalStars] = useState(0);
    const [averageStars, setAverageStars] = useState(0);
    const [showError, setShowError] = useState({ value: false, message: '' });
    const location = useLocation();

    //dati da localstorage
    const { user } = useAuth();

    //funzione per aggiungere libro a libreria
    const handleAddBookToShelf = async (type) => {
        console.log("username: " + user.username + " - id_book:" + bookInfo.id_book + " - type: " + type);
        try {
            const response = await axios.post('http://localhost:4000/api/shelf/addBookToShelf', {
                username : user.username, 
                id_book : bookInfo.id_book,
                type 
            });
            alert(response.data.message);
        } catch (error) {
            console.error('Error adding book to shelf:', error.response?.data?.error || error.message);
        }
    };

    useEffect(() => {
        const fetchBook = async () => {
            const searchParams = new URLSearchParams(location.search);
            const paramsArray = Array.from(searchParams.keys());

            if (paramsArray.length !== 1 || paramsArray[0] !== 'id') {
                //c'è + di 1 parametro 
                //o c'è una parametro che non è id
                //o non c'è nessun parametro
                setBookInfo(null);
                setShowError({ value: true, message: 'Invalid URL parameters' });
                return;
            }

            const idParam = searchParams.get('id');
            if (!idParam) {
                // il parametro 'id' esiste ma ha lunghezza 0
                setBookInfo(null);
                setShowError({ value: true, message: 'Null id' });
                return;
            }

            //se il parametro id c'è nel modo giusto
            try {
                //cerco se esiste quel libro
                //funzione che fa richiesta per cercare se un libro esiste
                const response = await axios.get('http://localhost:4000/api/book/getBookById', {
                    params: { id_book: idParam.toString() },
                });

                if (response.data.success) {
                    const book = response.data.bookData;
                    const stars_sum = book.number_stars_1 + book.number_stars_2 + book.number_stars_3 + book.number_stars_4 + book.number_stars_5;
                    
                    setBookInfo(book);
                    setTotalStars(stars_sum); // Aggiorna totalStars
                    const average = (
                        (parseInt(book.number_stars_1) * 1 +
                         parseInt(book.number_stars_2) * 2 +
                         parseInt(book.number_stars_3) * 3 +
                         parseInt(book.number_stars_4) * 4 +
                         parseInt(book.number_stars_5) * 5) / stars_sum
                    ).toFixed(2);
                    
                    setAverageStars(parseFloat(average)); // Calcola e aggiorna averageStars
                    setShowError({ value: false, message: '' });
                } else {
                    setBookInfo(null);
                    setShowError({ value: true, message: response.data.message });
                }
            } catch (error) {
                console.error(error);
                setShowError({ value: true, message: 'Errors occurred while retrieving the book' });
                setBookInfo(null);
            }
        };

        fetchBook();
    }, [location.search]);


    return { bookInfo, showError, totalStars, averageStars, handleAddBookToShelf };
};

export default useBook;