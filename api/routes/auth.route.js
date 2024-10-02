import express from 'express'
import { signIn, signup,saveExtraUserInfo } from '../controllers/auth.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router =express.Router();

router.post("/signup",signup)
router.post('/signin',signIn)
router.post('/save',authMiddleware ,saveExtraUserInfo)

export default router;