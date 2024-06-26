import { Router } from 'express';
import registerController from '../controllers/register.js';

const router = Router();

router.post('/', registerController.register);

export default router;
