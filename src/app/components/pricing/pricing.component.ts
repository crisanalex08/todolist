import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CheckoutDialogComponent } from '../checkout-dialog/checkout-dialog.component';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css'],
})
export class PricingComponent {
  constructor(private router: Router, private dialog: MatDialog) {}

  goToCheckout(option: number) {
    if (option == 1) {
      var title: string = 'Upgrade to Pro plan';
      var description: string =
        'Power up your productivity with Pro features, like reminders, extra projects, and more.';
      const dialogRef = this.dialog.open(CheckoutDialogComponent, {
        data: {
          title: title,
          description: description,
          price: 49
        },
      });
    }
    if (option == 2) {
      var title: string = 'Upgrade to Exclusive plan';
      var description: string =
        'Get all the features of Pro, plus unlimited projects, team management tools, and more.';
      const dialogRef = this.dialog.open(CheckoutDialogComponent, {
        data: {
          title: title,
          description: description,
          price: 99
        },
      });
    }
  }
  getStarted() {
    this.router.navigate(['/auth/signup']);
  }
}
