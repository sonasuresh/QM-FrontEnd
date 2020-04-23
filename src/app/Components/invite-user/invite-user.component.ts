import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/user-service.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, NgForm } from '@angular/forms';

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.css']
})
export class InviteUserComponent implements OnInit {

  userForm: FormGroup;
  token:String
  roles: Array<any> = []
  roleId:any=[]
  jwttoken:String
  SuccessMessageFlag:boolean=false;
  FailureMessageFlag:boolean=false;

  constructor(private userService:UserServiceService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    if(!JSON.parse(localStorage.getItem('token'))){
      window.location.href="/login"
     }
    
    this.token=JSON.parse(localStorage.getItem('token'))
      
    
    this.createForm()
    this.getRoles()
  }
  getRoles(){
    this.userService.getRoles(this.token).then((res:any)=>{
      this.roles=res.data
      console.log(this.roles)
    })
  }
  createForm(){
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      role:['',Validators.required]
    });
  }
 
  sendInvite(){
    //this.roleId=this.userForm.get('role').value
    
   console.log(this.userForm.value)
   this.userService.addUser(this.userForm.value,this.token).then((res:any)=>{
     const login={
       name:res.data.username,
       password:res.data.password
     }
      this.userService.login(login).then((res:any)=>{
       this.jwttoken=res.data.jwt
        // console.log(res.data)
    this.userService.sendInvite(this.userForm.value,this.token,this.jwttoken).then((res:any)=>{
      this.SuccessMessageFlag=true;
      window.location.reload();
    }).catch((e)=>{
      this.FailureMessageFlag=true;

    }) 
      })
    
  })
   
   }


}
