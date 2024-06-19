import express from 'express';
import { addBook, getBookById, dropAllBooks, addBookContinue, topRatingBooks } from '../controllers/bookController.js';

const router = express.Router();

router.post('/addBook', addBook);
router.post('/addBookContinue', addBookContinue);
router.get('/getBookById', getBookById);
router.post('/dropAllBooks', dropAllBooks);
router.get('/topRatingBooks', topRatingBooks);

export default router;