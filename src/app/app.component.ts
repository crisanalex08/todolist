import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todolist';

  ngOnInit() {
    localStorage.setItem('userId', '2DCD4B69-14F1-4803-9AB7-F4A33A2D9510');
  }
}
