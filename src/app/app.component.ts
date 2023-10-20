import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todolist';

  ngOnInit() {
    localStorage.setItem('userId', '6d454ac5-1894-4af1-8d87-3bbe6b4753ab');
  }
}
