import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-upload-progress',
  templateUrl: './upload-progress.component.html',
  styleUrls: ['./upload-progress.component.scss']
})
export class UploadProgressComponent implements OnInit {
  @Input() progress: number;
  constructor() { }

  ngOnInit() {
  }

}
