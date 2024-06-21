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
    const [userRating, setUserRating] = useState(0); // Stato per il valore della valutazione dell'utente
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


    // Funzione per gestire il cambio della valutazione
    const handleRatingChange = async (event , newValue) => {
        console.log("star value clicked: " + newValue);
        if (newValue !== null) {
            try {
                const response = await axios.post('http://localhost:4000/api/review/saveReview', {
                    username: user.username,
                    id_book: bookInfo.id_book,
                    rating: newValue
                });
    
                console.log("review saved ? " + response.data.success);
    
                if (response.data.removed) {
                    setUserRating(0);
                } else {
                    setUserRating(newValue);
                }
    
            } catch (error) {
                console.error('Error saving review:', error.response?.data?.error || error.message);
            }
        }
    };


    //Funzione per ottenere recensione lasciata dall'utente
    const fetchUserRating = async (idBook) => {
        console.log("id book: " + idBook + " - username : " + user.username);
        try {
            const response = await axios.post('http://localhost:4000/api/review/getUserRating', {
                username: user.username,
                id_book: idBook,
            });

            if (response.data.success) {
                setUserRating(response.data.userRating);
            } else {
                console.error('Error retrieving user rating:', response.data.error);
            }
        } catch (error) {
            console.error('Error retrieving user rating:', error);
        }
    };


    //Funzione per verificare anche se io utente ho aggiunto gà questo libro ad una libreria
    const fetchBookInShelf = async (idBook) => {
        console.log("username: " + user.username + " - id_book: " + idBook)
        const shelfResponse = await axios.post('http://localhost:4000/api/shelf/getShelfByBook', {
                username: user.username, 
                id_book: idBook
        });
        if (shelfResponse.data.success) {
            setCurrentShelf(shelfResponse.data.shelfType); // Imposta la libreria corrente
        } else {
            setCurrentShelf('');
        }
    }


    //Funzione per ottenere info libro
    const fetchInfoBook = async () => {
        const searchParams = new URLSearchParams(location.search);
        const paramsArray = Array.from(searchParams.keys());

        //c'è + di 1 parametro  //o c'è una parametro che non è id     //o non c'è nessun parametro
        if (paramsArray.length !== 1 || paramsArray[0] !== 'id') {
            setBookInfo(null);
            setShowError({ value: true, message: 'Invalid URL parameters' });
            return;
        }

        const idParam = searchParams.get('id');
        // il parametro 'id' esiste ma ha lunghezza 0
        if (!idParam) {
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

            //se sono loggata verifico anche se 
            // - ho aggiunto libro ad una libreria
            // - ho recensito il libro
            if(user){
                fetchBookInShelf(idParam.toString());
                fetchUserRating(idParam.toString());
            }
        } catch (error) {
            console.error(error);
            setShowError({ value: true, message: 'Errors occurred while retrieving the book' });
            setBookInfo(null);
        }
    };


    //ciò che deve essere effettuato al caricamento della pagina
    useEffect(() => {
        fetchInfoBook();
    }, [location.search]);


    return { bookInfo, showError, totalStars, averageStars, currentShelf, handleAddBookToShelf, handleRatingChange, userRating};
};

export default useBook;