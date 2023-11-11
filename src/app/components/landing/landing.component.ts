import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {
  scrHeight: any;
  scrWidth: any;
  miniNav: boolean = false;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event? : any) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    if(this.scrWidth < 900){
      this.miniNav = true;
    }else{
      this.miniNav = false;
    }
  }

  // Constructor
  constructor(private router: Router) {
    this.getScreenSize();
  }

  goToLogin() {
    console.log('goToLogin');
    this.router.navigate(['/auth/login']);
  }

  handleGetStarted(){
    this.router.navigate(["/auth/signup"]);
  }
}
