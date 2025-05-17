import { Router } from 'express';
import {login, showLoginForm} from "../controllers/login.controller";

const router = Router();

router.get('/', showLoginForm);

router.post('/', login);

export default router;
