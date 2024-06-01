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

    const location = useLocation();
    const navigate = useNavigate();
    
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
            } else if (user && usernameParam === user.username) {
                // sono loggata e visito mio profilo
                //console.log('sei ' + user.username);
                setUserInfo(user);
                setShowError({value:false, message: ''});
                setIsMyAccount(true);
            } else {
                //visito profilo altro utente
                /*if(user)
                    console.log('non sei '+ user.username);
                */
                //cerco se esiste quell'utente
                //funzione che fa richiesta per cercare se un utente esiste
                const fetchUser = async () => {
                    try {
                        const response = await axios.get(`http://localhost:4000/api/user/getUser`, {
                            params: { username: usernameParam },
                        });

                        if(response.data.success){
                            setUserInfo({username: response.data.userData.username});
                            setShowError({ value: false, message: '' });
                            setIsMyAccount(false);
                        }else{
                            setUserInfo(null);
                            setShowError({ value: true, message: response.data.message });
                            setIsMyAccount(false);
                        } 
                    } catch (error) {
                        console.error(error);
                        setShowError({ value: true, message: 'Errors occurred while retrieving the account' });
                        setUserInfo(null);
                        setIsMyAccount(false);
                    }
                };

                fetchUser();
            }
        }

    }, [location.search]);


    return { userInfo, showError, isMyAccount }
}

export default useAccount
