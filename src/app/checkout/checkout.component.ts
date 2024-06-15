import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  IPayPalConfig,
  ICreateOrderRequest
} from 'ngx-paypal';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  checkForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    address: ['', [Validators.required, Validators.minLength(4)]],
    phone: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })

  checkStatus: boolean = false
  tAmount: any = 0

  constructor(private router: Router, private fb: FormBuilder, private toastr: ToastrService, private api: ApiService) { }

  cancelCheckout() {
    sessionStorage.removeItem('cartTotal')
    this.router.navigateByUrl('/cart')
  }

  proceedToPay() {
    if (this.checkForm.valid) {
      this.checkStatus = true
      this.tAmount = sessionStorage.getItem('cartTotal')
      this.initConfig()
    }
    else {
      this.toastr.warning("Please fill the form")
    }
  }

  public payPalConfig?: IPayPalConfig;

  ngOnInit(): void {
    this.initConfig();
  }

  initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: this.tAmount,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.tAmount
              }
            }
          },
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        // this.showSuccess = true;
        this.api.emptyCart().subscribe((res: any) => {
          this.toastr.success("Payment Successfull! Transaction Completed!!")
          this.api.getCartItemCount()
          sessionStorage.removeItem('cartTotal')
          this.checkForm.reset()
          this.checkStatus=false
          this.router.navigateByUrl('/')
        })
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this.toastr.error("Transaction Cancelled!")
        this.checkStatus=false
      },
      onError: err => {
        console.log('OnError', err);
        // this.showError = true;
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
        // this.resetStatus();
      }
    };
  }

}