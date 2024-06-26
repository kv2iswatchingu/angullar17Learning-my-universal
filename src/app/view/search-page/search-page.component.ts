import { playerTimeFormat } from '@/app/component/audioPlayer/playerTimeFormat.pipe';
import { MusicInfoSearch, MusicInformation } from '@/app/interface/type.interface';
import { ApiService } from '@/app/service/api.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatListModule,
    MatPaginatorModule,
    playerTimeFormat,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  searchInput:string = ""
  pageLength:number = 0;
  pageIndex:number = 0;

  musicList:MusicInformation[] = [];
  musicSearch:MusicInfoSearch ={
    page:1,
    limit:30
  }

  constructor(
    private apiservice:ApiService,
    private matPage: MatPaginatorIntl
  ){
    matPage.firstPageLabel = "第一页"
    matPage.lastPageLabel = "最后一页"
    matPage.nextPageLabel = "下一页"
    matPage.previousPageLabel = "上一页"
  }

  ngOnInit(){
    this.getSearchMusic();
  }

  search(){

  }
  pageChange(event:PageEvent){
    
  }



  //api

  getSearchMusic(){
    this.apiservice.getMusicInfoBySearch(this.musicSearch).subscribe(res=>{
      this.musicList = res;
    })
  }

}
