import { v4 as uuidv4 } from 'uuid';

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  errorMessage?: string;
}

interface CardParams {
  userId: string;
  number: string;
  name: string;
  exp: string;
  cvc: string;
  amount: number;
}

interface BlikParams {
  userId: string;
  code: string;
  amount: number;
}

export class PaymentService {
  async processCard(params: CardParams): Promise<PaymentResult> {
    if (!/^\d{13,19}$/.test(params.number.replace(/\s+/g, ''))) {
      return { success: false, errorMessage: 'Invalid card number' };
    }
    if (!/^\d{2}\/\d{2}$/.test(params.exp)) {
      return { success: false, errorMessage: 'Invalid expiry date format' };
    }
    if (!/^\d{3,4}$/.test(params.cvc)) {
      return { success: false, errorMessage: 'Invalid CVC' };
    }

    await new Promise(r => setTimeout(r, 300));

    return {
      success: true,
      transactionId: `CARD-${uuidv4()}`
    };
  }

  async processBlik(params: BlikParams): Promise<PaymentResult> {
    if (!/^\d{6}$/.test(params.code)) {
      return { success: false, errorMessage: 'BLIK code must consist of 6 digits' };
    }

    await new Promise(r => setTimeout(r, 200));

    const ok = Math.random() < 0.7;
    return ok
      ? { success: true, transactionId: `BLIK-${uuidv4()}` }
      : { success: false, errorMessage: 'BLIK transaction was declined by the bank' };
  }
}

export const paymentService = new PaymentService();