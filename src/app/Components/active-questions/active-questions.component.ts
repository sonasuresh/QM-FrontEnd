import { Component, OnInit } from '@angular/core';
import { QuestionServiceService } from 'src/app/question-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-active-questions',
  templateUrl: './active-questions.component.html',
  // template: `
  // <app-update-questions [message]="message"></app-update-questions>
  // `,
  styleUrls: ['./active-questions.component.css']
})
export class ActiveQuestionsComponent implements OnInit {

  activeQuestions: Array<any> = []
  matchDetails: Array<any> = []
  bestChoiceDetails:Array<any>=[]
  multipleChoiceDetails:Array<any>=[]

  selectedRecords:number=10;
 active:any;
 activeQuestionsLength:number;
 questionDetails:any
 totalPages:number
 option:any
 deactivateSuccessMessageFlag:boolean=false;
 deactivateFailureMessageFlag:boolean=false;
 deleteSuccessMessageFlag:boolean=false;
 deleteFailureMessageFlag:boolean=false;
 token:String
  constructor(private questionService:QuestionServiceService,private router:Router) { }
  masterSelected:boolean;
  checklist:any;
  checkedList:number[];
  id:number[];
  pageNo:number=0;
  ngOnInit() {
  if(!JSON.parse(localStorage.getItem('token'))){
   window.location.href="/login"
  }
  this.token=JSON.parse(localStorage.getItem('token'))
    this.getActivatedQuestions();
  }
  counter(totalPages: number) {
    return new Array(totalPages);
}
  getActivatedQuestions = () => {
    
    this.questionService.getActiveQuestions(this.token).then((res: any) => {
      this.activeQuestions = res.data.content
      this.activeQuestionsLength=this.activeQuestions.length;
      this.totalPages=res.data.totalPages;
    })
  }
  getDeactivatedQuestions = () => {
    window.location.href="/deactive"
  }
  checkUncheckAll() {
    for (var i = 0; i < this.activeQuestionsLength; i++) {
      this.activeQuestions[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }
  isAllSelected() {
    const isselected = function(item:any) {
      return item.isSelected == true;
    }
    this.masterSelected = this.activeQuestions.every(isselected);
    // this.masterSelected = this.activeQuestions.every(function(item:any) {
    //     return item.isSelected == true;
    //   })
    this.getCheckedItemList();
  }
  getCheckedItemList(){
    this.checkedList = [];
    for (var i = 0; i < this.activeQuestionsLength; i++) {
      if(this.activeQuestions[i].isSelected)
      this.checkedList.push(this.activeQuestions[i].id);
     
    }
    console.log(this.checkedList)
  }

  onEnter(value:string){
    status = "active"
    this.questionService.getQuestionsBasedOnTags(value,status,this.token).then((res:any)=>{
      if(value.length==0){
    this.getActivatedQuestions();

        return;
      }
      if(res.data==""){
      this.getActivatedQuestions();

      }
      this.totalPages=res.data.totalPages;

      this.activeQuestions=res.data.content;  
    })
  }


  selectPageChangeHandler (event: any) {
    this.selectedRecords = event.target.value;
    //console.log(this.pageNo)
    this.questionService.pageRecord(this.selectedRecords,this.pageNo,this.token).then((res:any)=>{
      this.totalPages=res.data.totalPages;
      this.activeQuestions=res.data.content;
      
    })
  }
  onSelectPage(pageNumber:number){
   this.pageNo=pageNumber
   this.questionService.pageRecord(this.selectedRecords,this.pageNo,this.token).then((res:any)=>{
    this.totalPages=res.data.totalPages;
    this.activeQuestions=res.data.content;
    
  })
  // console.log(this.selectedRecords)
  }
  editQuestion(id:any){
    this.router.navigate(['/edit/'+id])
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
    if(type_id==1){
      this.questionService.getBestChoiceDetails(id,this.token).then((res:any)=>{
        this.bestChoiceDetails=res.data
        //console.log(this.bestChoiceDetails[0].value)
      })
    }
    if(type_id==3){
      this.questionService.getMultipleChoiceDetails(id,this.token).then((res:any)=>{
        this.multipleChoiceDetails=res.data
        console.log(this.multipleChoiceDetails)
      })
    }

    })
  }
  deleteQuestion(){
    if(confirm("Are you sure to delete this Question?")){
    this.questionService.deleteQuestion(this.checkedList,this.token).then((res: any) => {
      this.deleteSuccessMessageFlag=true;this.getActivatedQuestions();}).catch(
      (e) => this.deleteFailureMessageFlag=true)
    }   
  }
  deactivateQuestion(){
    if(confirm("Are you sure to deactivate this Question?")){
    const status="deactive";
    this.questionService.updateQuestionStatus(status,this.checkedList,this.token).then((res: any) => {this.deactivateSuccessMessageFlag=true;
      ;this.getActivatedQuestions();}).catch(
      () => this.deactivateFailureMessageFlag=true)
    }
  }
  deactivateThisQuestion(value:number){
    if(confirm("Are you sure to deactivate this Question?")){
    this.id=[];
    const status="deactive";
    this.id.push(value)
     this.questionService.updateQuestionStatus(status,this.id,this.token).then((res: any) => {
      this.deactivateSuccessMessageFlag=true;
      this.getActivatedQuestions()
      }).catch(
       (e) =>this.deactivateFailureMessageFlag=true
       )
  }
}
  deleteThisQuestion(value:number){
    if(confirm("Are you sure to delete this Question?")){
    this.id=[];
    this.id.push(value)
    this.questionService.deleteQuestion(this.id,this.token).then((res: any) => {
      this.deleteSuccessMessageFlag=true
      ;this.getActivatedQuestions();}).catch(
      (e) => this.deleteFailureMessageFlag=true)
    }
  }
  add(){
    window.location.href='/add';
  }

  //no of pages -1 * number of records

}