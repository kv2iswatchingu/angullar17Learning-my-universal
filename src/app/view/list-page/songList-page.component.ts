import { AlbumListComponent } from '@/app/component/album-list/album-list.component';
import { SongList, songListSearch } from '@/app/interface/type.interface';
import { ApiService } from '@/app/service/api.service';
import { setSongList, setPlayList, setCurrentIndex } from '@/app/store/actions/player.action';
import { playerState } from '@/app/store/reducers/player.reducer';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common'

@Component({
  selector: 'app-listpage',
  standalone: true,
  imports: [AlbumListComponent,],
  templateUrl: './songList-page.component.html',
  styleUrl: './songList-page.component.scss'
})
export class SongListPageComponent {

  songList:SongList[] = [];
  songListSearch:songListSearch = {
    page:1,
    limit:35
  }

  constructor(
    private apiService:ApiService,
    private location:Location,
    private stroe$:Store<playerState>
  ){

  }

  ngOnInit(){
    this.getSongList();
  }

  

  getSongList(){
    let category = this.getPathAfter(decodeURI(this.location.path().toString()));
    //console.log(category)
    if(category == "/list"){
      category = ""
    }
    this.songListSearch.category = category
    this.apiService.getSongList(this.songListSearch).subscribe(res=>{
      this.songList = res;
    })
  }







  getPlayList(songListId:string){
    //this.songListIdCurrent = songListId;
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
