import { Request, Response } from 'express';
import { cartService } from '../services/cart.service';
import { paymentService } from '../services/payment.service';

export const showCheckout = (req: Request, res: Response) => {
  const cart = cartService.getCart(req);
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  res.render('checkout', { cart, total });
};

export const processCheckout = async (req: Request, res: Response) => {
  const cart = cartService.getCart(req);
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  try {
    const result = await paymentService.processPayment(req.session.userId!, total);
    if (result.success) {
      cartService.clearCart(req);
      res.render('checkout-success', { transactionId: result.transactionId, amount: total });
    } else {
      res.render('checkout-failure', { error: result.errorMessage });
    }
  } catch (err: any) {
    res.render('checkout-failure', { error: err.message });
  }
};
