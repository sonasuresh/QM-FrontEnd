import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActiveQuestionsComponent } from './Components/active-questions/active-questions.component';
import { DeactiveQuestionsComponent } from './Components/deactive-questions/deactive-questions.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { AddQuestionComponent } from './Components/add-question/add-question.component';
import { OptionsComponent } from './Components/options/options.component';
import { UpdateQuestionsComponent } from './Components/update-questions/update-questions.component';
import { LoginComponent } from './Components/login/login.component';
import { NewUserComponent } from './Components/new-user/new-user.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { EditQuestionComponent } from './Components/edit-question/edit-question.component';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!

import { NgxTagsInputModule } from 'ngx-tags-input';
import { InviteUserComponent } from './Components/invite-user/invite-user.component';

//import { TimeValueAccessorModule } from "ng-time-value-accessor";

@NgModule({
  declarations: [
    AppComponent,
    ActiveQuestionsComponent,
    DeactiveQuestionsComponent,
    NavbarComponent,
    AddQuestionComponent,
    OptionsComponent,
    UpdateQuestionsComponent,
    LoginComponent,
    NewUserComponent,
    EditQuestionComponent,
    InviteUserComponent,
    //TimeValueAccessorModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularEditorModule,
    TagInputModule,
    BrowserAnimationsModule,
  ],
  providers: [
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
