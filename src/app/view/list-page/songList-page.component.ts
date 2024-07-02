import { AlbumListComponent } from '@/app/component/album-list/album-list.component';
import { SongList, songListSearch } from '@/app/interface/type.interface';
import { ApiService } from '@/app/service/api.service';
import { setSongList, setPlayList, setCurrentIndex } from '@/app/store/actions/player.action';
import { playerState } from '@/app/store/reducers/player.reducer';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common'
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { CategoryTabComponent } from '@/app/component/category-tab/category-tab.component';

@Component({
  selector: 'app-listpage',
  standalone: true,
  imports: [
    AlbumListComponent,
    MatButtonToggleModule,
    MatPaginatorModule,
    MatSelectModule,  
  ],
  templateUrl: './songList-page.component.html',
  styleUrl: './songList-page.component.scss'
})
export class SongListPageComponent {

  songList:SongList[] = [];
  songListSearch:songListSearch = {
    page:1,
    limit:35,
    sortBy:'time'
  }
  categoryName:string = "全部";
  pageLength:number = 0;
  pageIndex:number = 0;
  styleList:string[] = [];

  constructor(
    private apiService:ApiService,
    private location:Location,
    private stroe$:Store<playerState>,
    private matPage: MatPaginatorIntl,
    private router: Router,
  ){
    matPage.firstPageLabel = "第一页"
    matPage.lastPageLabel = "最后一页"
    matPage.nextPageLabel = "下一页"
    matPage.previousPageLabel = "上一页"
  }

  ngOnInit(){
    this.initSongList();
    this.getSongListLength();
    this.getSongList();
    this.getSongListStyle();
  }


  initSongList(){
    let category = this.getPathAfter(decodeURI(this.location.path().toString()));
    this.categoryName = category
    //console.log(category)
    if(category == "/list"){
      category = ""
      this.categoryName = "全部"
    }
    this.songListSearch.category = category
  }

  getSongListStyle(){
    this.apiService.getSongListStyle().subscribe(res=>{
      const all = ["全部"]
      this.styleList = all.concat(res)
    })
  }
  getSongListLength(){
    this.apiService.getSonglistTotal(this.songListSearch).subscribe(res=>{
      this.pageLength = res;
    })
  }
  getSongList(){
    this.apiService.getSongList(this.songListSearch).subscribe(res=>{
      this.songList = res;
    })
  }
  




  groupChange(event:any){
    const sortby = event.value
    this.songListSearch.sortBy = sortby
    this.getSongListLength();
    this.getSongList();
  }


  styleChanged(event:any){
    let cate = event.value
    this.router.navigate(['/list'],{queryParams:{styles:cate}});
    this.categoryName = cate
    if(cate == "全部"){
      cate = ""
      this.categoryName = "全部"
    }
    this.songListSearch.category = cate
    this.getSongListLength();
    this.getSongList();
  }


  getPlayList(songListId:string){
    //this.songListIdCurrent = songListId;
    this.apiService.updateSongListPop(songListId).subscribe(res=>{
      const index = this.songList.findIndex(item => item._id == songListId);
      if(index != -1){
        this.songList[index].songListPop = res.songListPop
      }
    });

    this.apiService.getMusicInfoBySongList(songListId).subscribe(res =>{
      if(res){
        //console.log(res)
        for(let i = 0 ;i < res.length; i ++){
          const musicUrl = this.base64ToUrl(res[i].musicRaw,res[i].musicType);
          const coverUrl = this.base64ToUrl(res[i].coverRaw,res[i].coverType);
          res[i].musicRaw = musicUrl;
          res[i].coverRaw = coverUrl;
        }
        //console.log(res)
      }
      this.stroe$.dispatch(setSongList({songList:res}))
      this.stroe$.dispatch(setPlayList({playingList:res}))
      this.stroe$.dispatch(setCurrentIndex({currentIndex:0}))
    })
  }
  pageChange(event:PageEvent){
   /*  this.musicSearch.page = event.pageIndex + 1;
    if( this.musicIdListCurrentPage){
      this.musicIdListCurrentPage.forEach(item =>{
        if(!this.musicIdList.includes(item)){
          this.musicIdList.push(item)
        }
      })
    }
    this.musicSearchApi();
    this.pageIndex = event.pageIndex; */
  }




  private getPathAfter(string:string):string{
    const strArr = string.split("=");
    return strArr[strArr.length - 1];
  }
  private base64ToUrl(base64:string,type:string):string{
    let brianyArr = base64.split(',');
    let bstr = atob(brianyArr[0]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n)
    }
    const blob = new Blob([u8arr],{type:type})
    return URL.createObjectURL(blob)
  }
}
