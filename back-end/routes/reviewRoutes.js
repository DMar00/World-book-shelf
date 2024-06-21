import express from 'express';
import {  saveReview, getUserRating, getUserRatingBooks} from '../controllers/reviewController.js';

const router = express.Router();

router.post('/saveReview', saveReview);
router.post('/getUserRating', getUserRating);
router.post('/getUserRatingBooks', getUserRatingBooks);

export default router;