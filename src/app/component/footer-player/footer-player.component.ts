
import { FooterPlayerService } from '@/app/service/footpalyer.service';
import { EasyMusicInfo, MusicInfo, defalutSrc } from '@/app/service/interface/main-interface.interface';
import { playMode } from '@/app/store/reducers/player.reducer';
import { getCurrentIndex, getPlayList, getPlayMode, getPlaying, getRawSong, getSongList } from '@/app/store/selectors/player.selector';
import { Component, ElementRef, Inject, InjectFlags, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { Store} from '@ngrx/store';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { playerTimeFormat } from './playerTimeFormat.pipe';
import { setCurrentIndex, setPlayList, setPlayMode } from '@/app/store/actions/player.action';
import { DOCUMENT } from '@angular/common';
import { getRandomValues } from 'crypto';

const REPEAT_ONE = "repeat_one"
const MODE_TYPE:playMode[] = [
  {
    type:'loop',
    label:'循环'
  },{
    type:'random',
    label:'随机'
  },{
    type:'singleLoop',
    label:'单曲循环'
  }
]

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

  songPercent = 0;
  songBuffer = 0;
  @ViewChild('audioPlayer',{static:false}) audioPlayer!: ElementRef;

  durationTime:number | undefined
  currentTime:number | undefined

  count$:Observable<number> | undefined;
  isPlaying = false;
  songReady = false;
  volumeSlider = false;
  volumeValue:number = 20;


  selfClick = false;


  
  currentMode:playMode | undefined
  currentModeIcon = "repeat";
  modeCount = 0;

  private winClick:Subscription | null | undefined;


  constructor(
    //private mainPageView:MainPageComponent,
    private store$ : Store,
    private footservice:FooterPlayerService,
    @Inject(DOCUMENT) private doc:Document
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
    this.currentMode = mode;
    this.getModeIcon(this.currentMode.type)
    if(this.songList){
      let list = this.songList.slice();
      if(mode.type == "random"){
        list = this.shuffle(this.songList);
        this.updateShuffleCurrentIndex(list,this.currentPlaySong!)
        this.store$.dispatch(setPlayList({playingList:list}));
      }
      //console.log(list)
     
    }
    


  }
  private watchRawSong(raw:EasyMusicInfo){
    if(this.currentIndex != -1){
      //console.log('raw',raw)
      console.log(raw.id)
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
  getModeIcon(type:string){
    switch(type){
      case 'loop' : this.currentModeIcon = 'repeat'; break;
      case 'random': this.currentModeIcon = 'shuffle'; break;
      case 'singleLoop': this.currentModeIcon = 'repeat_one'; break;
    }
  }
  shuffle<T>(arr:T[]):T[]{
    const result = arr.slice();
    for(let i = 0;i < result.length ;i++){
      const j = this.getRandomInt([0,i]);
      [result[i],result[j]] = [result[j],result[i]];
    }
    return result;
  }
  getRandomInt(range:[number,number]):number{
    return Math.floor(Math.random() * (range[1]- range[0] + 1) + range[0]);
  }

  updateShuffleCurrentIndex(list:EasyMusicInfo[],song:MusicInfo){
    const newIndex = list.findIndex(item => item.id == song.id)
    this.store$.dispatch(setCurrentIndex({currentIndex:newIndex}))
  }

  ngOnInit(): void {
    
  }

  
  canPlay(event:Event){
    const audio = event.target as HTMLAudioElement
    this.durationTime = audio.duration;

    this.songReady = true;
    this.isPlaying = true;
    audio.volume = this.volumeValue / 100;
    audio.play();
    
    
  }
  onTimeUpdate(event:Event){
    const audio = event.target as HTMLAudioElement
    this.currentTime = audio.currentTime;
    if(this.currentTime && this.durationTime){
      this.songPercent = this.currentTime / this.durationTime * 100;
      const buffered = this.audioPlayer.nativeElement.buffered;
      if(buffered.length && this.songBuffer < 100){
        this.songBuffer =  (buffered.end(0) / this.durationTime) * 100
      }
    }
  }
  onEnded(){
    this.isPlaying = false;
    if(this.currentMode?.type == 'singleLoop'){
      this.loopSong();
    }else{
      this.onNextSong(this.currentIndex + 1);
    }
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
    //if(!this.songReady){return;}
    if(this.playList.length === 1){
      this.loopSong();
    }else{
      console.log(index)
      const newIndex = index <= 0 ? this.playList.length : index;
      this.store$.dispatch(setCurrentIndex({currentIndex:newIndex}));
      //this.songReady = false;
    }
  }
  onNextSong(index:number){
    //if(!this.songReady){return;}
    if(this.playList.length === 1){
      this.loopSong();
    }else{
      console.log(index)
      console.log(index >= this.playList.length)
      const newIndex = index >= this.playList.length ? 0 : index;
      
      this.store$.dispatch(setCurrentIndex({currentIndex:newIndex}));
      //this.songReady = false;
    }
    
  }

  loopSong(){
    this.audioPlayer.nativeElement.currentTime = 0;
    this.isPlaying = true;
    this.audioPlayer.nativeElement.play();
  
  }

  /* showPlaying(value:number):string{
    if(this.durationTime != undefined){
      const nowtime = value / 100 * this.durationTime;
      const temp = nowtime | 0;
      const mins = temp / 60 | 0;
      const second = (temp % 60).toString().padStart(2,'0');
      return `${mins}:${second}`;
    }else{
      return "00:00"
    }
  } */


  showMusicList(){
  
    //this.playMusicListEasyInfo = this.mainPageView.playerMusicList
    //console.log(this.playMusicListEasyInfo)
  }
  dragStartFunction(){

  }
  dragEndFunction(event: any){
    console.log(event.value)
    if(this.durationTime != undefined){
      this.audioPlayer.nativeElement.currentTime =
        this.durationTime * event.value / 100
    }

  }



  onShowVolumeSlider(event:MouseEvent){
    event.stopPropagation();
    this.showVolumeSlider();
  }
  showVolumeSlider(){
    this.volumeSlider = !this.volumeSlider;
    if(this.volumeSlider){
      this.bindDocumentClickListener();
    }else{
      this.unbindDocumentClickListener();
    }
  }
  bindDocumentClickListener() {
    if(!this.winClick){
      this.winClick = fromEvent(this.doc,'click').subscribe(()=>{
        if(!this.selfClick){
          this.volumeSlider =false
          this.unbindDocumentClickListener();
        }
        this.selfClick = false;
      })
    }
  }
  unbindDocumentClickListener() {
    if(this.winClick){
      this.winClick.unsubscribe();
      this.winClick = null
    
    }
  }
  volumeChange(value:number){
    this.audioPlayer.nativeElement.volume = value / 100;
  }
  

  modeChange(){
    const temp = MODE_TYPE[++this.modeCount % 3];
    this.store$.dispatch(setPlayMode({playMode:temp}))
  }
}
