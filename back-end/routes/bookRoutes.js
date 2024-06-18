import express from 'express';
import { addBook, getBookById, dropAllBooks } from '../controllers/bookController.js';

const router = express.Router();

router.post('/addBook', addBook);
router.get('/getBookById', getBookById);
router.post('/dropAllBooks', dropAllBooks);

export default router;