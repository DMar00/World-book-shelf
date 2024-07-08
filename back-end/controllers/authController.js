import bcrypt from 'bcrypt';
import UserModel from '../models/userModel.js';


export const signup = async (req, res) => {
    //valori inseriti nel form da utente
    const { username, password, name, surname, email, date } = req.body;
        
    try {
        // Verifico se l'utente esiste già nel database
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.json({ 
                success: false,
                message: 'username already exists' 
            });
        }

        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) {
            return res.json({ 
                success: false,
                message: 'email already exists' 
            });
        }
    
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
    
        res.json({ 
            success: true,
            message:'User Added'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
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
                message: 'user [' + username + '] does not exist'
            });
        
        //confronto se la password inserita e la password dell'utente nel db coincidono
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) 
            return res.json({ 
                success: false,
                message: 'invalid password' 
            });
      
        res.json({ 
            success: true,
            message: ''
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Errore del server' 
        });
    }
};