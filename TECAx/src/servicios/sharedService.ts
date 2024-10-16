import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class SharedService {
  public baseURL: string;
  public static logged: boolean;

  constructor() {
    this.baseURL = 'http://your-api-url.com';
    SharedService.logged = false;
  }

  setBaseURL(url: string): void {
    this.baseURL = url;
  }

  static setLogged(status: boolean): void {
    this.logged = status;
  }

  getBaseURL(): string {
    return this.baseURL;
  }

  static isLogged(): boolean {
    return SharedService.logged;
  }
}
