import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-checkout-dialog',
  templateUrl: './checkout-dialog.component.html',
  styleUrls: ['./checkout-dialog.component.css']
})
export class CheckoutDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CheckOutDialogData>,
    @Inject(MAT_DIALOG_DATA) public data: CheckOutDialogData,
    private router: Router
  ) {}

  onCheckout(price: number) {
    this.router.navigate(['/checkout', price]);
  }
}



export interface CheckOutDialogData {
  title: string;
  description: string;
  price: number;
}