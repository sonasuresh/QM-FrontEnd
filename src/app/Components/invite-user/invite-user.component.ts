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
    this.userService.sendInvite(this.userForm.value,this.token).then((res:any)=>{
      this.userService.addUser(this.userForm.value,this.token).then((res:any)=>{
        
      })
      alert('Invitation Sent Successfully..!')
    }).catch((e)=>{
      alert('Error Occurred...!Try Again')
    })
   }


}
