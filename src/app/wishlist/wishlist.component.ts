import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{

  wishitems:any=[]
  constructor(private api:ApiService){}

  ngOnInit(){
    if(sessionStorage.getItem('token')){
      this.api.getWishlist().subscribe({
        next:(res:any)=>{
          this.wishitems=res
          console.log(res)
        },
        error:(err:any)=>{
          console.log(err)
        }
      })
    }
    else{
      console.log("Please Login")
    }
  }

}
