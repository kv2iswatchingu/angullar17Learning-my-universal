import { Component } from '@angular/core';
import { AlbumCardComponent } from '../album-card/album-card.component';

@Component({
  selector: 'app-album-list',
  standalone: true,
  imports: [
    AlbumCardComponent
  ],
  templateUrl: './album-list.component.html',
  styleUrl: './album-list.component.scss'
})
export class AlbumListComponent {
  ablumEasyInfoArr = [{
    text:"125",
    id:0,
  }]
}
