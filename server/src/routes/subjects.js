import { Router } from 'express';
import { getSubjects, createSubject, deleteSubject, filterSubjects } from '../controllers/subjects.js';

const router = Router();

router.get('/', getSubjects);
router.get('/:id', filterSubjects);
router.post('/', createSubject);
router.delete('/:id', deleteSubject);

export default router;