import { Router } from 'express';
import { showMap } from '../controllers/map.controller';

const router = Router();
router.get('/', showMap);

export default router;
