import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base_url:any="https://e-kart-server-z638.onrender.com"

  wishCountBS=new BehaviorSubject(0)
  cartCountBS=new BehaviorSubject(0)
  searchKeyBS=new BehaviorSubject("")

  constructor(private http:HttpClient) { 
    if(sessionStorage.getItem('token')){
      this.getWishlistItemCount()
      this.getCartItemCount()
    }
  }

  getWishlistItemCount(){
    this.getWishlist().subscribe((res:any)=>{
      this.wishCountBS.next(res.length)
    })
  }

  getCartItemCount(){
    this.getCartItem().subscribe((res:any)=>{
      this.cartCountBS.next(res.length)
    })
  }

  // PRODUCTS

  allProducts(){
    return this.http.get(`${this.base_url}/all-products`)
  }

  singleProduct(id:any){
    return this.http.get(`${this.base_url}/single-product/${id}`)
  }

  // AUTHENTICATION

  userRegister(data:any){
    return this.http.post(`${this.base_url}/register`,data)
  }

  userLogin(data:any){
    return this.http.post(`${this.base_url}/login`,data)
  }

  // WISHLIST

  appendTokenToHeader(){
    const token=sessionStorage.getItem('token')
    let headers=new HttpHeaders()
    if(token){
      headers=headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }

  addWish(data:any){
    return this.http.post(`${this.base_url}/addwish`,data,this.appendTokenToHeader())
  }

  getWishlist(){
    return this.http.get(`${this.base_url}/getwish`,this.appendTokenToHeader())
  }

  removeWish(id:any){
    return this.http.delete(`${this.base_url}/removewish/${id}`,this.appendTokenToHeader())
  }

  // CART

  addToCart(data:any){
    return this.http.post(`${this.base_url}/addcart`,data,this.appendTokenToHeader())
  }

  getCartItem(){
    return this.http.get(`${this.base_url}/getcart`,this.appendTokenToHeader())
  }

  removeCartItem(id:any){
    return this.http.delete(`${this.base_url}/removecart/${id}`,this.appendTokenToHeader())
  }

  incCartQnty(id:any){
    return this.http.get(`${this.base_url}/inccart/${id}`,this.appendTokenToHeader())
  }

  decCartQnty(id:any){
    return this.http.get(`${this.base_url}/deccart/${id}`,this.appendTokenToHeader())
  }

  emptyCart(){
    return this.http.delete(`${this.base_url}/emptycart`,this.appendTokenToHeader())
  }

  isLoggedIn(){
    return !!sessionStorage.getItem('token')
  }

}
