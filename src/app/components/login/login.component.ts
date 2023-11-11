import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


const googleLogoURL ="http://localhost:4200/assets/images/svg/google.svg";
const facebookLogoURL ="http://localhost:4200/assets/images/svg/facebook.svg";
const twitterLogoURL ="http://localhost:4200/assets/images/svg/twitter.svg";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private authService: AuthService,
    private router: Router
  ) {
    this.matIconRegistry.addSvgIcon("google-logo", this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
    this.matIconRegistry.addSvgIcon("facebook-logo", this.domSanitizer.bypassSecurityTrustResourceUrl(facebookLogoURL));
    this.matIconRegistry.addSvgIcon("twitter-logo", this.domSanitizer.bypassSecurityTrustResourceUrl(twitterLogoURL));
   }


   email = new FormControl('', [Validators.required, Validators.email]);
   password = new FormControl('', [Validators.required]);
   loginUsingEmail : boolean = false;
   hide: boolean = true;

   getErrorMessage() {
     if (this.email.hasError('required')) {
       return 'You must enter a value';
     }

     return this.email.hasError('email') ? 'Not a valid email' : '';
   }

    loginWithGoogle(){
      console.log("login with google");
    }

    loginWithFacebook(){
      console.log("login with facebook");
    }

    loginWithTwitter(){
      console.log("login with email");
    }

    loginWithEmail(){
      this.loginUsingEmail = true;
    }

    login(){
      this.authService.loginUser(this.email.value, this.password.value).then(
        () => {
          console.log("login successful");
          this.router.navigate(['/secure/inbox']);
        }
      );
    }
}
