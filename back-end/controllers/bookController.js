import bookModel from '../models/bookModel.js';
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
            const response = await axios.get(coverUrl, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(response.data, 'binary').toString('base64');
            cover= `data:${response.headers['content-type']};base64,${buffer}`;
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
                const response = await axios.get(coverUrl, { responseType: 'arraybuffer' });
                const buffer = Buffer.from(response.data, 'binary').toString('base64');
                cover= `data:${response.headers['content-type']};base64,${buffer}`;
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
    console.log(id_book)

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