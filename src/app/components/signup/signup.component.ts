import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { AuthService } from 'src/app/services/auth.service';

const googleLogoURL = "http://localhost:4200/assets/images/svg/google.svg";
const facebookLogoURL = "http://localhost:4200/assets/images/svg/facebook.svg";
const twitterLogoURL = "http://localhost:4200/assets/images/svg/twitter.svg";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    private router: Router
  ) {
    this.matIconRegistry.addSvgIcon("google-logo", this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
    this.matIconRegistry.addSvgIcon("facebook-logo", this.domSanitizer.bypassSecurityTrustResourceUrl(facebookLogoURL));
    this.matIconRegistry.addSvgIcon("twitter-logo", this.domSanitizer.bypassSecurityTrustResourceUrl(twitterLogoURL));
  }

  name = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  signupUsingEmail: boolean = false;
  hide: boolean = true;

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  signUpWithGoogle() {
    this.loginWithGoogle();
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => this.router.navigate(['mainpage']));
  }

  signUpWithFacebook() {
    console.log("Signup with facebook");
  }

  signUpWithTwitter() {
    console.log("Signup with email");
  }

  signUpWithEmail() {
    this.signupUsingEmail = true;
  }

  signUp() {
    this.authService.registerUser(this.name.getRawValue(), this.email.getRawValue(), this.password.getRawValue())
    .then(() => this.router.navigate(['secure/inbox']));
  }
}
