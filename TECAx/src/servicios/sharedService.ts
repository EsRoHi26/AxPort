import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class SharedService {
  public static baseURL: string;
  public static logged: boolean;

  constructor() {
    SharedService.baseURL = "http://localhost:8080";
    SharedService.logged = false;
  }

  static setBaseURL(url: string): void {
    SharedService.baseURL = url;
  }

  static setLogged(status: boolean): void {
    SharedService.logged = status;
  }

  static getBaseURL(): string {
    return SharedService.baseURL;
  }

  static isLogged(): boolean {
    return SharedService.logged;
  }
}
