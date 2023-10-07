import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SecureComponent } from './components/secure/secure.component';
import { InboxComponent } from './components/inbox/inbox.component';

const routes: Routes = [
  { path: 'landing', component: LandingComponent },
  { path: 'auth/signup', component: SignupComponent },
  {
    path: 'secure',
    component: SecureComponent,
    children: [
      { path: 'inbox', component: InboxComponent },
      { path: 'today', component: SecureComponent },
      { path: 'upcoming', component: SecureComponent },
      { path: 'project', component: SecureComponent },
    ],
  },
  { path: 'auth/login', component: LoginComponent },
  { path: '', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
