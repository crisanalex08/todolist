import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

//angular material modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AuthModule } from '@auth0/auth0-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {DragDropModule} from '@angular/cdk/drag-drop'

//components
import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SecureComponent } from './components/secure/secure.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthConfigModule } from './auth/auth-config.module';
import { InboxComponent } from './components/inbox/inbox.component';
import { TodayComponent } from './components/today/today.component';
import { UpcomingComponent } from './components/upcoming/upcoming.component';
import { ProjectComponent } from './components/project/project.component';
import { TaskComponent } from './components/task/task.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { NewTaskDialogComponent } from './components/new-task-dialog/new-task-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LandingComponent,
    LoginComponent,
    SignupComponent,
    SecureComponent,
    NotFoundComponent,
    InboxComponent,
    TodayComponent,
    UpcomingComponent,
    ProjectComponent,
    TaskComponent,
    TaskDetailsComponent,
    TaskItemComponent,
    NewTaskDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatListModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    SocialLoginModule,
    DragDropModule,
    FormsModule,
    AuthConfigModule,
    AuthModule.forRoot({
      domain: 'dev-rkarlbjvzmn4thqm.us.auth0.com',
      clientId: 'l0QaRy49BZZUuz2ty4XbCcyRCQjYqFsp',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('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')
          }]
      }
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
