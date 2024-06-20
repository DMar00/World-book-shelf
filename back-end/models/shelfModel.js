import mongoose from "mongoose";

// Definizione dello schema per il libro nella mensola
const shelfBookSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'book', required: true },
});

// Definizione dello schema per Shelf
const shelfSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    books: [shelfBookSchema], // Array di riferimenti ai libri
    type: { type: String, enum: ['to-read', 'read'], required: true } // Tipo di mensola (da leggere o già letti)
});

// Creazione del modello Shelf
const shelfModel = mongoose.models.shelf || mongoose.model("shelf", shelfSchema);

export default shelfModel;