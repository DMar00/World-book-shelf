import shelfModel from '../models/shelfModel.js';
import bookModel from '../models/bookModel.js';
import UserModel from '../models/userModel.js';

export const addBookToShelf = async (req, res) => {
    const { username, id_book, type } = req.body;
    //id_book è id goodreads non id mongo
    //console.log("username: " + username + " - id_book:" + id_book + " - type: " + type);

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
        /*const bookExistsInRequestedShelf = shelf.books.some(b => b.book.toString() === book._id.toString());
        if (bookExistsInRequestedShelf) {
            return res.json({ success: true, message: 'Book already exists in the requested shelf' });
        }*/
        // Verifica se il libro è già nella mensola richiesta
        const bookIndexInShelf = shelf.books.findIndex(b => b.book.toString() === book._id.toString());
        if (bookIndexInShelf !== -1) {
            // Se il libro è già presente nella mensola, rimuovilo
            shelf.books.splice(bookIndexInShelf, 1);
            await shelf.save();
            return res.json({ 
                success: true, 
                message: 'Book removed from shelf successfully', 
                removed: true,
                shelf });
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

        return res.json({ 
            success: true, 
            message: 'Book added to shelf successfully', 
            removed: false,
            shelf });

    } catch (error) {
        console.error('Error adding book to shelf:', error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
};


export const getShelfByBook = async (req, res) => {
    const { username, id_book } = req.body;

    try {
        // Trova l'utente basato sullo username
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        const book = await bookModel.findOne( {id_book} );
        if (!book) {
            return res.json({ success: false, error: 'Book not found' });
        }

        // Trova la mensola che contiene il libro specificato per l'utente
        const shelf = await shelfModel.findOne({ user: user._id, 'books.book': book._id });
        //console.log("shelf : " + shelf.type);

        if (!shelf) {
            return res.json({ 
                success: false, 
                message: 'Book not found in any shelf' 
            });
        }

        return res.json({ 
            success: true, 
            shelfType: shelf.type
        });

    } catch (error) {
        console.error('Error finding shelf by book:', error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
};


export const getBooksByUserShelves = async (req, res) => {
    const { username } = req.body;

    try {
        // Trova l'utente basato sullo username
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Trova i libri nelle due shelf dell'utente
        const shelves = await shelfModel.find({ user: user._id });

         // Inizializza le liste per i libri
         let readBooks = [];
         let toReadBooks = [];

         // Itera sulle 2 shelf per trovare i libri
        for (let i = 0; i < shelves.length; i++) {
            const shelf = shelves[i];
            const shelfType = shelf.type;

            // Trova i libri nella shelf attuale
            const booksInShelf = await bookModel.find({ _id: { $in: shelf.books.map(item => item.book) } });

            // Distribuisci i libri nelle liste appropriate
            if (shelfType === 'read') {
                readBooks = readBooks.concat(booksInShelf);
            } else if (shelfType === 'to-read') {
                toReadBooks = toReadBooks.concat(booksInShelf);
            }
        }

        return res.json({ 
            success: true, 
            books_read: readBooks ,
            books_to_read: toReadBooks
        });

    } catch (error) {
        console.error('Error fetching books by user shelves:', error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
