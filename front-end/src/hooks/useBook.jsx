import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../contenxt/AuthContext'
import axios from 'axios'

const useBook = () => {
    const [bookInfo, setBookInfo] = useState(null); //info libro
    const [totalStars, setTotalStars] = useState(0); //numero tatle di valutazioni
    const [averageStars, setAverageStars] = useState(0); //valutazione media
    const [showError, setShowError] = useState({ value: false, message: '' }); //errori
    const [currentShelf, setCurrentShelf] = useState(''); //mi indica se l'utente l'ha aggiunto a uno delle due librerie
    const location = useLocation();

    //dati da localstorage
    const { user } = useAuth();

    //funzione per aggiungere libro a libreria
    const handleAddBookToShelf = async (type) => {
        //console.log("username: " + user.username + " - id_book:" + bookInfo.id_book + " - type: " + type);
        try {
            const response = await axios.post('http://localhost:4000/api/shelf/addBookToShelf', {
                username : user.username, 
                id_book : bookInfo.id_book,
                type 
            });
            alert(response.data.message);
            
            if(response.data.removed)
                setCurrentShelf('');
            else
                setCurrentShelf(type);
        } catch (error) {
            console.error('Error adding book to shelf:', error.response?.data?.error || error.message);
        }
    };



    //controllo parametri pagina, ed altri controlli per utente loggato
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



                //se sono loggata verifico anche se io utente ho aggiunto gà questo libro ad una libreria
                console.log("username: " + user.username + " - id_book: " + idParam.toString())
                const shelfResponse = await axios.post('http://localhost:4000/api/shelf/getShelfByBook', {
                        username: user.username, 
                        id_book: idParam.toString() 
                });
                if (shelfResponse.data.success) {
                    setCurrentShelf(shelfResponse.data.shelfType); // Imposta la libreria corrente
                } else {
                    setCurrentShelf('');
                }

            } catch (error) {
                console.error(error);
                setShowError({ value: true, message: 'Errors occurred while retrieving the book' });
                setBookInfo(null);
            }
        };

        fetchBook();
    }, [location.search]);


    return { bookInfo, showError, totalStars, averageStars, currentShelf, handleAddBookToShelf };
};

export default useBook;