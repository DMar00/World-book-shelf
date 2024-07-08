import mongoose from "mongoose";

const shelfSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    books_read: [{ type: mongoose.Schema.Types.ObjectId, ref: 'book' }], // Array di riferimenti ai libri già letti
    books_to_read: [{ type: mongoose.Schema.Types.ObjectId, ref: 'book' }], // Array di riferimenti ai libri da leggere
});

const shelfModel = mongoose.models.shelf || mongoose.model("shelf", shelfSchema);

export default shelfModel;