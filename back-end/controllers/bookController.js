import bookModel from '../models/bookModel.js';
import UserModel from '../models/userModel.js';
import shelfModel from '../models/shelfModel.js';
import axios from 'axios';

export const addBook = async (req, res) => {
    const { id_book, 
            title, 
            authors,  
            genres, 
            description, 
            publisher, 
            publish_year, 
            pages_number, 
            language,
            number_stars_1,
            number_stars_2,
            number_stars_3,
            number_stars_4,
            number_stars_5,
            coverUrl } = req.body;
    try {
        // Verifico se id libro esiste già nel database
        const existingBookId = await bookModel.findOne({ id_book });
        if (existingBookId) {
            return res.status(400).json({ 
                message: 'Id Book ['+id_book+'] already exist' 
            });
        }

        // Scarica l'immagine da URL e convertila in Base64
        let cover = '';
        if (coverUrl) {
            try {
                const response = await axios.get(coverUrl, { responseType: 'arraybuffer' });
                const buffer = Buffer.from(response.data, 'binary').toString('base64');
                cover = `data:${response.headers['content-type']};base64,${buffer}`;
            } catch (error) {
                console.error('Errore durante il download dell\'immagine:', error.message);
                // Se si verifica un errore nel download dell'immagine, loggo l'errore ma continuo senza copertina
            }
        }


        // Creazione di un nuovo utente nel database
        const newBook = new bookModel({
            id_book,
            title,  
            authors, 
            cover, 
            genres, 
            description, 
            publisher, 
            publish_year, 
            pages_number, 
            language,
            number_stars_1,
            number_stars_2,
            number_stars_3,
            number_stars_4,
            number_stars_5
        });

        await newBook.save();

        res.json({ 
            success: true,
            message:'Book ['+id_book+'] Added',
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Errore del server' 
        });
    }
    
}

