import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FileUploadModule } from 'ng2-file-upload';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService} from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageServicesComponent } from './manage-services/manage-services.component';
import { ServiceDataService } from './services/service-data.service';
import { AuthService } from './guards/userguard';
import { AdminGuard } from './guards/adminguard';
import { RemainGuard } from './guards/remainguard';
import { HomeComponent } from './home/home.component';
import { FilterPipe} from './filters/filter.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule, MatSortModule, MatInputModule,
  MatPaginatorModule, MatProgressSpinnerModule,} from '@angular/material';
import { EditServicesComponent } from './edit-services/edit-services.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
  @NgModule({
    declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserhomeComponent,
    AdminComponent,
    AdminloginComponent,
    ManageUsersComponent,
    ManageServicesComponent,
    HomeComponent,
    FilterPipe,
    EditServicesComponent,
    BookingHistoryComponent
    ],
    imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FileUploadModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatInputModule, 
    MatPaginatorModule, 
    MatProgressSpinnerModule
    ],
    providers: [
    UserService, 
    ServiceDataService,
    AuthService,
    AdminGuard,
    RemainGuard
    ],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
