import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contenxt/AuthContext'
import axios from 'axios'


const useAccount = () => {
    //dati da localstorage
    const { user } = useAuth();

    //dati ed errori da passare ad Account.jsx
    const [userInfo, setUserInfo] = useState('');
    const [showError, setShowError] = useState({ value: false, message: '' });
    const [isMyAccount, setIsMyAccount] = useState(false);

    const [readBooks, setReadBooks] = useState([]);
    const [toReadBooks, setToReadBooks] = useState([]);

    const location = useLocation();
    const navigate = useNavigate();

    //funzione che mi restituisce l'elenco dei libri nelle due librerie dell'utente
    const fetchUserShelfBooks = async () => {
        console.log("username: " + user.username);
        try {
            const response = await axios.post('http://localhost:4000/api/shelf/getBooksByUserShelves', {
                username: user.username
            });
            if (response.data.success) {
                setReadBooks(response.data.books_read);
                setToReadBooks(response.data.books_to_read);
            } else {
                console.error('Error fetching user books:', response.data.error);
            }
        } catch (error) {
            console.error('Error fetching user books:', error);
        }
    };
    
    useEffect(() => {
        //prendo parametri da da url
        const searchParams = new URLSearchParams(location.search);
        const paramsArray = Array.from(searchParams.keys());

        //valore del parametro username
        const usernameParam = searchParams.get('username');

        // Controllo se ci sono altri parametri oltre a 'username'
        const hasInvalidParams = paramsArray.length > 1 || (paramsArray.length === 1 && paramsArray[0] !== 'username');

        //console.log("usernameParam: "+ usernameParam+ " - user :"+user.username);
        if (hasInvalidParams ){
            //c'è + di 1 parametro 
            //o c'è una parametro che non è username 
            //console.log('Parametri in url non validi')
            setUserInfo('');
            setShowError({value:true, message: 'Invalid URL parameters'});
            setIsMyAccount(false);
        } else if (paramsArray.length === 0){
            //non c'è nessun parametro
            if(user){
                setUserInfo(user);
                setShowError({value:false, message: ''});
                setIsMyAccount(true);
                return navigate(`/account?username=${user.username}`);
            }else{
                setUserInfo('');
                setShowError({value:true, message: 'Invalid URL parameters'});
                setIsMyAccount(false);
            }
        }else{
            //in tutti altri casi
            if (usernameParam === '') {
                // il parametro 'username' esiste ma ha lunghezza 0
                //console.log('Username errato');
                setUserInfo('');
                setShowError({value:true, message: 'Null username'});
                setIsMyAccount(false);
            } else /*if (user && usernameParam === user.username) */{
                console.log("control: "+ user && usernameParam === user.username);
                if (user && usernameParam === user.username){
                    // sono loggata e visito mio profilo
                    console.log("sei nel tuo profilo");
                    setIsMyAccount(true);
                } else {
                    //visito profilo altro utente
                    console.log("non sei nel tuo profilo");
                    setIsMyAccount(false);
                }

                const fetchUser = async () => {
                    try {
                        const response = await axios.get(`http://localhost:4000/api/user/getUser`, {
                            params: { username: usernameParam },
                        });

                        if(response.data.success){
                            setUserInfo({
                                username: response.data.userData.username,
                                name: response.data.userData.name,
                                surname: response.data.userData.surname
                            });
                            setShowError({ value: false, message: '' });
                            //setIsMyAccount(false);
                        }else{
                            setUserInfo(null);
                            setShowError({ value: true, message: response.data.message });
                            //setIsMyAccount(false);
                        } 
                    } catch (error) {
                        console.error(error);
                        setShowError({ value: true, message: 'Errors occurred while retrieving the account' });
                        setUserInfo(null);
                        //setIsMyAccount(false);
                    }
                };

                fetchUser();
                fetchUserShelfBooks();
            }
        }

    }, [location.search]);


    return { userInfo, showError, isMyAccount, readBooks, toReadBooks }
}

export default useAccount
