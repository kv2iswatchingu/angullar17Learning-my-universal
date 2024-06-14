import { Component, Input, Output,EventEmitter } from '@angular/core';
import { AlbumCardComponent } from '../album-card/album-card.component';
import { EasyAblumInfo } from '@/app/interface/main-interface.interface';
import { MainService } from '@/app/service/main.service';
import { AblumApi, AblumInfo, SongList } from '@/app/interface/type.interface';


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
  @Input() songListData:SongList[] = [];
  @Input() ablumListData:AblumApi[] = [];
  @Output() onAddtoListMain= new EventEmitter<string>();

  constructor(){}

  onAddtoList(id:string){
    console.log(id)
    this.onAddtoListMain.emit(id)
  }


}
