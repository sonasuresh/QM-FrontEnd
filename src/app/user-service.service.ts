import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor() { }
  addUser(userDetails:any,auth_token){
    const headers={
      'Authorization': 'Bearer ' +auth_token
    } 
    const data={
      email:userDetails.name,
      roleId:userDetails.role
    }
    return axios.post("http://localhost:9004/users/add", data,{headers:headers})
  }
  addUserDetails(userDetails:any,email:String,auth_token){
    const data={
      email:email,
      name:userDetails.name,
      password:userDetails.password
    }
    const headers={
      'Authorization': 'Bearer ' +auth_token
    }
    console.log(data,headers)
   // return null;
   return axios.put("http://localhost:9004/users/edit",data,{headers:headers})
  }
  login(userDetails:any){
    const data={
      username:userDetails.name,
      password:userDetails.password
    }
    return axios.post("http://localhost:9004/authenticate", data)

  }
  sendInvite(userDetails:any,auth_token,jwt:String){
    const headers={
      'Authorization': 'Bearer ' +auth_token
    } 
    const data={
      to_address:userDetails.name,
	    subject:"Invitation to Sign Up..!QUESTIONS MODULE!",
    	body:"Sign Up with the provided link: " +" "+ "http://localhost:4200/newuser?token="+jwt +"&email="+userDetails.name
    }
  //   const data1={
  //     email:userDetails.name,
  //     roleId:
  //   }
  //  axios.post("http://localhost:9004/send", data,{headers:headers})
    return axios.post("http://localhost:9004/send", data,{headers:headers})

  }
  getRoles(auth_token){
    const headers={
      'Authorization': 'Bearer ' +auth_token
    }
    return axios.get("http://localhost:9004/role/",{headers:headers})
  }
  getValue(auth_token){
    const headers={
      'Authorization': 'Bearer ' +auth_token
    }
    return axios.get("http://localhost:9004/test/admin",{headers:headers})
  }
}
