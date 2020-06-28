import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() {}

  passwordHashing(pwd: string) {
    console.log('Hashed password ==> ' + CryptoJS.SHA256(pwd).toString());
    return CryptoJS.SHA256(pwd).toString();
    // return sha256.SHA256(pwd).toString();
  }
}
