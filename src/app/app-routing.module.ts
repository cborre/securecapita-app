import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ResetpasswordComponent} from "./component/resetpassword/resetpassword.component";
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";
import {VerifyComponent} from "./component/verify/verify.component";
import {CustomerComponent} from "./component/customer/customer.component";
import {ProfileComponent} from "./component/profile/profile.component";
import {HomeComponent} from "./component/home/home.component";
import {AuthenticationGuard} from "./guard/authentication.guard";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'resetpassword', component: ResetpasswordComponent},
  {path: 'user/verify/account/:key', component: VerifyComponent},
  {path: 'user/verify/password/:key', component: VerifyComponent},
  {path: 'customers', component: CustomerComponent, canActivate: [AuthenticationGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthenticationGuard]},
  {path: '', component: HomeComponent, canActivate: [AuthenticationGuard]},
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
