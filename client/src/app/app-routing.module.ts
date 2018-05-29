import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { AdminComponent } from './admin/admin.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageServicesComponent } from './manage-services/manage-services.component';
import { AuthService } from './guards/userguard';
import { AdminGuard } from './guards/adminguard';
import { RemainGuard } from './guards/remainguard';
import { HomeComponent } from './home/home.component';
import { EditServicesComponent } from './edit-services/edit-services.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { VerfiyUserComponent } from './verfiy-user/verfiy-user.component';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'login', component:LoginComponent, canActivate:[RemainGuard]},
  {path:'register', component:RegisterComponent, canActivate:[RemainGuard]},
  {path:'user',component:UserhomeComponent, canActivate:[AuthService]},
  {path: 'admin', component: AdminComponent, canActivate:[AdminGuard]},
  {path: 'adminlogin', component: AdminloginComponent, canActivate:[RemainGuard]},
  {path: 'manage-users', component: ManageUsersComponent,canActivate:[AdminGuard]
},
  {path: 'manage-services', component: ManageServicesComponent,canActivate:[AdminGuard]
 },
  {path: 'home', component: HomeComponent, canActivate: [RemainGuard]},
  {path: 'edit-services/:id', component: EditServicesComponent},
  {path: 'booking-history/:username', component: BookingHistoryComponent},
  {path: 'verify/:verifyToken', component: VerfiyUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }