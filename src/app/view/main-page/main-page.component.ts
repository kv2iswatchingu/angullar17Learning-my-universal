import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { NgOptimizedImage } from '@angular/common'
import { MainService } from '@/app/service/main.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CarouselComponent } from '@/app/component/carousel/carousel.component';
import { AlbumListComponent } from '@/app/component/album-list/album-list.component';
import { Banner, CategoryInfo, EasyAblumInfo, MusicInfo } from '@/app/interface/main-interface.interface';
import { MainPageRecommendTabComponent } from '@/app/component/main-page-recommend-tab/main-page-recommend-tab.component';
import { EasypalyerlistComponent } from '@/app/component/easypalyerlist/easypalyerlist.component';
import { AudioPlayerComponent } from '@/app/component/audioPlayer/player.component';
import { PlayerService } from '@/app/service/player.service';
import { Store } from '@ngrx/store';
import { setCurrentIndex, setPlayList, setSongList } from '@/app/store/actions/player.action';
import { playerState } from '@/app/store/reducers/player.reducer';
import { ApiService } from '@/app/service/api.service';
import { SongList } from '@/app/interface/type.interface';


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
    EasypalyerlistComponent,
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
  //mainPageAblumList:EasyAblumInfo[] = [];
  songListMainPage:SongList[] = [];
  
  personalAblumRecommend:EasyAblumInfo[] = [];
  recommendCategory:CategoryInfo[] = [];
  latestMusicList: MusicInfo[] = [];

  //playerListMainPageId:string = ""
  songListIdCurrent:string= ""
  playerMusicList:MusicInfo[] = []

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
      this.getPersonalRecommend();
      
  }
  //获取全部歌单数据
  getSongListMainPage(){
    this.apiService.getAllSongList().subscribe(res => {
      if(res){
        this.songListMainPage = res;
      }
    })
  }

  getBanner(){
    this.mainService.getMainPageBanners().subscribe(res => {
      //console.log(res);
      this.bannerData = res;
    })
  }
  getCategory(){
    this.mainService.getMainPageRecommendCategory('true').subscribe(res => {
      //console.log(res);
      this.recommendCategory= res;
    })
  }
  getPersonalRecommend(){
    this.mainService.getpersonalRecommend().subscribe(res => {
      //console.log(res);
      this.personalAblumRecommend= res;
    })
  }
  getLatestMusic(){
    this.mainService.getMainPageFullMusicInfoList().subscribe(res => {
      //console.log(res);
      this.latestMusicList= res;
    })
  }

  //获取歌单内数据
  getPlayList(songListId:string){
    //console.log(id)
    this.songListIdCurrent = songListId;
    
    /* this.playerService.getMusicList(,'true').subscribe(res => {
      console.log(res);
      this.playerMusicList = res;
      this.stroe$.dispatch(setSongList({songList:res}))
      this.stroe$.dispatch(setPlayList({playingList:res}))
      this.stroe$.dispatch(setCurrentIndex({currentIndex:0}))

      
    }) */
    this.apiService.getMusicInfoBySongList(songListId).subscribe(res =>{
      /* this.stroe$.dispatch(setSongList({songList:res}))
      this.stroe$.dispatch(setPlayList({playingList:res}))
      this.stroe$.dispatch(setCurrentIndex({currentIndex:0})) */
      console.log(res)
    })
  }
    
}
