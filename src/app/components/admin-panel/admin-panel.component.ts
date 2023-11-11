import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit{

  displayedColumns: string[] = ['Id', 'Name', 'Email', 'Admin', 'More'];
  userData: any;
  constructor(private userService: AuthService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data: any) => {
      console.log(data[0].isAdmin);
      this.userData = data;});
  }

  editUser(user: any){
    console.log(user);
  }

  deleteUser(userq: any){
    this.userService.deleteuUser(userq).subscribe(
      {
        next: data => {
          console.log(data);
          var tempData = this.userData.filter((user: any) => user.id !== userq);
          this.userData = tempData;
          console.log(this.userData);
        },
        error: error => {
          console.error('There was an error!', error);
        }
      }
    );;
  }
}
