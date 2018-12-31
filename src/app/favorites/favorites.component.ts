import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { GifService } from '../gif.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  animations: [
    trigger('showHide', [
      // ...
      state('open', style({
        opacity: 1,
        transform: 'translateX(0)',
      })),
      state('closed', style({
        opacity: 0.5,
        transform: 'translateX(-30vw)',
      })),
      transition('open => closed', [
        animate('0.3s 0.2s ease')
      ]),
      transition('closed => open', [
        animate('0.3s 0.2s ease')
      ]),
    ]),
    trigger('hideShowForm', [
      // ...
      state('open', style({
        opacity: 1,
        transform: 'translateX(0)',
      })),
      state('closed', style({
        opacity: 0.5,
        transform: 'translateX(30vw)',
      })),
      transition('open => closed', [
        animate('400ms cubic-bezier(0.13,0.92,0.41,0.97)')
      ]),
      transition('closed => open', [
        animate('400ms cubic-bezier(0.13,0.92,0.41,0.97)')
      ]),
    ]),
  ]
})
export class FavoritesComponent implements OnInit, OnDestroy {
  public isOpen = true;
  public modalToggle = false;
  public loading: boolean;
  public progress = 0;
  public showInModal: string;
  public gifFile;
  public subscriber: Subscription;
  public subscriber_2: Subscription;

  @ViewChild('f') form: any;

  constructor(public service: GifService) { }

  ngOnInit() {
    this.service.getGifsByIds();
    this.subscriber = this.service.progress.subscribe(prog => {
      this.progress = +prog;
    });
    this.subscriber_2 = this.service.isLoading.subscribe(prog => {
      this.loading = prog;
    });
  }

  openFullSize(gif: any) {
    this.showInModal = gif.images.downsized_large.url;
    this.modalToggle = true;
  }

  closeModal() {
    this.modalToggle = false;
    this.showInModal = '';
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.form.reset();
    this.progress = 0;
  }

  onSubmit() {
    const obj = {
      tagName: this.form.value.tagName,
      file: this.gifFile
    };
    this.service.uploadGif(obj)
    .then(res => {
      this.service.addFavorites(res.data.id);
      this.toggle();
      this.service.getGifsByIds();
    });
  }

  show(e) {
    this.gifFile = event.target['files'][0];
  }

  checkInFavorites(id: string) {
    return this.service.checkGifInFavorites(id);
  }

  ngOnDestroy() {
    if (this.subscriber) {
      this.subscriber.unsubscribe();
    }
    if (this.subscriber_2) {
      this.subscriber_2.unsubscribe();
    }
  }

}
