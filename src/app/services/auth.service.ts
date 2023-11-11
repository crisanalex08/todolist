import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  baseUrl = 'https://localhost:7260';
  public async registerUser(name: string | null, email: string | null, password: string | null): Promise<void> {
    this.http.get<string>(`${this.baseUrl}/register${name}/${email}/${password}`).subscribe(
      (d: string) => {
        localStorage.setItem('userId', d);
      });
  }

  logOut() {
    localStorage.removeItem('userId');
  }

  deleteuUser(id: string) {
    return this.http.delete(`${this.baseUrl}/api/Users/${id}`)
  }

  public isUserAdmin() {
    return this.http.get(`${this.baseUrl}/isAdmin?userId=${localStorage.getItem('userId')}`);
  }

  public  getAllUsers(){
    return this.http.get(`${this.baseUrl}/api/Users`);
  }

  public async loginUser(email: string | null, password: string | null): Promise<void> {
    this.http.get<string>(`${this.baseUrl}/validate?Email=${email}&Password=${password}`).subscribe(
      (d: string) => {
        console.log(d);
        localStorage.setItem('userId', d);
      });
  }
  private hashPassword(pass: string) {
    var hash = 0;
    var i = 0;
    if (pass.length == 0) return hash;

    for (i = 0; i < pass.length; i++) {
      var char = pass.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }

    

    return hash;
  }
}
