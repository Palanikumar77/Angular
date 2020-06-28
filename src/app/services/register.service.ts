import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  signUpAPIUrl = environment.API_URL + '/api/auth/signup';
  constructor(private http: HttpClient) { }

  newUserRegistration(userData: any){
    console.log('User Data ==> ' + userData);
    return this.http.post(this.signUpAPIUrl, userData);
  }
}
