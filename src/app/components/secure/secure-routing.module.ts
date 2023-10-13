import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecureComponent } from './secure.component';
import { InboxComponent } from '../inbox/inbox.component';
import { TodayComponent } from '../today/today.component';
import { UpcomingComponent } from '../upcoming/upcoming.component';

const routes: Routes = [
  {
    path: '',
    component: SecureComponent,
    children: [
      { path: 'secure', component: SecureComponent },
      { path: 'inbox', component: InboxComponent },
      { path: 'today', component: TodayComponent },
      { path: 'upcoming', component: UpcomingComponent },
      { path: '**', component: SecureComponent },
    ],
  },
  { path: '**', component: SecureComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecureRoutingModule {}
