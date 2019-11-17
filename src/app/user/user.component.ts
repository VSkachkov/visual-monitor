import { Component, OnInit } from '@angular/core';
import {User} from './user';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;
  clickMessage = '';
  constructor(private http: HttpClient,
              private userService: UserService) {
  }

  showUser() {
    // this.userService.getUser()
    //   .subscribe((data: User) => this.user = {
    //     name: data['name'],
    //     email:  data['email'],
    //     id: data['id']
    //   });
    this.user = {name: 'asd', email: 'asd', id : 5};
  }

  onClickMe() {
    // this.clickMessage = 'You are my hero!';
    this.http.get('http://localhost:7000/users/0').subscribe((data: User) => this.clickMessage = data.email);
    // this.http.get('http://localhost:7000/users/0').subscribe();
  }

  ngOnInit(): void {
    this.http.get('http://localhost:7000/users/0').subscribe((data: string) => this.clickMessage = data);
  }
}
