import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';
import { secret } from '../config/jwt.js';


export const signup = async (req, res) => {
    //valori inseriti nel form da utente
    const { username, password, name, surname, email, date } = req.body;
        
    try {
        // Verifico se l'utente esiste già nel database
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ 
                message: 'Username già in uso' 
            });
        }
    
        // Hash della password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        // Creazione di un nuovo utente nel database
        const newUser = new UserModel({
            username,
            name,
            surname,
            date,
            email,
            password    //la password viene automaticamente hashata dal middleware [vedi userModel.js]
        });

        await newUser.save();
    
        // Generazione del token JWT
        const token = jwt.sign({_id: newUser._id}, secret, { expiresIn: '9d' });
    
        res.json({ 
            success: true,
            message:'User Added',
            token 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: true,
            message: 'Errore del server' 
        });
    }
};



export const login = async (req, res) => {
    //username e password inseriti nel form
    const { username, password } = req.body;

    try {
        //cerco utente, con username inserito, nel db
        const user = await UserModel.findOne({ username });

        //se non esiste utente con quell'username
        if (!user) 
            return res.json({
                success:false,
                message: 'User \'' + username + '\'does not exist'
            });
        
        //confronto se la password inserita e la password dell'utente nel db coincidono
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) 
            return res.status(401).json({ 
                success: false,
                message: 'Credenziali non valide' 
            });
      
        //    
        //console.log("secret: "+ secret);
        const token = jwt.sign({_id: user._id}, secret, { expiresIn: '9d' });
        res.json({ 
            success: true,
            message: '',
            token 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Errore del server' 
        });
    }
};