import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../Models/User.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'https://localhost:7035/api/Auth/login';
  private readonly tokenKey = 'access_token';
  private readonly userKey = 'logged_user';

  constructor(private http:HttpClient) { }

  login(request: LoginRequest): Observable<LoginResponse> {
  
return this.http.post<LoginResponse>(this.apiUrl, request);
}

}