export const addBookContinue = async (req, res) => {
    const { id_book, 
        title, 
        authors,  
        genres, 
        description, 
        publisher, 
        publish_year, 
        pages_number, 
        language,
        number_stars_1,
        number_stars_2,
        number_stars_3,
        number_stars_4,
        number_stars_5,
        coverUrl } = req.body;
    try {
        // Verifico se id libro esiste già nel database
        const existingBookId = await bookModel.findOne({ id_book });
        if (!existingBookId) {
            // Scarica l'immagine da URL e convertila in Base64
            let cover = '';
            if (coverUrl) {
                try {
                    const response = await axios.get(coverUrl, { responseType: 'arraybuffer' });
                    const buffer = Buffer.from(response.data, 'binary').toString('base64');
                    cover = `data:${response.headers['content-type']};base64,${buffer}`;
                } catch (error) {
                    console.error('Errore durante il download dell\'immagine:', error.message);
                    // Se si verifica un errore nel download dell'immagine, loggo l'errore ma continuo senza copertina
                }
            }
            
            // Creazione di un nuovo utente nel database
            const newBook = new bookModel({
                id_book,
                title,  
                authors, 
                cover, 
                genres, 
                description, 
                publisher, 
                publish_year, 
                pages_number, 
                language,
                number_stars_1,
                number_stars_2,
                number_stars_3,
                number_stars_4,
                number_stars_5
            });

            await newBook.save();

            res.json({ 
                success: true,
                message:'Book ['+id_book+'] Added',
            });
        }else{
            res.json({ 
                success: true,
                message:'Book ['+id_book+'] EXIST',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Errore del server' 
        });
    }
}

export const getBookById = async (req, res) => {
    //id in url query
    const { id_book } = req.query;
    
    //ricerco libro tramite id
    const existingBook = await bookModel.findOne({ id_book });

    if(existingBook)
        return res.json({ 
            success: true,
            message: 'Book \''+id_book+'\' found',
            bookData: existingBook
        });
    else
        return res.json({ 
            success: false,
            message: 'Book \''+id_book+'\' not found', 
        });   
}

export const dropAllBooks = async (req, res) => {
    try {
        const result = await bookModel.deleteMany({});
        
        res.json({ 
            success: true,
            message: 'All books deleted',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Errore del server' 
        });
    }
}

export const topRatingBooks = async (req, res) => {
    try {
        const books = await bookModel.aggregate([
            {
                $addFields: {
                    totalReviews: {
                        $add: ["$number_stars_1", "$number_stars_2", "$number_stars_3", "$number_stars_4", "$number_stars_5"]
                    }
                }
            },
            {
                $addFields: {
                    averageRating: {
                        $cond: {
                            if: { $eq: ["$totalReviews", 0] },
                            then: 0,
                            else: {
                                $divide: [
                                    {
                                        $add: [
                                            { $multiply: ["$number_stars_1", 1] },
                                            { $multiply: ["$number_stars_2", 2] },
                                            { $multiply: ["$number_stars_3", 3] },
                                            { $multiply: ["$number_stars_4", 4] },
                                            { $multiply: ["$number_stars_5", 5] }
                                        ]
                                    },
                                    "$totalReviews"
                                ]
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    id_book: 1,
                    title: 1,
                    authors: 1,
                    cover: 1,
                    totalReviews: 1,
                    averageRating: 1
                }
            },
            {
                $sort: { averageRating: -1 }  // Ordina per la media della valutazione in ordine decrescente
            },
            {
                $limit: 5  // Limita il risultato ai primi 5 libri
            }
        ]);

        if (books.length > 0) {
            return res.json({
                success: true,
                message: 'Top 5 books sorted by highest rating',
                books: books
            });
        } else {
            return res.json({
                success: false,
                message: 'No books found'
            });
        }
    } catch (error) {
        console.error('Error while fetching top rated books:', error);
        return res.status(500).json({
            success: false,
            message: 'Error while fetching top rated books'
        });
    }
}

//funzione nella home page utente loggato
export const topRatingBooksBasedOnUserShelves = async (req, res) => {
    const { username } = req.body;

    try {
        // Trova l'utente basato sullo username
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        // Trova le shelf dell'utente
        const shelves = await shelfModel.findOne({ user: user._id });

        // Ottieni tutti i generi dei libri presenti nelle shelf dell'utente
        let genres = [];

        // Trova i libri nelle due mensole dell'utente
        const readBooks = await bookModel.find({ _id: { $in: shelves.books_read } });
        const toReadBooks = await bookModel.find({ _id: { $in: shelves.books_to_read } });

        //Concateno i generi dei libri trovati
        readBooks.forEach(book => {
            genres = genres.concat(book.genres);
            console.log("genres books_read: "  + genres);
        });

        toReadBooks.forEach(book => {
            genres = genres.concat(book.genres);
            console.log("genres books_to_read: "  + genres);
        });

        /*shelves.forEach(shelf => {
            // Aggiungi i generi dei libri in books_read
            shelf.books_read.forEach(book => {
                genres = genres.concat(book.genres);
                console.log("genres books_read: "  + genres);
            });
            console.log("man in the middle");
            // Aggiungi i generi dei libri in books_to_read
            shelf.books_to_read.forEach(book => {
                genres = genres.concat(book.genres);
                console.log("genres books_to_read: "  + genres);
            });
        });*/

        // Rimuovi i duplicati dai generi
        genres = [...new Set(genres)];

        // Trova i libri che hanno almeno uno dei generi trovati nelle shelf dell'utente
        const books = await bookModel.aggregate([
            {
                $match: { genres: { $in: genres } }
            },
            {
                $addFields: {
                    totalReviews: {
                        $add: ["$number_stars_1", "$number_stars_2", "$number_stars_3", "$number_stars_4", "$number_stars_5"]
                    }
                }
            },
            {
                $addFields: {
                    averageRating: {
                        $cond: {
                            if: { $eq: ["$totalReviews", 0] },
                            then: 0,
                            else: {
                                $divide: [
                                    {
                                        $add: [
                                            { $multiply: ["$number_stars_1", 1] },
                                            { $multiply: ["$number_stars_2", 2] },
                                            { $multiply: ["$number_stars_3", 3] },
                                            { $multiply: ["$number_stars_4", 4] },
                                            { $multiply: ["$number_stars_5", 5] }
                                        ]
                                    },
                                    "$totalReviews"
                                ]
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    id_book: 1,
                    title: 1,
                    authors: 1,
                    cover: 1,
                    totalReviews: 1,
                    averageRating: 1
                }
            },
            {
                $sort: { averageRating: -1 }  // Ordina per la media della valutazione in ordine decrescente
            },
            {
                $limit: 10  // Limita il risultato ai primi 10 libri
            }
        ]);

        if (books.length > 0) {
            return res.json({
                success: true,
                message: 'Top 10 books sorted by highest rating based on user shelves genres',
                books: books
            });
        } else {
            return res.json({
                success: false,
                message: 'No books found based on user shelves genres'
            });
        }
    } catch (error) {
        console.error('Error while fetching top rated books based on user shelves genres:', error);
        return res.status(500).json({
            success: false,
            message: 'Error while fetching top rated books based on user shelves genres'
        });
    }
};

