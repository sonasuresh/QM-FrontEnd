import { Component, OnInit } from '@angular/core';
import { QuestionServiceService } from 'src/app/question-service.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, NgForm } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  questionForm: FormGroup;
  Levels; Types; Categories: Array<any> = []
  constructor(private questionService: QuestionServiceService, private formBuilder: FormBuilder,private router:Router) { }
  typeValue: String;
  rowarraya: any[] = new Array(4)
  rowarrayOption: any[] = new Array(4)
  rowarrayb: any[] = new Array(4)
  bestchoice:any[]=new Array(0)
  option: Array<any> = []
  noOfOptions: number = 4;
  
  noOfMatchQuestions:number=4;
  noOfMatchAnswers:number=4;
  rangeArray = []
  MatchQuestionrangeArray=[]
  MatchAnswerrangeArray=[]
  stickyArray=[]
  stickyIndex=[]
  yesIndex=[]
  value: number;
  isYes=[];
  isYesIndex=[];
  yesIndexValue:number;
 createQuestionSuccessMessageFlag:boolean=false;
 createQuestionFailureMessageFlag:boolean=false;



  ngOnInit() {
    this.getDetails();
    this.createForm();
    this.bestchoice= ['','','',''];
    this.rowarrayb=['','','','']
    this.rowarraya=['','','','']

  }
  increaseRow(){
    this.noOfOptions=this.noOfOptions+1;
    this.bestchoice[this.noOfOptions-1]=''
  }
  increaseColaRow(){
    this.noOfMatchQuestions=this.noOfMatchQuestions+1;
    this.rowarraya[this.noOfMatchQuestions-1]=''
  }
  increaseColbRow(){
    this.noOfMatchAnswers=this.noOfMatchAnswers+1
    this.rowarrayb[this.noOfMatchAnswers-1]=''
  }
  createForm() {

    this.questionForm = this.formBuilder.group({
      type: ['', Validators.required],
      title: ['', Validators.required],
      content: ['', Validators.required],
      tags: ['', Validators.required],
      points: ['', Validators.required],
      score: ['', Validators.required],
      duration: ['', Validators.required],
      category: ['', Validators.required],
      levels: ['', Validators.required],
      shortanswer: ['', Validators.required],
      numericalAnswer: ['', Validators.required],
      numericalAnswercorrectExplanation: ['', Validators.required],
      numericalAnswerwrongExplanation: ['', Validators.required],
      option: ['', Validators.required],
      wrongExplanation: ['', Validators.required],
      correctExplanation: ['', Validators.required]
    });
  }

  range(end:number) {
    for (let i = 0; i < end; i++) {
      this.rangeArray[i] = i;
    }
    return this.rangeArray
  }

  rangeCola(end:number){
    for (let i = 0; i< end; i++) {
      this.MatchQuestionrangeArray[i] = i;
    }
    return this.MatchQuestionrangeArray
  }
  rangeColb(end:number){
    for (let i = 0; i< end; i++) {
      this.MatchAnswerrangeArray[i] = i;
    }
    return this.MatchAnswerrangeArray
  }

  matchQuestion(value: any, i: number) {
    this.rowarraya[i] = value;
  }
  bestchoicequestion(value: any, i: number){
    this.bestchoice[i]=value;
   // console.log(this.bestchoice,i)
  }
  matchOption(value: any, i: number) {
    this.rowarrayOption[i] = value
  }
  matchAnswer(value: any, i: any) {
    this.rowarrayb[i] = value;

  }
  addStickyId(row:number){
    if (this.stickyIndex.some((item) => item == row)) {
      const index=this.stickyIndex.indexOf(row)
      this.stickyIndex.splice(index,1);
  }
  else{
    this.stickyIndex.push(row)
  }
  //console.log(this.stickyIndex)
  }
  addIsYes(row:number){
    this.yesIndexValue=row
    //console.log(this.yesIndexValue)
  }
  
  addIsYesId(row:number){
    if (this.yesIndex.some((item) => item == row)) {
      const index=this.yesIndex.indexOf(row)
      this.yesIndex.splice(index,1);
  }
  else{
    this.yesIndex.push(row)
  }
  //console.log(this.stickyIndex)
  }

  save() {
    let commonPayload: any = {
      type_Id: this.questionForm.get('type').value,
      title: this.questionForm.get('title').value,
      content: this.questionForm.get('content').value,
      tags: (this.questionForm.get('tags').value).toString(),
      skill_points: this.questionForm.get('points').value,
      score: this.questionForm.get('score').value,
      duration: this.questionForm.get('duration').value,
      category_Id: this.questionForm.get('category').value,
      level_Id: this.questionForm.get('levels').value,
    }
    const questionPayload: any = {
      ...commonPayload
    }

    const questionType = Number(this.questionForm.get('type').value)

    switch (questionType) {
      case 2: questionPayload.true_false = {
        answer: this.questionForm.get('option').value,
        cExplanation: this.questionForm.get('correctExplanation').value,
        fExplanation: this.questionForm.get('wrongExplanation').value
      }
      case 4: questionPayload.shortAnswer = { answer: this.questionForm.get('shortanswer').value }
        break;
      case 5: 
        let length=this.rowarraya.length>this.rowarrayb.length?this.rowarraya.length:this.rowarrayb.length
      for (var i = 0; i < length; i++) {
        var col_b = this.rowarrayb[this.rowarrayOption[i] - 1]
        var obj = {
          col_a: this.rowarraya[i],
          col_b: col_b,
          match_option_id:this.rowarrayOption[i] - 1

        }
        this.option.push(obj);

      }
        questionPayload.match = this.option

        break;
      case 1:
        for(var i=0;i<this.rangeArray.length;i++){
          this.stickyArray[i]=0;
          this.isYes[i]=0;
          
        }
        this.isYes[this.yesIndexValue]=1;

        for(var i=0;i<this.rangeArray.length;i++){
          const index=this.stickyIndex[i];
          this.stickyArray[index]=1;
         
        }
        console.log(this.stickyArray)
        for(var i =0;i<this.rangeArray.length;i++){
          //console.log(this.bestchoice[i])
          var value=this.bestchoice[i]
          
          
          var bestChoiceobj = {
            value:value,
            isYes:this.isYes[i],
            isSticky:this.stickyArray[i]
          }
          this.option.push(bestChoiceobj)
        }
        questionPayload.best_choice=this.option
        break;
        case 3:
        for(var i=0;i<this.rangeArray.length;i++){
          this.stickyArray[i]=0;
          this.isYes[i]=0;
          
        }
        //this.isYes[this.yesIndexValue]=1;

        for(var i=0;i<this.rangeArray.length;i++){
          const index=this.stickyIndex[i];
          this.stickyArray[index]=1;
          const yesIndex=this.yesIndex[i];
          this.isYes[yesIndex]=1
         
        }
        console.log(this.stickyArray)
        for(var i =0;i<this.rangeArray.length;i++){
          //console.log(this.bestchoice[i])
          var value=this.bestchoice[i]
          
          
          var multipleChoiceobj = {
            value:value,
            isYes:this.isYes[i],
            isSticky:this.stickyArray[i]
          }
          this.option.push(multipleChoiceobj)
        }
        questionPayload.multiple_choice=this.option
        break;
      case 6: questionPayload.numericalValue = {
        answer: this.questionForm.get('numericalAnswer').value,
        correctExplanation: this.questionForm.get('numericalAnswercorrectExplanation').value,
        wrongExplanation: this.questionForm.get('numericalAnswerwrongExplanation').value
      }
        break;
    }
    //console.log(this.stickyArray)
    //console.log(this.option)
    console.log(questionPayload)
  this.questionService.addQuestion(questionPayload).then((res: any) =>{
    this.createQuestionSuccessMessageFlag=true;
    window.location.reload()
  }).catch(
   () =>this.createQuestionFailureMessageFlag=true)
   }
  back() {
    window.location.href = '';
  }
  getDetails() {
    this.getTypes();
    this.getCategories();
    this.getLevels();
  }
  getLevels() {
    this.questionService.getLevels().then((res: any) => {
      this.Levels = res.data;
    })
  }
 
  getTypes() {
    this.questionService.getTypes().then((res: any) => {
      this.Types = res.data;
    })
  }
  getCategories() {
    this.questionService.getCategories().then((res: any) => {
      this.Categories = res.data;
    })
  }
  type(type: any) {
    this.typeValue = type;
  }
  removebestchoicerow(row:number){
    this.noOfOptions=this.noOfOptions-1
    // delete  this.bestchoice[row]
    // delete  this.rangeArray[row]
    // console.log("first", this.bestchoice)
    // console.log("se",this.rangeArray)
    this.bestchoice.splice(row,1)

    this.rangeArray.splice(row,1)
    console.log(row)

  }
  removea(row: number) {
    this.noOfMatchQuestions=this.noOfMatchQuestions-1;
    this.rowarraya.splice(row, 1);
    this.MatchQuestionrangeArray.splice(row,1)
  }
  removeb(row: number) {
    this.noOfMatchAnswers=this.noOfMatchAnswers-1;
    this.rowarrayb.splice(row, 1);  
    this.MatchAnswerrangeArray.splice(row,1)
  }
}