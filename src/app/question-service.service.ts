import { Injectable } from '@angular/core';
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {

  constructor() { }
  getActiveQuestions() {
    return axios.get("http://localhost:9004/questions/activated")
  }
  getDeactiveQuestions(){
    return axios.get("http://localhost:9004/questions/deactivated")
  }
  getQuestionsBasedOnTags(id: any,status:any) {
    const params = {
      tagName: id,
      status:status
    }
    return axios.get("http://localhost:9004/questions/basedontags", { params })
  }
  pageRecord(records:any,pageNo:any){
    const params = {
      pageSize: records,
      pageNo:pageNo
    }
    return axios.get("http://localhost:9004/questions/activated",{params})
  }
  pageRecordDeactivated(records:any,pageNo:any){
    const params = {
      pageSize: records,
      pageNo:pageNo
    }
    return axios.get("http://localhost:9004/questions/deactivated",{params})
  }

 
  getLevels(){
    return axios.get("http://localhost:9004/questions/levels")
  }
  getTypes(){
    return axios.get("http://localhost:9004/questions/types")
  }
  getCategories(){
    return axios.get("http://localhost:9004/questions/categories")
  }
  deleteQuestion(data:number[]){
    const body = {
      id: [1,2]
    };
    return axios.delete("http://localhost:9004/questions/delete",{
      data: {
        id: data
      }
    });
  }
  updateQuestionStatus(status:any,data:number[]){
    const body = {
      "id":data,
      "status":status
    };
    return axios.put("http://localhost:9004/questions/updatestatus",body);
  }
  getQuestionDetails(id:any){
    const params = {
      id: id,
    }
    return axios.get("http://localhost:9004/questions/", { params }) 
  }
  addQuestion(questionPayload:any){
    const data={
      ...questionPayload
    }
    return axios.post("http://localhost:9004/questions/add", data)
  }
  getMatchDetails(id:any){
    const params={
      qid:id
    }
    return axios.get("http://localhost:9004/questions/match/",{params})
  }
  getBestChoiceDetails(id:any){
    const params={
      qid:id
    }
    return axios.get("http://localhost:9004/questions/bestchoice/",{params})
  }
  getMultipleChoiceDetails(id:any){
    const params={
      qid:id
    }
    return axios.get("http://localhost:9004/questions/multiplechoice/",{params})
  }
  updateQuestion(questionPayload:any){
    const data={
      ...questionPayload
    }
    return axios.put("http://localhost:9004/questions/edit", data)
  }
}