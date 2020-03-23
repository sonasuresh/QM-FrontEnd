import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor() { }
  addUser(userDetails:any){
    const data={
      name:userDetails.name,
      password:userDetails.password
    }
    return axios.post("http://localhost:9004/users/add", data)
  }
  login(userDetails:any){
    const data={
      name:userDetails.name,
      password:userDetails.password
    }
    return axios.post("http://localhost:9004/users/login", data)

  }
}
