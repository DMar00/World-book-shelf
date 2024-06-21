import express from 'express';
import {  saveReview, getUserRating, banana } from '../controllers/reviewController.js';

const router = express.Router();

router.post('/saveReview', saveReview);
router.post('/getUserRating', getUserRating);

export default router;