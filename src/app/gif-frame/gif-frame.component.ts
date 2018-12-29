import { Component, OnInit, Input } from '@angular/core';
import { GifService } from '../gif.service';

@Component({
  selector: 'app-gif-frame',
  templateUrl: './gif-frame.component.html',
  styleUrls: ['./gif-frame.component.scss']
})
export class GifFrameComponent implements OnInit {

  @Input() source: string;
  @Input() id: string;
  @Input() likes: boolean;

  constructor(public service: GifService) { }

  ngOnInit() {
  }

  addFavorites(e) {
    e.stopPropagation();
    this.likes = true;
    this.service.addFavorites(this.id);
  }

  removeFavorites(e) {
    e.stopPropagation();
    this.likes = false;
    this.service.removeFavorites(this.id);
  }

}
