import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartitems: any = []
  cartTotal: any = 0
  couponStatus: boolean = false
  couponCheckStatus: boolean = false
  constructor(private api: ApiService, private toastr: ToastrService,private router:Router) { }

  ngOnInit() {
    if (sessionStorage.getItem('token')) {
      this.api.getCartItem().subscribe({
        next: (res: any) => {
          this.cartitems = res
          console.log(res)
          this.getTotalAmount()
        },
        error: (err: any) => {
          console.log(err)
        }
      })
    }
    else {
      console.log("Please Login")
    }
  }


  deleteCart(id: any) {
    this.api.removeCartItem(id).subscribe({
      next: (res: any) => {
        console.log(res)
        this.toastr.success("Item removed from cart")
        this.ngOnInit()
        this.api.getCartItemCount()
      },
      error: (err: any) => {
        console.log(err)
        this.toastr.error("Something went wrong")
      }
    })
  }

  incQuantity(id: any) {
    this.api.incCartQnty(id).subscribe({
      next: (res: any) => {
        this.toastr.success(res)
        this.ngOnInit()
      },
      error: (err: any) => {
        console.log(err)
        this.toastr.error(err.error)
      }
    })
  }

  decQuantity(id: any) {
    this.api.decCartQnty(id).subscribe({
      next: (res: any) => {
        this.toastr.success(res)
        this.ngOnInit()
        this.api.getCartItemCount()
      },
      error: (err: any) => {
        console.log(err)
        this.toastr.error(err.error)
      }
    })
  }

  emptyCartItems() {
    this.api.emptyCart().subscribe({
      next: (res: any) => {
        this.toastr.success(res)
        this.ngOnInit()
        this.api.getCartItemCount()
      },
      error: (err: any) => {
        console.log(err)
        this.toastr.error(err.error)
      }
    })
  }

  getTotalAmount() {
    this.cartTotal = Math.ceil(this.cartitems.map((item: any) => item.totalPrice).reduce((t1: any, t2: any) => t1 + t2))
  }

  offerClick() {
    this.couponStatus = true
  }

  discount50() {
    this.couponCheckStatus = true
    const discount = Math.ceil(this.cartTotal-this.cartTotal * 0.5)
    this.cartTotal = discount
  }
  discount20() {
    this.couponCheckStatus = true
    const discount = Math.ceil(this.cartTotal-this.cartTotal * 0.2)
    this.cartTotal = discount
  }
  discount5() {
    this.couponCheckStatus = true
    const discount = Math.ceil(this.cartTotal -this.cartTotal* 0.05)
    this.cartTotal = discount
  }

  checkOut(){
    sessionStorage.setItem('cartTotal',this.cartTotal)
    this.router.navigateByUrl('/check')
  }
}
