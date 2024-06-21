import express from 'express';
import { addBookToShelf, getShelfByBook, getBooksByUserShelves} from '../controllers/shelfController.js';

const router = express.Router();

router.post('/addBookToShelf', addBookToShelf);
router.post('/getShelfByBook', getShelfByBook);
router.post('/getBooksByUserShelves', getBooksByUserShelves);

export default router;