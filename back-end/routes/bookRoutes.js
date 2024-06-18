import express from 'express';
import { addBook, getBookById, dropAllBooks, addBookContinue } from '../controllers/bookController.js';

const router = express.Router();

router.post('/addBook', addBook);
router.post('/addBookContinue', addBookContinue);
router.get('/getBookById', getBookById);
router.post('/dropAllBooks', dropAllBooks);

export default router;