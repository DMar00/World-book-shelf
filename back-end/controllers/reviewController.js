import reviewModel from '../models/reviewModel.js';
import bookModel from '../models/bookModel.js';
import UserModel from '../models/userModel.js';

export const saveReview = async (req, res) => {
    const { username, id_book, rating } = req.body;

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

        // Verifica se l'utente ha già recensito questo libro
        let existingReview = await reviewModel.findOne({ user: user._id, book: book._id });

        // Se esiste già una recensione dell'utente per questo libro
        if (existingReview) {
            // Controlla se la nuova valutazione è diversa da quella esistente
            if (rating !== null && existingReview.rating !== rating) {
                // Aggiorna la recensione con la nuova valutazione
                const oldRating = existingReview.rating;
                existingReview.rating = rating;
                const updatedReview = await existingReview.save();

                // Aggiorna il conteggio delle stelle nel libro
                book[`number_stars_${oldRating}`] -= 1; // Decrementa il vecchio punteggio
                book[`number_stars_${rating}`] += 1;   // Incrementa il nuovo punteggio
                await book.save();

                return res.json({
                    success: true,
                    removed: false,
                    message: 'Review updated successfully',
                    review: updatedReview
                });
            } else if (rating === null) {
                // Rimuovi la recensione
                await reviewModel.deleteOne({ _id: existingReview._id });

                // Decrementa il conteggio delle stelle nel libro
                book[`number_stars_${existingReview.rating}`] -= 1;
                await book.save();

                return res.json({
                    success: true,
                    removed: true,
                    message: 'Review removed successfully'
                });
            } else {
                //non fa nulla in altri casi
                return res.json({
                    success: true,
                    removed: false,
                    message: 'Review rating unchanged'
                });
            }
        } else {
            // Se l'utente non ha ancora recensito questo libro, crea una nuova recensione
            const newReview = new reviewModel({
                user: user._id,
                book: book._id,
                rating
            });

            const savedReview = await newReview.save();

            // Aggiorna il conteggio delle stelle nel libro
            book[`number_stars_${rating}`] += 1;
            await book.save();

            return res.json({
                success: true,
                removed: false,
                message: 'Review saved successfully',
                review: savedReview
            });
        }
    } catch (error) {
        console.error('Error saving/retrieving review:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};

// Funzione per recuperare il valore della valutazione dell'utente per un libro
export const getUserRating = async (req, res) => {
    const { username, id_book } = req.body;

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

        // Cerca la recensione dell'utente per il libro specificato
        const userReview = await reviewModel.findOne({ user: user._id, book: book._id });

        // Se l'utente ha recensito il libro, ritorna il valore della valutazione
        if (userReview) {
            return res.json({
                success: true,
                userRating: userReview.rating
            });
        } else {
            return res.json({
                success: true,
                userRating: 0
            });
        }
    } catch (error) {
        console.error('Error retrieving user rating:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};

//lista dei libri con review di un utente
export const getUserRatingBooks = async (req, res) => {
    const { username } = req.body;

    try {
        // Trova l'utente basato sullo username
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        // Trova tutte le recensioni fatte dall'utente
        const userReviews = await reviewModel.find({ user: user._id });


        if (userReviews.length === 0) {
            return res.json({ success: false });
        }

        // Trova tutti i libri recensiti dall'utente e ottieni i dettagli completi
        const reviewedBooks = await Promise.all(userReviews.map(async (review) => {
            const book = await bookModel.findById(review.book);
            return { book, rating: review.rating };
        }));

        return res.json({
            success: true,
            reviewedBooks
        });

    } catch (error) {
        console.error('Error fetching user reviewed books:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};

