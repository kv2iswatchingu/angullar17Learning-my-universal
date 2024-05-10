
import { FooterPlayerService } from '@/app/service/footpalyer.service';
import { EasyMusicInfo, MusicInfo, defalutSrc } from '@/app/service/interface/main-interface.interface';
import { playMode } from '@/app/store/reducers/player.reducer';
import { getCurrentIndex, getPlayList, getPlayMode, getPlaying, getRawSong, getSongList } from '@/app/store/selectors/player.selector';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { Store} from '@ngrx/store';
import { Observable } from 'rxjs';
import { playerTimeFormat } from './playerTimeFormat.pipe';
import { setCurrentIndex } from '@/app/store/actions/player.action';


@Component({
  selector: 'app-footer-player',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatIconModule,
    MatSliderModule,
    FormsModule,
    playerTimeFormat
  ],
  templateUrl: './footer-player.component.html',
  styleUrl: './footer-player.component.scss'
})
export class FooterPlayerComponent {
  //@Input() myplayList = [];
  /*   @Input() playerList:EasyMusicInfo[] = []; */
  //playerList:EasyMusicInfo[] = [];
  //@ViewChild('audioSlider',{static:false})  audioSlider!:ElementRef;


  @Input() playerListMainPageId = "";


  defalutSrc:defalutSrc | undefined
  currentPlaySong:MusicInfo | undefined;

  playList:EasyMusicInfo[] = [];
  songList:EasyMusicInfo[] = [];
  currentIndex:number = 0;

  value = 0;
  @ViewChild('audioPlayer',{static:false}) audioPlayer!: ElementRef;

  durationTime:number | undefined
  currentTime:number | undefined

  count$:Observable<number> | undefined;
  isPlaying = false;
  songReady = false;



  constructor(
    //private mainPageView:MainPageComponent,
    private store$ : Store,
    private footservice:FooterPlayerService
  ){

    this.getDefalutSrc();
    this.store$.select(getSongList).subscribe(songlist =>{
      this.watchSongList(songlist)
    })
    this.store$.select(getPlayList).subscribe(playList =>{
      this.watchPlayList(playList)
    })
    this.store$.select(getCurrentIndex).subscribe(index =>{
      this.watchCurrentIndex(index)
    })
    this.store$.select(getPlayMode).subscribe(mode =>{
      this.watchPlayMode(mode)
    })
    this.store$.select(getPlaying).subscribe(isplay =>{
      this.watchIsPlaying(isplay)
    })
    this.store$.select(getRawSong).subscribe(raw =>{
      this.watchRawSong(raw)
    })
    
    
    
  }


  private watchSongList(songList:EasyMusicInfo[]){
    console.log('songlist',songList)
    this.songList = songList;
  }
  private watchPlayList(playList:EasyMusicInfo[]){
    console.log('playList',playList)
    this.playList = playList;
  }
  private watchCurrentIndex(currentIndex:number){
    console.log('currentIndex',currentIndex)
    this.currentIndex = currentIndex;
  }
  private watchIsPlaying(isplay:boolean){
  }
  private watchPlayMode(mode:playMode){
    
  }
  private watchRawSong(raw:EasyMusicInfo){
    if(this.currentIndex != -1){
      //console.log('raw',raw)
      this.footservice.getCurentMusicRaw(raw.id,'true').subscribe(res=>{
        this.currentPlaySong = res;
        console.log("raw",this.currentPlaySong)
        
      })
    }
    
  }
  
  getDefalutSrc(){
    this.footservice.getMusicCoverDefalut().subscribe(res=>{
      console.log(res)
      this.defalutSrc = res;
    })
  }
  

  ngOnInit(): void {
    
  }

  
  canPlay(event:Event){
    const audio = event.target as HTMLAudioElement
    this.durationTime = audio.duration;

    this.songReady = true;
    this.isPlaying = true;
    audio.play();
    
    
  }
  onTimeUpdate(event:Event){
    const audio = event.target as HTMLAudioElement
    this.currentTime = audio.currentTime;
  }

  getPlaySong(){
    //this.mainService.getMainPageAblumList().subscribe(res => {
      
  }
  playSong(){
    if(!this.currentPlaySong){
      if(this.playList.length){
        this.store$.dispatch(setCurrentIndex({currentIndex:0}))
        this.songReady = false;
      }
    }else{
       if(this.songReady){
        this.isPlaying = !this.isPlaying;
        if(this.isPlaying){
          this.audioPlayer.nativeElement.play();
        }else{
          this.audioPlayer.nativeElement.pause();
        }
        
      }
    }
  }
  onPrevSong(index:number){
    if(!this.songReady){return;}
    if(this.playList.length === 1){
      this.loopSong();
    }else{
      console.log(index)
      const newIndex = index <= 0 ? this.playList.length : index;
      this.store$.dispatch(setCurrentIndex({currentIndex:newIndex}));
      this.songReady = false;
    }
  }
  onNextSong(index:number){
    if(!this.songReady){
      return;
    }
    if(this.playList.length === 1){
      this.loopSong();
    }else{
      console.log(index)
      const newIndex = index >= this.playList.length ? 0 : index;
      
      this.store$.dispatch(setCurrentIndex({currentIndex:newIndex}));
      this.songReady = false;
    }
    
  }

  loopSong(){
    this.audioPlayer.nativeElement.currentTime = 0;
    this.isPlaying = true;
    this.audioPlayer.nativeElement.play();
  
  }



  showMusicList(){
  
    //this.playMusicListEasyInfo = this.mainPageView.playerMusicList
    //console.log(this.playMusicListEasyInfo)
  }
  dragStartFunction(){

  }
  dragEndFunction(event: any){
    console.log(event.value)
  }
  changeFunction(value:number){
    if(this.durationTime != undefined){
      this.audioPlayer.nativeElement.currentTime =
        this.durationTime * value / 100
    }
    
  }
  
/* 
  increment() {
    this.store.dispatch(increment());
    console.log("ss")
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    // TODO: Dispatch a reset action
  } */
  
}
