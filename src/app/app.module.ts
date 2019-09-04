import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { MatDividerModule } from '@angular/material/divider';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatDialogModule } from '@angular/material/dialog';
import { MainComponent } from './user/main/main.component'
import { AuthInterceptor } from './auth.interceptor';
import { DialogComponent } from './user/main/dialog/dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker'; //npm install --save ngx-material-timepicker
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChatComponent } from './chat/chat.component'; //npm install @angular/flex-layout@latest --save - for responsive layout
import {ScrollingModule} from '@angular/cdk/scrolling';
import { ForbiddenComponent } from './user/forbidden/forbidden.component';
import { UserdetailsComponent } from './user/userdetails/userdetails.component';
import { ChangepasswordComponent } from './user/changepassword/changepassword.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SidenavComponent } from './navbar/sidenav/sidenav.component';
import { UserlistComponent } from './admin/users/userlist/userlist.component';
import { AdmainComponent } from './admin/admain/admain.component';
import { AddialogComponent } from './admin/admain/dialog/addialog.component';



@NgModule({

  declarations: [
    AppComponent,
    AddialogComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    DialogComponent,
    ChatComponent,
    ForbiddenComponent,
    UserdetailsComponent,
    ChangepasswordComponent,
    SidenavComponent,
    UserlistComponent,
    AdmainComponent,
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatListModule,
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatSidenavModule,
    MatGridListModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxMaterialTimepickerModule,
    AppRoutingModule,
    FormsModule,
    ScrollingModule
    

  ],
  entryComponents: [
    DialogComponent,
    AddialogComponent
    
  ],
  providers: [{

    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  {provide: MAT_DATE_LOCALE, useValue: 'ro'},
    DatePipe
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
