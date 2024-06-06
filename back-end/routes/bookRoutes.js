import express from 'express';
import { addBook } from '../controllers/bookController.js';

const router = express.Router();

router.post('/addBook', addBook);

export default router;