import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const googleLogoURL ="http://localhost:4200/assets/images/svg/google.svg";
const facebookLogoURL ="http://localhost:4200/assets/images/svg/facebook.svg";
const twitterLogoURL ="http://localhost:4200/assets/images/svg/twitter.svg";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
constructor(
  private matIconRegistry: MatIconRegistry,
  private domSanitizer: DomSanitizer
) {
  this.matIconRegistry.addSvgIcon("google-logo", this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
  this.matIconRegistry.addSvgIcon("facebook-logo", this.domSanitizer.bypassSecurityTrustResourceUrl(facebookLogoURL));
  this.matIconRegistry.addSvgIcon("twitter-logo", this.domSanitizer.bypassSecurityTrustResourceUrl(twitterLogoURL));
 }

  signUpWithGoogle(){
    console.log("Signup with google");
  }

  signUpWithFacebook(){
    console.log("Signup with facebook");
  }

  signUpWithTwitter(){
    console.log("Signup with email");
  }
}
