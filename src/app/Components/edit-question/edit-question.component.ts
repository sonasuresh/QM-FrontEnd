import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionServiceService } from 'src/app/question-service.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, NgForm } from '@angular/forms';


@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {
  id: number
  questionForm: FormGroup;

  questionDetails: any;
  time: any;
  Levels; Types; Categories: Array<any> = []
  constructor(private questionService: QuestionServiceService, private formBuilder: FormBuilder, private route: ActivatedRoute) { }
  typeValue: String;
  rowarraya: any[] = new Array(4)
  rowarrayOption: any[] = new Array(4)
  rowarrayb: any[] = new Array(4)
  option:any=[]// 
  opt:Array<any> = []
  content: String;
  value: number;
  answer: any
  flag:boolean;
  falseflag:boolean
  optionId:any;

  matchDetails: Array<any> = []
  bestChoiceDetails: Array<any> = []
  updateQuestionSuccessMessageFlag:boolean=false
  updateQuestionFailureMessageFlag:boolean=false
  isStickyflag:Array<any>=[]
  isYesFlag:Array<any>=[]
  bestchoice:any[]=new Array(0)
  stickyArray=[]
  stickyIndex=[]
  isYes=[];
  isYesIndex=[];
  yesIndexValue:number;
  noOfOptions: number;
  rangeArray = []
  yesIndex=[]
  noOfMatchQuestions:number;
  MatchQuestionrangeArray=[]
  noOfMatchAnswers:number;
  MatchAnswerrangeArray=[]
  matchQuestionLengthArray=[]
  matchAnswerLengthArray=[]
  token:String


  ngOnInit() {
    if(!JSON.parse(localStorage.getItem('token'))){
      window.location.href="/login"
     }
  
    this.token=JSON.parse(localStorage.getItem('token'))
    this.route.params.subscribe(params => { this.id = params.id });
    this.getQuestionDetails(this.id)
    this.getDetails();
    this.createForm();
    this.bestchoice= ['','','',''];
  
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
  increaseRow(){
    this.noOfOptions=this.noOfOptions+1;
    this.bestchoice[this.noOfOptions-1]=''
    
    var json={
      id:0,
      value:'',
      is_yes:'',
      is_sticky:''
    }
    this.bestChoiceDetails.push(json)
    //this.bestChoiceDetails=this.bestChoiceDetails+this.noOfOptions;
    //this.bestChoiceDetails[this.noOfOptions].id=0;
    console.log(this.bestChoiceDetails)
  }
  increaseColaRow(){
    this.noOfMatchQuestions=this.noOfMatchQuestions+1;
    this.rowarraya[this.noOfMatchQuestions-1]=''
    var json={
      mid:0,
      col_a: '',
      col_b: '',
      match_option_id:''

    }
    this.matchDetails.push(json)
  }
  increaseColbRow(){
    this.noOfMatchAnswers=this.noOfMatchAnswers+1
    this.rowarrayb[this.noOfMatchAnswers-1]=''
    var json={
      mid:0,
      col_a: '',
      col_b: '',
      match_option_id:''

    }
    this.matchDetails.push(json)
  }
  createForm() {

    this.questionForm = this.formBuilder.group({
      type: ['', Validators.required],
      title: ['', Validators.required],
      content: ['', Validators.required],
      tags: ['', Validators.required],
      skill_points: ['', Validators.required],
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
  matchQuestion(value: any, i: number) {
    this.rowarraya[i] = value;
  }
  matchOption(value: any, i: number) {
    this.rowarrayOption[i] = value
    //console.log(value,i)    

  }
  matchAnswer(value: any, i: any) {
    this.rowarrayb[i] = value;

  }
  save() {
    let commonPayload: any = {
      id:this.id,
      status:"active",
      type_Id: this.questionForm.get('type').value,
      title: this.questionForm.get('title').value,
      content: this.questionForm.get('content').value,
      tags: (this.questionForm.get('tags').value).toString(),
      skill_points: this.questionForm.get('skill_points').value,
      score: this.questionForm.get('score').value,
      duration: this.questionForm.get('duration').value,
      category_Id: this.questionForm.get('category').value,
      level_Id: this.questionForm.get('levels').value,
    }

    const questionPayload: any = {
      ...commonPayload
    }
//console.log( Number(this.questionForm.get('type').value))
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
      for (var i = 0; i <length; i++) {
        var col_b = this.rowarrayb[this.rowarrayOption[i] - 1]
        this.optionId=this.matchDetails[i].id
        var obj = {
          mid:this.optionId,
          col_a: this.rowarraya[i],
          col_b: col_b,
          match_option_id:this.rowarrayOption[i] - 1

        }
        this.opt.push(obj);

      }
        questionPayload.match = this.opt
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
        for(var i =0;i<this.rangeArray.length;i++){
          var value=this.bestchoice[i]
          console.log(this.bestChoiceDetails)
          //if(this.bestChoiceDetails[i].id){
            this.optionId=this.bestChoiceDetails[i].id

            //this.optionId=0
          //}
          var bestChoiceobj = {
            id:this.optionId,
            value:value,
            isYes:this.isYes[i],
            isSticky:this.stickyArray[i]
          }
         this.opt.push(bestChoiceobj) 
        }
       questionPayload.best_choice=this.opt
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
        for(var i =0;i<this.rangeArray.length;i++){
          var value=this.bestchoice[i]
          console.log(this.bestChoiceDetails)
          //if(this.bestChoiceDetails[i].id){
            this.optionId=this.bestChoiceDetails[i].id

            //this.optionId=0
          //}
          var multipleChoiceobj = {
            id:this.optionId,
            value:value,
            isYes:this.isYes[i],
            isSticky:this.stickyArray[i]
          }
         this.opt.push(multipleChoiceobj) 
        }
       questionPayload.multiple_choice=this.opt
        break;

      case 6: questionPayload.numericalValue = {
        answer: this.questionForm.get('numericalAnswer').value,
        correctExplanation: this.questionForm.get('numericalAnswercorrectExplanation').value,
        wrongExplanation: this.questionForm.get('numericalAnswerwrongExplanation').value
      }
        break;
    }
    console.log(questionPayload)
      this.questionService.updateQuestion(questionPayload,this.token).then((res: any) => {
        this.updateQuestionSuccessMessageFlag=true
        window.location.reload()
      }).catch(
        () =>  this.updateQuestionFailureMessageFlag=true
        )
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
    this.questionService.getLevels(this.token).then((res: any) => {
      this.Levels = res.data;
    })
  }
  getTypes() {
    this.questionService.getTypes(this.token).then((res: any) => {
      this.Types = res.data;
    })
  }
  getCategories() {
    this.questionService.getCategories(this.token).then((res: any) => {
      this.Categories = res.data;
    })
  }
  
  removebestchoicerow(row:number){
    this.noOfOptions=this.noOfOptions-1
    this.bestchoice.splice(row,1)
    
    this.rangeArray.splice(row,1)
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
  //console.log(this.yesIndex)
  }
  bestchoicequestion(value: any, i: number){
    this.bestchoice[i]=value;
   // console.log(this.bestchoice,i)
  }
  range(end:number) {
    for (let i = 0; i < end; i++) {
      this.rangeArray[i] = i;
    }
    return this.rangeArray
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
  getQuestionDetails(id: any) {
    this.questionService.getQuestionDetails(id,this.token).then((res: any) => {
      this.questionDetails = res.data
      this.option = (JSON.parse(this.questionDetails.option))
      this.typeValue = this.questionDetails.type_Id.id
      this.answer = JSON.stringify(this.questionDetails.option)
      this.questionForm.patchValue({
        //type:this.questionDetails.type_Id.id,
        content: this.questionDetails.content, 
        tags: this.questionDetails.tags.split(','),
        skill_points: this.questionDetails.skill_points,
        score: this.questionDetails.score,
        duration: this.questionDetails.duration,
        title: this.questionDetails.title,
        type:this.questionDetails.type_Id.id,
        category:this.questionDetails.category_Id.id,
        levels:this.questionDetails.level_Id.id,})
        //console.log(this.typeValue)
        if(this.typeValue=='4'){
          this.questionForm.patchValue({
            shortanswer:this.option.answer})
        }
        if(this.typeValue=='6'){
          this.questionForm.patchValue({
          numericalAnswer:this.option.answer,
          numericalAnswercorrectExplanation:this.questionDetails.correctExplanation,
          numericalAnswerwrongExplanation:this.questionDetails.wrongExplanation
          })
        }
        if(this.typeValue=='2'){
        this.questionForm.patchValue({
       
        correctExplanation:this.option.cExplanation,
        wrongExplanation:this.option.fExplanation,
       
       
      })
      if(this.option.answer=="true"){
        this.flag=true
        //console.log("true")
      }
      else{
        this.falseflag=false
      //console.log(this.option.answer)

      }
    }
      if(this.typeValue=='5'){
        this.questionService.getMatchDetails(id,this.token).then((res:any)=>{
         // console.log(res.data)
          this.matchDetails=res.data
          for(let i =0;i<this.matchDetails.length;i++){
            if (this.matchAnswerLengthArray.some((item) => item == this.matchDetails[i].col_b)) {
            }
            else{
            this.matchAnswerLengthArray[i]=this.matchDetails[i].col_b

            }
            if (this.matchQuestionLengthArray.some((item) => item == this.matchDetails[i].col_a)) {
            }
            else{
            this.matchQuestionLengthArray[i]=this.matchDetails[i].col_a

            }
        }
          this.noOfMatchQuestions=this.matchQuestionLengthArray.length
          this.noOfMatchAnswers=this.matchAnswerLengthArray.length
          for(let i=0;i<this.noOfMatchQuestions;i++){
            //console.log(this.matchDetails[i].col_a)
            this.rowarraya[i]=this.matchDetails[i].col_a
            this.rowarrayOption[i]=this.matchDetails[i].match_option_id+1
          }
          for(let i=0;i<this.noOfMatchAnswers;i++){
            //console.log(this.matchDetails[i].col_a)

            this.rowarrayb[this.rowarrayOption[i] - 1]=this.matchDetails[i].col_b
          }
        })
       
      }
      if(this.typeValue=='1'){
        this.questionService.getBestChoiceDetails(id,this.token).then((res:any)=>{
          console.log(res.data)
          this.bestChoiceDetails=res.data
          console.log(this.bestChoiceDetails[0].is_yes)
          this.noOfOptions=this.bestChoiceDetails.length
          for (let i = 0; i < this.noOfOptions; i++) {
           
              this.bestchoice[i]=this.bestChoiceDetails[i].value 
              
              if(this.bestChoiceDetails[i].is_yes==0)
                {this.isYes[i]=0
                //console.log("false")
                }
                else{
                  this.yesIndexValue=i
                this.isYes[i]=1
                //console.log("true")

              }
              if(this.bestChoiceDetails[i].is_sticky==0){
                
                this.isStickyflag[i]=false
              }
              else{
                this.stickyIndex.push(i)
                this.isStickyflag[i]=true

              }
          }
          for(let i=0;i<this.noOfOptions;i++){
            
          }
          console.log(this.bestchoice)

          // this.questionForm.patchValue({
           
          //   bestchoice[i]:this.option.cExplanation,
          //   wrongExplanation:this.option.fExplanation,
           
           
          // })
        })
      }
    

      if(this.typeValue=='3'){
        this.questionService.getMultipleChoiceDetails(id,this.token).then((res:any)=>{
          console.log(res.data)
          this.bestChoiceDetails=res.data
         // console.log(this.bestChoiceDetails[0].is_yes)
          this.noOfOptions=this.bestChoiceDetails.length
          for (let i = 0; i < this.noOfOptions; i++) {
           
              this.bestchoice[i]=this.bestChoiceDetails[i].value 
              
              if(this.bestChoiceDetails[i].is_yes==0)
                {//this.isYes[i]=0
                  this.isYesFlag[i]=false
                //console.log("false")
                }
                else{
                  //this.yesIndexValue=i
                //this.isYes[i]=1
                this.yesIndex.push(i)
                this.isYesFlag[i]=true

                //console.log("true")

              }
              if(this.bestChoiceDetails[i].is_sticky==0){
                
                this.isStickyflag[i]=false
              }
              else{
                this.stickyIndex.push(i)
                this.isStickyflag[i]=true

              }
          }
          for(let i=0;i<this.noOfOptions;i++){
            
          }
          console.log(this.bestchoice)

          // this.questionForm.patchValue({
           
          //   bestchoice[i]:this.option.cExplanation,
          //   wrongExplanation:this.option.fExplanation,
           
           
          // })
        })
      } 



    })
  }
}
