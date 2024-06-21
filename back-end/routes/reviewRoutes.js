import express from 'express';
import {  saveReview, getUserRating } from '../controllers/reviewController.js';

const router = express.Router();

router.post('/saveReview', saveReview);
router.post('/getUserRating', getUserRating);

export default router;