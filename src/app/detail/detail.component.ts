import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  pid:any=""
  product:any={}

  constructor(private ar:ActivatedRoute,private api:ApiService,private toastr:ToastrService){
    this.ar.params.subscribe((res:any)=>{
      console.log(res)
      this.pid=res.id
      // console.log(this.product)
    })
  }
  ngOnInit(): void {
    this.api.singleProduct(this.pid).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.product=res

      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }

  addtoWishlist(product:any){
    if(sessionStorage.getItem('token')){
      const {id,title,description,price,category,image,rating}=product
      this.api.addWish({id,title,description,price,category,image,rating}).subscribe({
        next:(res:any)=>{
          // console.log(res)
          this.toastr.success("Product Added to Wishlist")
          this.api.getWishlistItemCount()

        },
        error:(err:any)=>{
          console.log(err)
          this.toastr.error(err.error)
        }
      })
    }
    else{
      this.toastr.warning("Please Login First!")
    }
  }

  addCartItem(product:any){
    if(sessionStorage.getItem('token')){
      const {id,title,price,image}=product
      this.api.addToCart({id,title,price,image}).subscribe({
        next:(res:any)=>{
          this.toastr.success(res)
          this.api.getCartItemCount()

        },
        error:(err:any)=>{
          console.log(err)
          this.toastr.error(err.error)
        }
      })
    }
    else{
      this.toastr.warning("Please login first!")
    }
  }



}
