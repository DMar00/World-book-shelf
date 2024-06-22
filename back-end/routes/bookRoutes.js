import express from 'express';
import { addBook, getBookById, dropAllBooks, addBookContinue, topRatingBooks, topRatingBooksBasedOnUserShelves, searchBooks} from '../controllers/bookController.js';

const router = express.Router();

router.post('/addBook', addBook);
router.post('/addBookContinue', addBookContinue);
router.get('/getBookById', getBookById);
router.post('/dropAllBooks', dropAllBooks);
router.post('/topRatingBooks', topRatingBooks);
router.post('/topRatingBooksBasedOnUserShelves', topRatingBooksBasedOnUserShelves);
router.get('/search', searchBooks);

export default router;