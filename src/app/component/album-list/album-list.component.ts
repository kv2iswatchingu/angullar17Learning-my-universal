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
  mainPageAblumList:EasyAblumInfo[] = [];
  constructor(
    private mainService: MainService
  ){}

  ngOnInit(): void {
    this.getAblumMainPage();
  }
  getAblumMainPage(){
    this.mainService.getMainPageAblumList().subscribe(res => {
      console.log(res);
      this.mainPageAblumList = res
      console.log(this.mainPageAblumList)
    })
  }

  //getMainpageAblumList
}
