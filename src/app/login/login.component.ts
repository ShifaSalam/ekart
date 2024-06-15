import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fb:FormBuilder,private toastr:ToastrService,private api:ApiService,private router:Router){}

  logForm=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(3),Validators.pattern('[a-zA-Z0-9@_]*')]]
  })

  handleLogin(){
    console.log(this.logForm.value)
    this.api.userLogin(this.logForm.value).subscribe({
      next:(res:any)=>{
        this.toastr.success("Login Successfull!")
        sessionStorage.setItem('userDetail',JSON.stringify(res.existingUser))
        sessionStorage.setItem('token',res.token)
        this.logForm.reset()
        this.router.navigateByUrl('')
        console.log(res)
        this.api.getWishlistItemCount()
        this.api.getCartItemCount()

      },
      error:(err:any)=>{
        console.log(err)
        this.toastr.error(err.error)
      }
    })
  }

}
