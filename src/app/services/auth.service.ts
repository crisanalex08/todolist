import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  baseUrl = 'https://localhost:5400';

  public async registerUser(name: string | null, email: string | null, password: string | null): Promise<void> {
    this.http.get<string>(`https://localhost:5400/register${name}/${email}/${password}`).subscribe(
      (d: string) => {
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
