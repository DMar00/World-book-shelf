import shelfModel from '../models/shelfModel.js';
import bookModel from '../models/bookModel.js';
import UserModel from '../models/userModel.js';

export const addBookToShelf = async (req, res) => {
    const { userId, bookId, type } = req.body;

    try {
        // Verifica se la mensola esiste
        let shelf = await shelfModel.findOne({ user: userId, type });

        // Se la mensola non esiste, creala
        if (!shelf) {
            shelf = new shelfModel({ user: userId, books: [], type });
        }

        // Verifica se il libro esiste
        const book = await bookModel.findById(bookId);
        if (!book) {
            return res.json({ 
                success: false,
                error: 'Book not found' 
            });
        }

        // Aggiungi il libro alla mensola
        shelf.books.push({ book: bookId });
        await shelf.save();

        return res.json({ 
            success: true,
            message: 'Book added to shelf successfully', 
            shelf 
        });

    } catch (error) {
        console.error('Error adding book to shelf:', error);
        return res.status(500).json({ 
            success: false,
            error: 'Internal server error' 
        });
    }
};

