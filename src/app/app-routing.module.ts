import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActiveQuestionsComponent } from './Components/active-questions/active-questions.component';
import { DeactiveQuestionsComponent } from './Components/deactive-questions/deactive-questions.component';
import { AddQuestionComponent } from './Components/add-question/add-question.component';
import { OptionsComponent } from './Components/options/options.component';
import { UpdateQuestionsComponent } from './Components/update-questions/update-questions.component';
import { LoginComponent } from './Components/login/login.component';
import { NewUserComponent } from './Components/new-user/new-user.component';
import { EditQuestionComponent } from './Components/edit-question/edit-question.component';
import { InviteUserComponent } from './Components/invite-user/invite-user.component';
import { ProfileComponent } from './Components/profile/profile.component';


const routes: Routes = [
  {path:'',component:ActiveQuestionsComponent},
  {path:'deactive',component:DeactiveQuestionsComponent},
  {path:'add',component:AddQuestionComponent},
  {path:'options',component:OptionsComponent},
  {path:'update',component:UpdateQuestionsComponent},
  {path:'login',component:LoginComponent},
  {path:'newuser',component:NewUserComponent},
  {path:'edit/:id',component:EditQuestionComponent},
  {path:'invite',component:InviteUserComponent},
  {path:'profile',component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
