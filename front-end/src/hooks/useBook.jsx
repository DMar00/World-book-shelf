import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contenxt/AuthContext'
import axios from 'axios'


const useBook = () => {
    //dati da localstorage
    const { user } = useAuth();

    //dati ed errori da passare ad Account.jsx
    const [bookInfo, setBookInfo] = useState();
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

        if (hasInvalidParams || paramsArray.length === 0){
            //c'è + di 1 parametro 
            //o c'è una parametro che non è id
            //o non c'è nessun parametro
            setBookInfo('');
            setShowError({value:true, message: 'Invalid URL parameters'});
        }else{
            //in tutti altri casi
            if (idParam === '') {
                // il parametro 'id' esiste ma ha lunghezza 0
                setBookInfo('');
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

export default useBook