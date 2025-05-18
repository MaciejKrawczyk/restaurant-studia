import { Router } from 'express';
import {processCheckout, showPaymentForm} from '../controllers/checkout.controller';
import {showCheckout} from "../controllers/checkout.controller";

const router = Router();

router.get('/', showCheckout);
router.post('/', showPaymentForm);
router.post('/complete', processCheckout);

export default router;
