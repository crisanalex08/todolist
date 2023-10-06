import { Component } from '@angular/core';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent {

navBar: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.navBar = false;
  }

  navBarToggle(){
    this.navBar = !this.navBar;
  }

}
