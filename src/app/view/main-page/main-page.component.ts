import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { NgOptimizedImage } from '@angular/common'
import { MainService } from '@/app/service/main.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CarouselComponent } from '@/app/component/carousel/carousel.component';
import { AlbumListComponent } from '@/app/component/album-list/album-list.component';
import { Banner, CategoryInfo, EasyAblumInfo } from '@/app/interface/main-interface.interface';
import { MainPageRecommendTabComponent } from '@/app/component/main-page-recommend-tab/main-page-recommend-tab.component';
import { AudioPlayerComponent } from '@/app/component/audioPlayer/player.component';
import { PlayerService } from '@/app/service/player.service';
import { Store } from '@ngrx/store';
import { setCurrentIndex, setPlayList, setSongList } from '@/app/store/actions/player.action';
import { playerState } from '@/app/store/reducers/player.reducer';
import { ApiService } from '@/app/service/api.service';
import { AblumApi, MusicInformation, SongList } from '@/app/interface/type.interface';


@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    HeaderComponent, 
    MatButtonModule, 
    MatRippleModule,
    NgOptimizedImage,
    HttpClientModule,
    CarouselComponent,
    AlbumListComponent,
    MainPageRecommendTabComponent,
    AudioPlayerComponent,
    HttpClientModule


  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit{
  //@ViewChild(FooterPlayerComponent) footerPlayerComponent!:FooterPlayerComponent;


  isLoading = false;
  bannerData:Banner[] = [];
  songListMainPage:SongList[] = [];
  
  recommendCategory:CategoryInfo[] = [];
  latestMusicList: MusicInformation[] = [];

 
  songListIdCurrent:string= ""
  playerMusicList:MusicInformation[] = []
  ablumListData:AblumApi[] = [];

  constructor(
    private http:HttpClient,
    private mainService: MainService,
    private playerService: PlayerService,
    private apiService:ApiService,
    private stroe$:Store<playerState>
  ){
   
  }
  ngOnInit(): void {
      this.getBanner();
      this.getSongListMainPage();
      this.getCategory();
      this.getAblumListMain();
      
  }
  //获取全部歌单数据
  getSongListMainPage(){
    this.apiService.getMainPageSonglist().subscribe(res => {
      if(res){
        this.songListMainPage = res;
      }
    })
  }

  getBanner(){
    this.mainService.getMainPageBanners().subscribe(res => {
      this.bannerData = res;
    })
  }
  getCategory(){
    this.mainService.getMainPageRecommendCategory('true').subscribe(res => {
      //console.log(res);
      this.recommendCategory= res;
    })
  }
  getAblumListMain(){
    this.apiService.getAllAblum().subscribe(res=>{
      this.ablumListData = res;
    })
  }
  getLatestMusic(){
    /* this.mainService.getMainPageFullMusicInfoList().subscribe(res => {
      //console.log(res);
      this.latestMusicList= res;
    }) */
  }

  //获取歌单内数据
  getPlayList(songListId:string){
    //console.log(id)
    this.songListIdCurrent = songListId;
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

  getPlayListAblum(ablumId:string){
    this.songListIdCurrent = ablumId;
    this.apiService.getMusicInfoByAblumId(ablumId).subscribe(res =>{
      if(res){
        for(let i = 0 ;i < res.length; i ++){
          const musicUrl = this.base64ToUrl(res[i].musicRaw,res[i].musicType);
          const coverUrl = this.base64ToUrl(res[i].coverRaw,res[i].coverType);
          res[i].musicRaw = musicUrl;
          res[i].coverRaw = coverUrl;
        }
      }
      this.stroe$.dispatch(setSongList({songList:res}))
      this.stroe$.dispatch(setPlayList({playingList:res}))
      this.stroe$.dispatch(setCurrentIndex({currentIndex:0}))
    })
  }
    
  base64ToUrl(base64:string,type:string):string{
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
