import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base_url:any="http://localhost:3000"

  constructor(private http:HttpClient) { }

  // PRODUCTS

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
}
