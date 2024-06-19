import express from 'express';
import { getUser, existUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/getUser', getUser);
router.post('/existUser', existUser);

export default router;