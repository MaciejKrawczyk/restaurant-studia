import { Router } from 'express';
import { showRegisterForm, register } from '../controllers/register.controller';

const router = Router();

router.get('/', showRegisterForm);

router.post('/', register);

export default router;
