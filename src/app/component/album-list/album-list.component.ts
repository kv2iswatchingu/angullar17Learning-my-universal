import { Component, Input, Output,EventEmitter } from '@angular/core';
import { AlbumCardComponent } from '../album-card/album-card.component';
import { EasyAblumInfo } from '@/app/interface/main-interface.interface';
import { MainService } from '@/app/service/main.service';


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
  @Output() onAddtoListMain= new EventEmitter<string>();

  constructor(
    private mainService: MainService
  ){}

  onAddtoList(id:string){
    console.log(id)
    this.onAddtoListMain.emit(id)
  }

  //getMainpageAblumList
}
