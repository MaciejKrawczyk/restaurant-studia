import { Request, Response } from 'express';
import { cartService } from '../services/cart.service';
import { paymentService } from '../services/payment.service';

function calcTotal(cart: Array<{ price: number; quantity: number }>) {
  return cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

export const showCheckout = (req: Request, res: Response) => {
  const cart  = cartService.getCart(req);
  const total = calcTotal(cart);
  res.render('checkout', { cart, total });
};

export const showPaymentForm = (req: Request, res: Response) => {
  const cart   = cartService.getCart(req);
  const total  = calcTotal(cart);
  const method = req.body.paymentMethod as 'card' | 'blik';

  if (!method || !['card','blik'].includes(method)) {
    return res.redirect('/checkout');
  }

  res.render(
    `checkout-${method}`,
    { cart, total }
  );
};

export const processCheckout = async (req: Request, res: Response) => {
  const cart   = cartService.getCart(req);
  const total  = calcTotal(cart);
  const method = req.body.method as 'card' | 'blik';

  const rawUserId = req.session.userId!;
  const userId    = String(rawUserId);

  try {
    let result = method === 'card'
      ? await paymentService.processCard({
          userId,
          number: req.body.cardNumber,
          name:   req.body.cardName,
          exp:    req.body.cardExp,
          cvc:    req.body.cardCvc,
          amount: total
        })
      : await paymentService.processBlik({
          userId,
          code:   req.body.blikCode,
          amount: total
        });

    if (result.success) {
      cartService.clearCart(req);
      return res.render('checkout-success', {
        transactionId: result.transactionId,
        amount:        total
      });
    }

    const locals: any = { cart, total, error: result.errorMessage };

    if (method === 'card') {
      Object.assign(locals, {
        cardNumber: req.body.cardNumber,
        cardName:   req.body.cardName,
        cardExp:    req.body.cardExp,
        cardCvc:    req.body.cardCvc
      });
      return res.render('checkout-card', locals);
    } else {
      Object.assign(locals, {
        blikCode: req.body.blikCode
      });
      return res.render('checkout-blik', locals);
    }

  } catch (err: any) {
    const locals: any = { cart, total, error: err.message };
    if (method === 'card') {
      Object.assign(locals, {
        cardNumber: req.body.cardNumber,
        cardName:   req.body.cardName,
        cardExp:    req.body.cardExp,
        cardCvc:    req.body.cardCvc
      });
      return res.render('checkout-card', locals);
    } else {
      Object.assign(locals, {
        blikCode: req.body.blikCode
      });
      return res.render('checkout-blik', locals);
    }
  }
};
