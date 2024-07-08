import shelfModel from '../models/shelfModel.js';
import bookModel from '../models/bookModel.js';
import UserModel from '../models/userModel.js';

//funzione per aggiungere/rimuovere libri da shelf
export const addBookToShelf = async (req, res) => {
    const { username, id_book, type } = req.body; // type può essere 'read' o 'to-read'

    try {
        // Trova l'utente basato sullo username
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        // Verifica se il libro esiste
        const book = await bookModel.findOne({ id_book });
        if (!book) {
            return res.json({ success: false, error: 'Book not found' });
        }

        // Trova o crea la mensola per l'utente
        let shelf = await shelfModel.findOne({ user: user._id });
        if (!shelf) {
            shelf = new shelfModel({ user: user._id, books_read: [], books_to_read: [] });
        }

        // Determina quale array aggiornare
        let targetArray, otherArray;
        if (type === 'read') {
            targetArray = 'books_read';
            otherArray = 'books_to_read';
        } else if (type === 'to-read') {
            targetArray = 'books_to_read';
            otherArray = 'books_read';
        } else {
            return res.status(400).json({ success: false, error: 'Invalid type' });
        }

        // Verifica se il libro è già nella mensola richiesta
        const bookIndexInShelf = shelf[targetArray].indexOf(book._id);
        if (bookIndexInShelf !== -1) {
            // Se il libro è già presente nella mensola, rimuovilo
            shelf[targetArray].splice(bookIndexInShelf, 1);
            await shelf.save();
            return res.json({ 
                success: true, 
                message: 'Book removed from shelf successfully', 
                removed: true,
                shelf 
            });
        }

        // Rimuovi il libro dall'altra mensola se presente
        shelf[otherArray] = shelf[otherArray].filter(bookId => !bookId.equals(book._id));

        // Aggiungi il libro alla mensola richiesta
        shelf[targetArray].push(book._id);
        await shelf.save();

        return res.json({ 
            success: true, 
            message: 'Book added to shelf successfully', 
            removed: false,
            shelf 
        });

    } catch (error) {
        console.error('Error adding book to shelf:', error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
};


//Funzione per verificare anche se io utente ho aggiunto gà questo libro ad una libreria 
export const getShelfByBook = async (req, res) => {
    const { username, id_book } = req.body;

    try {
        // Trova l'utente basato sullo username
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        const book = await bookModel.findOne({ id_book });
        if (!book) {
            return res.json({ success: false, error: 'Book not found' });
        }

        // Trova la mensola che contiene il libro specificato per l'utente
        const shelf = await shelfModel.findOne({ user: user._id });

        if (!shelf) {
            return res.json({ 
                success: false, 
                message: 'No shelves found for user' });
        }

        let shelfType = null;
        if (shelf.books_read.includes(book._id)) {
            shelfType = 'read';
        } else if (shelf.books_to_read.includes(book._id)) {
            shelfType = 'to-read';
        }

        if (!shelfType) {
            return res.json({ success: false, message: 'Book not found in any shelf' });
        }

        return res.json({ success: true, shelfType });

    } catch (error) {
        console.error('Error finding shelf by book:', error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
};


//lista dei libri nelle shelves dell'utente
export const getBooksByUserShelves = async (req, res) => {
    const { username } = req.body;

    try {
        // Trova l'utente basato sullo username
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Trova la mensola dell'utente
        const shelf = await shelfModel.findOne({ user: user._id });

        if (!shelf) {
            return res.json({ 
                success: false, 
                message: 'No shelves found for user' 
            });
        }

        // Trova i libri nelle due mensole dell'utente
        const readBooks = await bookModel.find({ _id: { $in: shelf.books_read } });
        const toReadBooks = await bookModel.find({ _id: { $in: shelf.books_to_read } });

        return res.json({ 
            success: true, 
            books_read: readBooks,
            books_to_read: toReadBooks
        });

    } catch (error) {
        console.error('Error fetching books by user shelves:', error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
};


