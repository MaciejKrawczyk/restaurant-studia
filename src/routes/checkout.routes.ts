import {Router} from 'express';
import {processCheckout, showCheckout, showPaymentForm} from '../controllers/checkout.controller';

const router = Router();

router.get('/', showCheckout);
router.post('/', showPaymentForm);
router.post('/complete', processCheckout);

export default router;
