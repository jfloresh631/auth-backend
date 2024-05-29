import { Router } from 'express';
import verifyController from '../controllers/verify.js';

const router = Router();

router.get('/', verifyController.verify);

export default router;
