import shelfModel from '../models/shelfModel.js';
import bookModel from '../models/bookModel.js';
import UserModel from '../models/userModel.js';

export const addBookToShelf = async (req, res) => {
    const { username, id_book, type } = req.body;
    //id_book è id goodreads non id mongo
    console.log("username: " + username + " - id_book:" + id_book + " - type: " + type);

    try {
        // Trova l'utente basato sullo username
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        // Verifica se il libro esiste
        const book = await bookModel.findOne( {id_book} );
        if (!book) {
            return res.json({ success: false, error: 'Book not found' });
        }

        // Trova o crea la mensola richiesta
        let shelf = await shelfModel.findOne({ user: user._id, type });
        if (!shelf) {
            shelf = new shelfModel({ user: user._id, books: [], type });
        }

        // Verifica se il libro è già nella mensola richiesta
        // se il libro già esiste in quella mensola, non fare nulla
        const bookExistsInRequestedShelf = shelf.books.some(b => b.book.toString() === book._id.toString());
        if (bookExistsInRequestedShelf) {
            return res.json({ success: true, message: 'Book already exists in the requested shelf' });
        }

        // Rimuovi il libro dalle altre mensole se esiste
        // se metto libro in "want-to-read" non può stare in "read" e viceversa
        await shelfModel.updateMany(
            { user: user._id, type: { $ne: type } },
            { $pull: { books: { book: book._id } } }
        );

        // Aggiungi il libro alla mensola richiesta
        shelf.books.push({ book: book._id });
        await shelf.save();

        return res.json({ success: true, message: 'Book added to shelf successfully', shelf });

    } catch (error) {
        console.error('Error adding book to shelf:', error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
