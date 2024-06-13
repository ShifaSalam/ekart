import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent {

  constructor( private fb:FormBuilder,private api:ApiService ,private router:Router,private toastr:ToastrService){}

  regForm=this.fb.group({
    username:['',[Validators.required,Validators.minLength(3),Validators.pattern('[a-zA-Z@_]*')]],
    password:['',[Validators.required,Validators.minLength(3),Validators.maxLength(10),Validators.pattern('[a-zA-Z0-9@_]*')]],
    email:['',[Validators.required,Validators.email]]
  })

  handleSubmit(){
  
    console.log(this.regForm.value)
    this.api.userRegister(this.regForm.value).subscribe({
      next:(res:any)=>{
        this.toastr.success("registration successfull")
        this.regForm.reset()
        this.router.navigateByUrl('log')
      },
      error:(err:any)=>{
          console.log(err)
          this.toastr.error(err.error)
      }
    })
  }
}