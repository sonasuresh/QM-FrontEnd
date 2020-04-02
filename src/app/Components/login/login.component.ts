import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/user-service.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private router:Router,private userService:UserServiceService,private formBuilder: FormBuilder) { }


  ngOnInit() {
    localStorage.clear();
    this.createForm()
  }
  createForm(){
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(){
    this.userService.login(this.loginForm.value).then((res:any)=>{
      const token= res.data.jwt;
      localStorage.setItem('token', JSON.stringify(token));
        this.router.navigate(['']) 
}).catch((e)=>{
  alert("Invalid Credentials")
})
  } 


}
