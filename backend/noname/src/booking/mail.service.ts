import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { hostname } from 'os';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: 'wayztourandtravels.ca',
    port: 465,
    secure: true, // Use true for 465, false for other ports
    auth: {
      user: 'no-reply@wayztourandtravels.ca',
      pass: 'WayzNoReply@123',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  async sendPaymentEmail(clientDetail: any): Promise<void> {

    
    const subject = 'Payment Received - Booking Confirmation in Progress';

    const body = `
      <h1>Payment Received - Your Booking is Being Processed</h1>
      <p>Dear ${clientDetail.firstName.toUpperCase()},</p>

      <p>Thank you for choosing our services. We have received your payment with <strong>Payment ID: ${clientDetail.paymentId}</strong>.</p>

      <h2>Booking Details</h2>
      <p><strong>Full Name:</strong> ${clientDetail.firstName}</p>
      <p><strong>Email:</strong> ${clientDetail.email}</p>
      <p><strong>Contact:</strong> ${clientDetail.contact}</p>
      <p><strong>Number of Travelers:</strong> ${clientDetail.numberOfTravelers}</p>
      <p><strong>Number of Infants:</strong> ${clientDetail.infants}</p>
      <p><strong>Travel Date:</strong> ${clientDetail.date}</p>
      <p><strong>Trip Protection:</strong> ${clientDetail.tripProtection ? 'Yes' : 'No'}</p>
      <p><strong>Total Cost:</strong> $${clientDetail.totalCost} USD</p>
      <p><strong>Payment Status:</strong> ${clientDetail.paymentStatus ? 'Paid' : 'Pending'}</p>
      <p><strong>Booking Status:</strong> ${clientDetail.bookingStatus ? 'Confirmed' : 'Pending Confirmation'}</p>

      <p>Our team is currently processing your booking. We will notify you once it is confirmed.</p>

      <p style='text-align: center;'>
        <a href='http://wayztourandtravels.ca/booking/${clientDetail.uuid}' 
           style='padding: 12px 20px; font-size: 16px; color: #fff; background-color: #D4AF37; text-decoration: none; border-radius: 5px; font-weight: bold;'>
          View Your Booking
        </a>
      </p>

      <p><strong>Best regards,</strong></p>
      <p>HR - Wayz Tour and Travels</p>
    `;

    await this.transporter.sendMail({
      from: `"Wayz Tour and Travels" <no-reply@wayztourandtravels.ca>`,
      to: clientDetail.email,
      subject: subject,
      html: body,
    });
  }

  async sendConfirmationEmail(clientDetail: any): Promise<void> {

    const subject = 'Booking Confirmed - Get Ready for Your Trip!';
  
    const body = `
      <h1>Booking Confirmed!</h1>
      <p>Dear ${clientDetail.firstName.toUpperCase()},</p>
  
      <p>We’re excited to let you know that your booking has been <strong>successfully confirmed</strong>.</p>
      <p>Thank you once again for choosing Wayz Tour and Travels.</p>
  
      <h2>Booking Summary</h2>
      <p><strong>Full Name:</strong> ${clientDetail.firstName}</p>
      <p><strong>Email:</strong> ${clientDetail.email}</p>
      <p><strong>Contact:</strong> ${clientDetail.contact}</p>
      <p><strong>Number of Travelers:</strong> ${clientDetail.numberOfTravelers}</p>
      <p><strong>Number of Infants:</strong> ${clientDetail.infants}</p>
      <p><strong>Travel Date:</strong> ${clientDetail.date}</p>
      <p><strong>Trip Protection:</strong> ${clientDetail.tripProtection ? 'Yes' : 'No'}</p>
      <p><strong>Total Cost:</strong> $${clientDetail.totalCost} USD</p>
      <p><strong>Payment Status:</strong> Paid</p>
      <p><strong>Booking Status:</strong> Confirmed</p>
  
  
      <p style='text-align: center;'>
        <a href='http://wayztourandtravels.ca/booking/${clientDetail.uuid}' 
           style='padding: 12px 20px; font-size: 16px; color: #fff; background-color: #28a745; text-decoration: none; border-radius: 5px; font-weight: bold;'>
          View Booking Details
        </a>
      </p>
  
  
      <p><strong>Best regards,</strong></p>
      <p>HR - Wayz Tour and Travels</p>
    `;
  
    await this.transporter.sendMail({
      from: `"Wayz Tour and Travels" <no-reply@wayztourandtravels.ca>`,
      to: clientDetail.email,
      subject: subject,
      html: body,
    });
  }

  async sendRefundInitiatedEmail(clientDetail: any): Promise<void> {

    const subject = 'Refund Initiated - Wayz Tour and Travels';
  
    const body = `
      <h1>Refund Process Initiated</h1>
      <p>Dear ${clientDetail.firstName.toUpperCase()},</p>
  
      <p>We would like to inform you that your refund request has been <strong>successfully initiated</strong>.</p>
      <p>The refunded amount will be credited back to your original payment method within the next few business days, depending on your bank or card issuer.</p>
  
      <h2>Refund Summary</h2>
      <p><strong>Full Name:</strong> ${clientDetail.firstName}</p>
      <p><strong>Email:</strong> ${clientDetail.email}</p>
      <p><strong>Contact:</strong> ${clientDetail.contact}</p>
      <p><strong>Payment ID:</strong> ${clientDetail.paymentId}</p>
      <p><strong>Refund Amount:</strong> $${clientDetail.totalCost} USD</p>
      <p><strong>Refund Status:</strong> Initiated</p>
  
      <p style='text-align: center;'>
        <a href='http://wayztourandtravels.ca/booking/${clientDetail.uuid}' 
           style='padding: 12px 20px; font-size: 16px; color: #fff; background-color: #dc3545; text-decoration: none; border-radius: 5px; font-weight: bold;'>
          View Booking Status
        </a>
      </p>
  
      <p>If you have any questions regarding your refund, please feel free to contact our support team at 
        <a href="mailto:support@wayztourandtravels.ca">support@wayztourandtravels.ca</a>.
      </p>
  
      <p><strong>Best regards,</strong></p>
      <p>HR - Wayz Tour and Travels</p>
    `;
  
    await this.transporter.sendMail({
      from: `"Wayz Tour and Travels" <no-reply@wayztourandtravels.ca>`,
      to: clientDetail.email,
      subject: subject,
      html: body,
    });
  }
  

  
}
