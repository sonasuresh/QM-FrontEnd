import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/user-service.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  userForm: FormGroup;

  constructor(private userService:UserServiceService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm()
  }
  createForm(){
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  addUser(){
    this.userService.addUser(this.userForm.value).then((res:any)=>{
      alert('User Added Successfully..!')
    }).catch((e)=>{
      alert('Error Occurred in Adding New User...!Try Again')
    })
  }

}
