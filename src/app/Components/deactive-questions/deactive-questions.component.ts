import { Component, OnInit } from '@angular/core';
import { QuestionServiceService } from 'src/app/question-service.service';


@Component({
  selector: 'app-deactive-questions',
  templateUrl: './deactive-questions.component.html',
  styleUrls: ['./deactive-questions.component.css']
})
export class DeactiveQuestionsComponent implements OnInit {
  deactiveQuestions: Array<any> = []
  selectedRecords:number=10;
  totalPages:number
  pageNo:number=0;
  matchDetails: Array<any> = []


  deactiveQuestionsLength:number;
  masterSelected:boolean;
  checklist:any;
  checkedList:number[];
  id:number[];
  questionDetails:any
  option:any
  activateSuccessMessageFlag:boolean=false;
  activateFailureMessageFlag:boolean=false;
  deleteSuccessMessageFlag:boolean=false;
  deleteFailureMessageFlag:boolean=false;
  token:String


  constructor(private questionService:QuestionServiceService) { }

  ngOnInit() {
    if(!JSON.parse(localStorage.getItem('token'))){
      window.location.href="/login"
     }
  
    this.token=JSON.parse(localStorage.getItem('token'))
    this.getDeactivatedQuestions();
  
  }
  getDeactivatedQuestions= () => {
    this.questionService.getDeactiveQuestions(this.token).then((res: any) => {
      this.deactiveQuestions = res.data.content
      this.totalPages=res.data.totalPages;
      this.deactiveQuestionsLength=this.deactiveQuestions.length;
    })
  }
  checkUncheckAll() {
    for (var i = 0; i < this.deactiveQuestionsLength; i++) {
      this.deactiveQuestions[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }
  isAllSelected() {
    const isselected = function(item:any) {
      return item.isSelected == true;
    }
    this.masterSelected = this.deactiveQuestions.every(isselected);
    // this.masterSelected = this.activeQuestions.every(function(item:any) {
    //     return item.isSelected == true;
    //   })
    this.getCheckedItemList();
  }
  getCheckedItemList(){
    this.checkedList = [];
    for (var i = 0; i < this.deactiveQuestionsLength; i++) {
      if(this.deactiveQuestions[i].isSelected)
      this.checkedList.push(this.deactiveQuestions[i].id);
     
    }
  }

  getActiveQuestions= () => {
    window.location.href="";
  }
  onEnter(value:string){
    status="deactive"
    this.questionService.getQuestionsBasedOnTags(value,status,this.token).then((res:any)=>{
      if(value.length==0){
        this.getDeactivatedQuestions();
        return;
      }
      if(res.data==""){
        this.getDeactivatedQuestions();
      }
      this.totalPages=res.data.totalPages;
      this.deactiveQuestions=res.data.content;
    })
  }
  deleteQuestion(){
    if(confirm("Are you sure to delete this Question?")){
    this.questionService.deleteQuestion(this.checkedList,this.token).then((res: any) => {this.deleteSuccessMessageFlag=true;this.getDeactivatedQuestions();}).catch(
      (e) => this.deleteFailureMessageFlag=true)    
    }
  }
  activateQuestion(){
    if(confirm("Are you sure to activate this Question?")){
    const status="active";
    this.questionService.updateQuestionStatus(status,this.checkedList,this.token).then((res: any) => { this.activateSuccessMessageFlag=true;this.getDeactivatedQuestions();}).catch(
      () =>this.activateFailureMessageFlag=true)
    }
  }
  activateThisQuestion(value:number){
    if(confirm("Are you sure to activate this Question?")){
      this.id=[];
      const status="active";
      this.id.push(value)
       this.questionService.updateQuestionStatus(status,this.id,this.token).then((res: any) => {this.activateSuccessMessageFlag=true;this.getDeactivatedQuestions();}).catch(
         () =>this.activateFailureMessageFlag=true)
    }
   
  }
  counter(totalPages: number) {
    return new Array(totalPages);
}
  selectPageChangeHandler (event: any) {
    this.selectedRecords = event.target.value;
    //console.log(this.pageNo)
    this.questionService.pageRecordDeactivated(this.selectedRecords,this.pageNo,this.token).then((res:any)=>{
      this.totalPages=res.data.totalPages;
      this.deactiveQuestions=res.data.content;
      
    })
  }
  onSelectPage(pageNumber:number){
    this.pageNo=pageNumber
    this.questionService.pageRecordDeactivated(this.selectedRecords,this.pageNo,this.token).then((res:any)=>{
     this.totalPages=res.data.totalPages;
     this.deactiveQuestions=res.data.content;
     
   })
   // console.log(this.selectedRecords)
   }
  deleteThisQuestion(value:number){
    if(confirm("Are you sure to delete this Question?")){
    this.id=[];
    this.id.push(value)
    this.questionService.deleteQuestion(this.id,this.token).then((res: any) => {this.deleteSuccessMessageFlag=true;this.getDeactivatedQuestions();}).catch(
      (e) =>this.deleteFailureMessageFlag=true)
    }
  }
  getDetails(id:any){
    this.questionService.getQuestionDetails(id).then((res: any) => {
      this.questionDetails=res.data
      this.option=(JSON.parse(this.questionDetails.option))
      var type_id = this.questionDetails.type_Id.id
    if(type_id==5){
      this.questionService.getMatchDetails(id,this.token).then((res:any)=>{
        console.log(res.data)
        this.matchDetails=res.data
      })
    }
    })
  }
}
