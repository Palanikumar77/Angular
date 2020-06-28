import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setLocalData(key: string, value: string){
    localStorage.setItem(key, value);
  }
  getLocalData(key: string){
    return localStorage.getItem(key);
  }

  deleteLocalData(key: string) {
    localStorage.removeItem(key);
  }

  setSessionData(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  getSessionData(key: string) {
    return sessionStorage.getItem(key);
  }

  deleteSessionData(key: string) {
    sessionStorage.removeItem(key);
  }
}
