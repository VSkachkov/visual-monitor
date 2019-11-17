import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }
  userUrl = 'assets/user.json';
  getUser() {
    return this.http.get(this.userUrl);
  }
}
