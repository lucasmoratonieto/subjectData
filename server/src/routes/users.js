import { Router } from 'express';
import { checkEmail, createUser } from '../controllers/users.js';

const router = Router();

router.post('/', checkEmail);
router.post('/createUser', createUser);


export default router;