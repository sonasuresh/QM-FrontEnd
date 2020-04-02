import { Injectable } from '@angular/core';
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {

  constructor() { }
  getActiveQuestions(auth_token) {
    const headers={
      'Authorization': 'Bearer ' +auth_token
    }
    return axios.get("http://localhost:9004/questions/activated",{headers:headers})
  }
  getDeactiveQuestions(auth_token){
    const headers={
      'Authorization': 'Bearer ' +auth_token
    }
    return axios.get("http://localhost:9004/questions/deactivated",{headers:headers})
  }
  getQuestionsBasedOnTags(id: any,status:any,auth_token) {
    const params = {
      tagName: id,
      status:status
    }
    const headers={
      'Authorization': 'Bearer ' +auth_token
    }
    return axios.get("http://localhost:9004/questions/basedontags", { params,headers:headers})
  }
  pageRecord(records:any,pageNo:any,auth_token){
    const params = {
      pageSize: records,
      pageNo:pageNo
    }
    const headers={
      'Authorization': 'Bearer ' +auth_token
    }
    return axios.get("http://localhost:9004/questions/activated",{params,headers:headers})
  }
  pageRecordDeactivated(records:any,pageNo:any,auth_token){
    const params = {
      pageSize: records,
      pageNo:pageNo
    }
    const headers={
      'Authorization': 'Bearer ' +auth_token
    }
    return axios.get("http://localhost:9004/questions/deactivated",{params,headers:headers})
  }

 
  getLevels(auth_token){
    const headers={
      'Authorization': 'Bearer ' +auth_token
    }
    return axios.get("http://localhost:9004/questions/levels",{headers:headers})
  }
  getTypes(auth_token){
    const headers={
      'Authorization': 'Bearer ' +auth_token
    }
    return axios.get("http://localhost:9004/questions/types",{headers:headers})
  }
  getCategories(auth_token){
    const headers={
      'Authorization': 'Bearer ' +auth_token
    }
    return axios.get("http://localhost:9004/questions/categories",{headers:headers})
  }
  deleteQuestion(data:number[],auth_token){
    const body = {
      id: [1,2]
    };
    const headers={
      'Authorization': 'Bearer ' +auth_token
    }
    return axios.delete("http://localhost:9004/questions/delete",{
      data: {
        id: data
      ,headers:headers}
 });
  }
  updateQuestionStatus(status:any,data:number[],auth_token){
    const body = {
      "id":data,
      "status":status
    };
    const headers={
      'Authorization': 'Bearer ' +auth_token
    }
    return axios.put("http://localhost:9004/questions/updatestatus",body,{headers:headers});
  }
  getQuestionDetails(id:any){
    const params = {
      id: id,
    }
    return axios.get("http://localhost:9004/questions/", { params }) 
  }
  addQuestion(questionPayload:any,auth_token){
    const data={
      ...questionPayload
    }
    const headers={
      'Authorization': 'Bearer ' +auth_token
    }
    return axios.post("http://localhost:9004/questions/add", data,{headers:headers})
  }
  getMatchDetails(id:any,auth_token){
    const params={
      qid:id
    }
    const headers={
      'Authorization': 'Bearer ' +auth_token
    }
    return axios.get("http://localhost:9004/questions/match/",{params,headers:headers})
  }
  getBestChoiceDetails(id:any,auth_token){
    const params={
      qid:id
    }
    const headers={
      'Authorization': 'Bearer ' +auth_token
    }
    return axios.get("http://localhost:9004/questions/bestchoice/",{params,headers:headers})
  }
  getMultipleChoiceDetails(id:any,auth_token){
    const params={
      qid:id
    }
    const headers={
      'Authorization': 'Bearer ' +auth_token
    }
    return axios.get("http://localhost:9004/questions/multiplechoice/",{params,headers:headers})
  }
  updateQuestion(questionPayload:any,auth_token){
    const data={
      ...questionPayload
    }
    const headers={
      'Authorization': 'Bearer ' +auth_token
    }
    return axios.put("http://localhost:9004/questions/edit", data,{headers:headers})
  }
}