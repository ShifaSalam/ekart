import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base_url:any="http://localhost:3000"

  constructor(private http:HttpClient) { }

  allProducts(){
    return this.http.get(`${this.base_url}/all-products`)
  }

  singleProduct(id:any){
    return this.http.get(`${this.base_url}/single-product/${id}`)
  }

  userRegister(data:any){
    return this.http.post(`${this.base_url}/register`,data)
  }

  userLogin(data:any){
    return this.http.post(`${this.base_url}/login`,data)
  }

  // WISHLIST



  addWish(data:any){

  }
}
