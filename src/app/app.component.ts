import { Component, OnInit } from '@angular/core';
import { GifService } from './gif.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(public service: GifService) {}

  ngOnInit() {
    if (!localStorage.getItem('giphyUser')) {
      this.service.setAuth(false);
    } else {
      const user = JSON.parse(localStorage.getItem('giphyUser'));
      user['auth'].isAuth ? this.service.setAuth(true) : this.service.setAuth(false);
      this.service.getFavoritesFromStorage();
    }

  }

}
