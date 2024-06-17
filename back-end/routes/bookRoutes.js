import express from 'express';
import { addBook, getBookById } from '../controllers/bookController.js';

const router = express.Router();

router.post('/addBook', addBook);
router.get('/getBookById', getBookById);

export default router;