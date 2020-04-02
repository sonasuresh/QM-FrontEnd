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
  login(userDetails:any){
    const data={
      username:userDetails.name,
      password:userDetails.password
    }
    return axios.post("http://localhost:9004/authenticate", data)

  }
  sendInvite(userDetails:any,auth_token){
    const headers={
      'Authorization': 'Bearer ' +auth_token
    } 
    const data={
      to_address:userDetails.name,
	    subject:"Invitation to Sign In..!",
    	body:"http://localhost:4200/newuser"
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
