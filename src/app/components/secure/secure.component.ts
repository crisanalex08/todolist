import { Component } from '@angular/core';
import { Router } from '@angular/router';

const baseUrl = 'http://localhost:4200';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent {

navBar: boolean = false;
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.navBar = false;
  }

  navBarToggle(){
    this.navBar = !this.navBar;
  }

  onInbox(){
    this.router.navigateByUrl(`/secure/inbox`);
  }

  onToday(){
    this.router.navigateByUrl(`/secure/today`);
  }

  onUpcoming(){
    this.router.navigateByUrl(`/secure/upcoming`);
  }
}
