import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  products:any=[]
  constructor(private api:ApiService,private toastr:ToastrService){}

  ngOnInit():void{
    this.api.allProducts().subscribe({
      next:(res:any)=>{
        console.log(res)
        this.products=res
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
}
