import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { NgOptimizedImage } from '@angular/common'
import { MainService } from '@/app/service/main-service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CarouselComponent } from '@/app/component/carousel/carousel.component';
import { AlbumListComponent } from '@/app/component/album-list/album-list.component';
import { Banner, CategoryInfo, EasyAblumInfo, EasyMusicInfo, MusicInfo } from '@/app/service/interface/main-interface.interface';
import { MainPageRecommendTabComponent } from '@/app/component/main-page-recommend-tab/main-page-recommend-tab.component';
import { EasypalyerlistComponent } from '@/app/component/easypalyerlist/easypalyerlist.component';
import { FooterPlayerComponent } from '@/app/component/footer-player/footer-player.component';
import { FooterPlayerService } from '@/app/service/footpalyer.service';
import { Store } from '@ngrx/store';
import { setCurrentIndex, setPlayList, setSongList } from '@/app/store/actions/player.action';
import { getCurrentIndex, getSongList } from '@/app/store/selectors/player.selector';
import { playerState } from '@/app/store/reducers/player.reducer';



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
    FooterPlayerComponent,
    HttpClientModule


  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit{
  //@ViewChild(FooterPlayerComponent) footerPlayerComponent!:FooterPlayerComponent;


  isLoading = false;
  //mainPageAblumList:EasyAblumInfo[] = [];
  bannerData:Banner[] = [];
  mainPageAblumList:EasyAblumInfo[] = [];
  personalAblumRecommend:EasyAblumInfo[] = [];
  recommendCategory:CategoryInfo[] = [];
  latestMusicList: MusicInfo[] = [];

  playerListMainPageId:string = ""
  playerMusicList:EasyMusicInfo[] = []

  constructor(
    private http:HttpClient,
    private mainService: MainService,
    private footerplayerService: FooterPlayerService,
    private stroe$:Store<playerState>
  ){
   
  }
  ngOnInit(): void {
      this.getBanner();
      //this.getAblumMainPage();
      this.getAblumMainPage();
      this.getCategory();
      this.getPersonalRecommend();
      //this.getLatestMusic();
      /* this.route.data.subscribe(res =>{
        const what:EasyAblumInfo[]  = res['']
        this.mainPageAblumList = res
      }) */
  }
  getAblumMainPage(){
    this.mainService.getMainPageAblumList('true').subscribe(res => {
      //console.log(res);
      this.mainPageAblumList = res
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


  getPlayList(id:string){
    console.log(id)
    this.playerListMainPageId = id;
    
    this.footerplayerService.getMusicList(id,'true').subscribe(res => {
      console.log(res);
      this.playerMusicList = res;
      this.stroe$.dispatch(setSongList({songList:res}))
      this.stroe$.dispatch(setPlayList({playingList:res}))
      this.stroe$.dispatch(setCurrentIndex({currentIndex:0}))

      
    })
    /* this.stroe$.select(getCurrentIndex).subscribe(res=>{
      console.log(res)
    })
    this.stroe$.select(getSongList).subscribe(res=>{
      console.log(res)
    }) */
  }
    
}
