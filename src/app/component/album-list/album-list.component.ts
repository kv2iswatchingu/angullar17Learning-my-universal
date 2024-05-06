import { Component, Input } from '@angular/core';
import { AlbumCardComponent } from '../album-card/album-card.component';
import { EasyAblumInfo } from '@/app/service/interface/main-interface.interface';
import { MainService } from '@/app/service/main-service.service';

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
  @Input() mainPageListData:EasyAblumInfo[] = [];

  constructor(
    private mainService: MainService
  ){}

  

  //getMainpageAblumList
}
