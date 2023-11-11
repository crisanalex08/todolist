import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  constructor(private router: Router, private snackBar: MatSnackBar) { }
  paymentProcessing: boolean = false;

  async makePayment(): Promise<void> {
    this.paymentProcessing = true;
    // Simulate a transaction delay for 3 seconds
    setTimeout(() => {
      // Simulated success, you may include actual payment logic here
      this.paymentProcessing = false;
      this.snackBar.open('Payment successful!');
    }, 3000);
    await new Promise(f => setTimeout(f, 3000));

    this.router.navigate(['/auth/signup']);
  }

  cancelPayment(): void {
    this.router.navigate(['/pricing']);
  }
}
