import { Component, OnInit, ViewChild } from '@angular/core';
import { GifService } from '../gif.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  @ViewChild('f') form: any;
  public error = false;

  constructor(public service: GifService, public router: Router) { }

  ngOnInit() {
    if (this.service.isAuth) {
      this.router.navigate(['/']);
    }
  }

  signin() {
    const user = { login: this.form.value.login, password: this.form.value.password, isAuth: true };
    const localData =  JSON.parse(localStorage.getItem('giphyUser'));
    if (localData && localData.auth.login === user.login && localData.auth.password === user.password) {
      const userData = {auth: user, favorites: localData.favorites};
      this.setUser(userData);
    } else {
      this.error = true;
    }
  }

  signup() {
    const user = { login: this.form.value.login, password: this.form.value.password, isAuth: true };
    const userData = {auth: user, favorites: []};
    this.setUser(userData);
  }

  setUser(data: any) {
    this.error = false;
    localStorage.setItem('giphyUser', JSON.stringify(data));
    this.service.setAuth(true);
    this.router.navigate(['/']);
  }

}
