import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SecureComponent } from './components/secure/secure.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { NewTaskDialogComponent } from './components/new-task-dialog/new-task-dialog.component';
import { TodayComponent } from './components/today/today.component';
import { UpcomingComponent } from './components/upcoming/upcoming.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FeaturesComponent } from './components/features/features.component';

const routes: Routes = [
  { path: 'landing', component: LandingComponent },
  { path: 'pricing', component: PricingComponent},
  { path: 'checkout/:price', component: CheckoutComponent},  
  { path: 'features', component: FeaturesComponent},
  { path: 'auth/signup', component: SignupComponent },
  {
    path: 'secure',
    component: SecureComponent,
    children: [
      { path: 'inbox', component: InboxComponent },
      { path: 'admin', component: AdminPanelComponent},
      { path: 'today', component: TodayComponent },
      { path: 'upcoming', component: UpcomingComponent },
      { path: 'project', component: SecureComponent },
    ],
  },
  { path: 'auth/login', component: LoginComponent },
  {path: 'diag', component: NewTaskDialogComponent},
  { path: '', component: LandingComponent },
  { path: '**', component: LandingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
