import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './admin/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { MainComponent } from './user/main/main.component';
import { AuthGuard } from './services/auth.guard';
import { ChatComponent } from './chat/chat.component';
import { ForbiddenComponent } from './user/forbidden/forbidden.component';
import { UserdetailsComponent } from './user/userdetails/userdetails.component';
import { ChangepasswordComponent } from './user/changepassword/changepassword.component';
import { UserlistComponent } from './admin/users/userlist/userlist.component';
import { AdmainComponent } from './admin/admain/admain.component';


const routes: Routes = [
{path: "", component: HomeComponent,canActivate: [AuthGuard]},
{path: "forbidden", component: ForbiddenComponent},
{path: "register", component: RegisterComponent,canActivate: [AuthGuard],data:{permittedRoles:['Admin']}},
{path: "userlist", component: UserlistComponent,canActivate: [AuthGuard],data:{permittedRoles:['Admin']}},
{path: "dashboard", component: AdmainComponent,canActivate: [AuthGuard],data:{permittedRoles:['Admin']}},
{path: "login", component: LoginComponent},
{path: "main", component: MainComponent,canActivate: [AuthGuard],data:{permittedRoles:['User']}},
{path: "chat", component: ChatComponent,canActivate: [AuthGuard]},
{path: "userdetails", component: UserdetailsComponent,canActivate: [AuthGuard],data:{permittedRoles:['User']}},
{path: "changepass", component: ChangepasswordComponent,canActivate: [AuthGuard],data:{permittedRoles:['User']}},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
