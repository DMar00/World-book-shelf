import UserModel from '../models/userModel.js';

export const getUser = async (req, res) => {
    const {username} = req.query;

    //ricerco utente tramite username
    const existingUser = await UserModel.findOne({ username });

    if(existingUser)
        return res.json({ 
            success: true,
            message: 'User \''+username+'\' found',
            userData: existingUser
        });
    else
        return res.json({ 
            success: false,
            message: 'User \''+username+'\' not found', 
        });   
}