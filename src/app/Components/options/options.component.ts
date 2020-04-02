import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/user-service.service';


@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  test:String
  constructor(private userService:UserServiceService) { }
ngOnInit() {
  if(JSON.parse(localStorage.getItem('token')).token){
    this.getValue();
  }
  
}
getValue(){
  this.userService.getValue(JSON.parse(localStorage.getItem('token')).token).then((res:any)=>{
    console.log(res.data);
  })
}
}
