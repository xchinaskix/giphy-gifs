import { Component, OnInit } from '@angular/core';
import { GifService } from '../gif.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  public gifs = [];
  public modalToggle = false;
  public showInModal: string;

  constructor(public service: GifService) { }

  ngOnInit() {
    this.service.getGifsByIds()
    .subscribe(res => this.gifs = res.data);
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

}
