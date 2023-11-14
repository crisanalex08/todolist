import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

const baseUrl = 'http://localhost:4200';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css'],
})
export class SecureComponent implements OnInit {
  IsUserAdmin: boolean = false;
  navBar: boolean = false;
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.navBar = false;
    this.auth.isUserAdmin().subscribe((d: any) => {
      this.IsUserAdmin = d;
    });
  }

  navBarToggle() {
    this.navBar = !this.navBar;
  }

  onInbox() {
    this.router.navigateByUrl(`/secure/inbox`);
  }

  onToday() {
    this.router.navigateByUrl(`/secure/today`);
  }

  onUpcoming() {
    this.router.navigateByUrl(`/secure/upcoming`);
  }

  onLogOut() {
    this.auth.logOut();
    this.router.navigateByUrl(`/auth/login`);
  }

  onAdminPanel() {
    this.router.navigateByUrl(`/secure/admin`);
  }
}
