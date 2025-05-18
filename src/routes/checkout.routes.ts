import { Router } from 'express';
import {showCheckout, processCheckout} from '../controllers/checkout.controller';

const router = Router();

router.get('/', showCheckout);
router.post('/', processCheckout);

export default router;
