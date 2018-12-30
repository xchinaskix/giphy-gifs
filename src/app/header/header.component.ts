import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GifService } from '../gif.service';
import { Observable, fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('searchInput') input: ElementRef;
  public observable$: Observable<any>;
  public searchState = false;
  public showSearch = true;


  constructor(public service: GifService, public router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(params => {
      if (params instanceof NavigationEnd) {
        console.log(params.url);
        if (params.url !== '/') {
          this.showSearch = false;
          this.input.nativeElement.value = '';
          this.searchState = false;
        } else {
          this.showSearch = true;
          this.onEvent();
        }
      }
  });
  }

  onEvent() {
    this.observable$ = fromEvent<any>(this.input.nativeElement, 'keyup')
    .pipe(
      map(event => event.target.value),
      debounceTime(500),
      distinctUntilChanged(),
    );
  this.observable$.subscribe(val => this.sendValues(val));
  }

  sendValues(param: string) {
    this.service.getSearchGifs(param);
  }

  toggleState() {
    this.searchState = !this.searchState;
    if (!this.searchState) {
      this.input.nativeElement.value = '';
      this.service.getSearchGifs('');
    }
  }

  logout() {
    const storage = JSON.parse(localStorage.getItem('giphyUser'));
    storage.auth.isAuth = false;
    localStorage.setItem('giphyUser', JSON.stringify(storage));
    this.service.setAuth(false);
    this.router.navigate(['/']);
  }




}
