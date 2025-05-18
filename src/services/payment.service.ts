export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  errorMessage?: string;
}

export class PaymentService {
  async processPayment(userId: number, amount: number): Promise<PaymentResult> {
    await new Promise(r => setTimeout(r, 500));
    const success = Math.random() < 0.9;
    if (success) {
      return {
        success: true,
        transactionId: `SIM-${Date.now()}-${Math.floor(Math.random()*10000)}`
      };
    } else {
      return {
        success: false,
        errorMessage: 'Your payment was declined. Please try again.'
      };
    }
  }
}

export const paymentService = new PaymentService();
