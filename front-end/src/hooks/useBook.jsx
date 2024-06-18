/*import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contenxt/AuthContext'
import axios from 'axios'


const useBook = () => {
    //dati da localstorage
    const { user } = useAuth();
    console.log("ciaoooooooo");
    //dati ed errori da passare ad Account.jsx
    const [bookInfo, setBookInfo] = useState({
        "title": null
    });
    const [showError, setShowError] = useState({ value: false, message: '' });

    const location = useLocation();
    
    useEffect(() => {
        //prendo parametri da da url
        const searchParams = new URLSearchParams(location.search);
        const paramsArray = Array.from(searchParams.keys());

        //valore del parametro id
        const idParam = searchParams.get('id');

        // Controllo se ci sono altri parametri oltre a 'id'
        const hasInvalidParams = paramsArray.length > 1 || (paramsArray.length === 1 && paramsArray[0] !== 'id');
        console.log("hasInvalidParams: " + hasInvalidParams);
        
        if (hasInvalidParams || paramsArray.length === 0){
            //c'è + di 1 parametro 
            //o c'è una parametro che non è id
            //o non c'è nessun parametro
            console.log("Invalid url parameters")
            setBookInfo(null);
            setShowError({value:true, message: 'Invalid URL parameters'});
        }else{
            //in tutti altri casi
            if (idParam === '') {
                // il parametro 'id' esiste ma ha lunghezza 0
                setBookInfo(null);
                setShowError({value:true, message: 'Null id'});
            } else {
                //cerco se esiste quel libro
                //funzione che fa richiesta per cercare se un libro esiste
                const fetchBook = async () => {
                    try {
                        const response = await axios.get(`http://localhost:4000/api/book/getBookById`, {
                            params: { id_book : idParam.toString() },
                        });

                        if(response.data.success){
                            console.log(response.data);
                            setBookInfo(response.data.bookData);
                            setShowError({ value: false, message: '' });
                        }else{
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
            }
        }

    }, [location.search]);


    return { bookInfo, showError }
}

export default useBook*/

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contenxt/AuthContext';

const useBook = () => {
    const { user } = useAuth();
    const [bookInfo, setBookInfo] = useState(null);
    const [totalStars, setTotalStars] = useState(0);
    const [averageStars, setAverageStars] = useState(0);
    const [showError, setShowError] = useState({ value: false, message: '' });
    const location = useLocation();

    useEffect(() => {
        const fetchBook = async () => {
            const searchParams = new URLSearchParams(location.search);
            const paramsArray = Array.from(searchParams.keys());

            if (paramsArray.length !== 1 || paramsArray[0] !== 'id') {
                setBookInfo(null);
                setShowError({ value: true, message: 'Invalid URL parameters' });
                return;
            }

            const idParam = searchParams.get('id');

            if (!idParam) {
                setBookInfo(null);
                setShowError({ value: true, message: 'Null id' });
                return;
            }

            try {
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

    return { bookInfo, showError, totalStars, averageStars };
};

export default useBook;