import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/user-service.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userForm: FormGroup;
  SuccessMessageFlag:boolean=false;
  FailureMessageFlag:boolean=false;
  token:String
  constructor(private userService:UserServiceService,private formBuilder: FormBuilder,private route:ActivatedRoute) { }

  ngOnInit() {
    if(!JSON.parse(localStorage.getItem('token'))){
      window.location.href="/login"
     }
    
    this.token=JSON.parse(localStorage.getItem('token'))
    this.createForm()
  }
  createForm(){
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  addUser(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get('email')
    const token=urlParams.get('token')
  //  console.log(this.userForm.value)
 
    this.userService.addUserDetails(this.userForm.value,email,token).then((res:any)=>{
      this.SuccessMessageFlag=true;
      window.location.href="/login"
    }).catch((e)=>{
      this.FailureMessageFlag=true;
    })
  }
}