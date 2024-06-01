import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username : {type: String, required: true, unique:true},
    name:  {type: String, required: true},
    surname: {type: String, required: true},
    date: {type: String, required: true},
    email : {type: String, required: true, unique:true},
    password : {type: String, required: true}
})

//middleware pre save
userSchema.pre('save', async function (next) {
    const user = this; //riferimento all'istanza dell'utente su cui viene chiamato il metodo save()

    /**
     * Verifica se la password dell'utente è stata modificata.
     * Se la password non è stata modificata (ad esempio, quando si aggiorna un'email senza cambiare la password),
     * il middleware passa al prossimo middleware nella catena senza fare nulla.
     */
    if (!user.isModified('password')) 
        return next(); 

    /**
     * Genera un "salt" casuale utilizzato per hashing della password. 
     * Il numero 10 rappresenta il costo, cioè il numero di iterazioni dell'algoritmo di hash.
     */    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;

    next(); //per procedere con il processo di salvataggio dell'utente nel database.
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;