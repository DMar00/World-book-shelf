import express from 'express';
import { addBookToShelf } from '../controllers/shelfController.js';

const router = express.Router();

router.post('/addBookToShelf', addBookToShelf);

export default router;