import bookModel from '../models/bookModel.js';

export const addBook = async (req, res) => {
    const { id_book, 
            title, 
            isbn, 
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
            number_stars_5 } = req.body;
    try {
        // Verifico se id libro esiste già nel database
        const existingBookId = await bookModel.findOne({ id_book });
        if (existingBookId) {
            return res.status(400).json({ 
                message: 'Id Book ['+id_book+'] already exist' 
            });
        }

        // Creazione di un nuovo utente nel database
        const newBook = new bookModel({
            id_book,
            title, 
            isbn, 
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