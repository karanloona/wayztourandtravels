import { Injectable } from '@nestjs/common';
import * as paypal from '@paypal/checkout-server-sdk';

@Injectable()
export class PaypalService {
  private clientId = 'AYon5b5EJmngl9HrqYfpCnZcbtRWycTFtFRK3QvmknIbsr5gbx2jyVAqHkBRsdzk5rg9a4_Z1MtwrKwd';
  private clientSecret = 'EN0mL1sEQXKUi40W6hakcaHW-iuBdDMA5eGxJsM9ayWH9LuAe2nAi6pWAhDmsCWn8RevzXVK7QP3hmqK';
  private environment = new paypal.core.LiveEnvironment(this.clientId, this.clientSecret);
  private client = new paypal.core.PayPalHttpClient(this.environment);

  async createOrder(amount: string, currency: string, description: string) {
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount,
          },
          description,
        },
      ],
    });

    const response = await this.client.execute(request);
    return { orderID: response.result.id };
  }

  async captureOrder(orderID: string) {
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});
    const response = await this.client.execute(request);
    return response.result;
  }
}