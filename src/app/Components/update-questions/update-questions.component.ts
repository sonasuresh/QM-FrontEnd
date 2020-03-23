import { Component, OnInit, Input,Output,EventEmitter, ViewChild } from '@angular/core';
import { ActiveQuestionsComponent } from '../active-questions/active-questions.component';

@Component({
  selector: 'app-update-questions',
  template:`<div>
    {{message}}
  </div>`,
  //templateUrl: './update-questions.component.html',
  styleUrls: ['./update-questions.component.css']
})
export class UpdateQuestionsComponent implements OnInit {
 // @ViewChild(ActiveQuestionsComponent, { static: true })  child:ActiveQuestionsComponent;

  @Input() message: String
 
  constructor() { }
  ngOnInit() {
  }
}
