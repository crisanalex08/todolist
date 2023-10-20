import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todolist';

  ngOnInit() {
    localStorage.setItem('userId', '633f46a8-2cdc-4f82-b703-6c18d1b085c6');
  }
}
