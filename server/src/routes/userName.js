import { Router } from 'express';
import { userName } from '../controllers/userName.js';

const router = Router();

router.get('/', userName);


export default router;