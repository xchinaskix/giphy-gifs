import { Component, OnInit, HostListener } from '@angular/core';
import { GifService } from '../gif.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public gifs = [];
  public modalToggle = false;
  public showInModal: string;
  public amount = 25;
  public el: HTMLElement;
  public pending;

  constructor(public service: GifService) {}

  @HostListener('window:scroll', ['$event'])
    scrollHandler(event) {
      this.el = document.querySelector('.wrapper');
      const { scrollY, innerHeight } = window;
      const lg = this.el.offsetHeight;
      if ((scrollY + innerHeight) > (lg - 150) && !this.service.pending) {
        this.getWithParams();
      }
    }

  ngOnInit() {
    this.service.getSearchGifs('');
    this.el = document.querySelector('.wrapper');
  }

  openFullSize(gif: any) {
    this.showInModal = gif.images.downsized_large.url;
    this.modalToggle = true;
  }

  closeModal() {
    this.modalToggle = false;
    this.showInModal = '';
  }

  checkInFavorites(id: string) {
    return this.service.checkGifInFavorites(id);
  }

  getWithParams() {
    this.service.getSearchWithParam();
  }
}
