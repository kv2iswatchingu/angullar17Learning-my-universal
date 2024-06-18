
import { PlayerService } from '@/app/service/player.service';
import { defalutSrc } from '@/app/interface/main-interface.interface';
import { playMode } from '@/app/store/reducers/player.reducer';
import { getCurrentIndex, getPlayList, getPlayMode, getPlaying, getRawSong, getSongList } from '@/app/store/selectors/player.selector';
import { Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { Store} from '@ngrx/store';
import { Observable, Subscription, findIndex, fromEvent } from 'rxjs';
import { playerTimeFormat } from './playerTimeFormat.pipe';
import { setCurrentIndex, setPlayList, setPlayMode, setSongList } from '@/app/store/actions/player.action';
import { DOCUMENT } from '@angular/common';
import { PlayerLycPanelComponent } from './detailPanel/player-lyc-panel/player-lyc-panel.component';
import { MusicInformation } from '@/app/interface/type.interface';


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
  selector: 'app-player',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatIconModule,
    MatSliderModule,
    FormsModule,
    playerTimeFormat,
    PlayerLycPanelComponent,
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class AudioPlayerComponent {

  @Input() playerListMainPageId = "";


  defalutSrc:defalutSrc | undefined
  currentPlaySong:MusicInformation | undefined;

  playList:MusicInformation[] = [];
  songList:MusicInformation[] = [];
  currentIndex:number = 0;

  songPercent = 0;
  songBuffer = 0;
  @ViewChild('audioPlayer',{static:false}) audioPlayer!: ElementRef;
  @ViewChild(PlayerLycPanelComponent,{static: false }) lyricPanel: PlayerLycPanelComponent | undefined;

  durationTime:number | undefined
  currentTime:number | undefined

  count$:Observable<number> | undefined;
  isPlaying = false;
  songReady = false;
  volumeSlider = false;
  lycPanelshow = false;
  volumeValue:number = 20;


  selfClick = false;


  
  currentMode:playMode | undefined
  currentModeIcon = "repeat";
  modeCount = 0;

  private winClick:Subscription | null | undefined;


  constructor(
    //public dialog: MatDialog,
    private store$ : Store,
    private footservice:PlayerService,
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
    this.store$.select(getRawSong).subscribe(raw =>{
      this.watchRawSong(raw)
    })
  }


  private watchSongList(songList:MusicInformation[]){
    console.log('songlist',songList)
    this.songList = songList;
  }
  private watchPlayList(playList:MusicInformation[]){
    console.log('playList',playList)
    this.playList = playList;
  }
  private watchCurrentIndex(currentIndex:number){
    console.log('currentIndex',currentIndex)
    this.currentIndex = currentIndex;
  }
  private watchPlayMode(mode:playMode){
    this.currentMode = mode;
    this.getModeIcon(this.currentMode.type)
    if(this.songList){
      let list = this.songList.slice();
      if(mode.type == "random"){
        list = this.shuffle(this.songList);
      }
      this.updateShuffleCurrentIndex(list,this.currentPlaySong!)
      this.store$.dispatch(setPlayList({playingList:list}));
    }
  }
  private watchRawSong(raw:MusicInformation){
    if(this.currentIndex != -1){
      console.log('raw',raw)
      this.currentPlaySong = raw
      //this.loadEnd = false
    }
  }

  ngOnInit(): void {
    
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
  updateShuffleCurrentIndex(list:MusicInformation[],song:MusicInformation){
    const newIndex = list.findIndex(item => item._id == song._id)
    this.store$.dispatch(setCurrentIndex({currentIndex:newIndex}))
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
    if(this.playList.length === 1){
      this.loopSong();
    }else{
      const newIndex = index < 0 ? this.playList.length - 1 : index;
      this.store$.dispatch(setCurrentIndex({currentIndex:newIndex}));
    }
  }
  onNextSong(index:number){
    if(this.playList.length === 1){
      this.loopSong();
    }else{
      const newIndex = index >= this.playList.length ? 0 : index;
      this.store$.dispatch(setCurrentIndex({currentIndex:newIndex}));
    }
  }

  loopSong(){
    this.audioPlayer.nativeElement.currentTime = 0;
    this.isPlaying = true;
    this.audioPlayer.nativeElement.play();
    if(this.lyricPanel){
      this.lyricPanel.seekLyric(0)
    }
  }




  showMusicList(){
    this.lycPanelshow = !this.lycPanelshow;
  }
  dragStartFunction(){

  }
  dragEndFunction(event: any){
    if(this.durationTime != undefined){
      this.audioPlayer.nativeElement.currentTime = this.durationTime * event.value / 100
      if(this.lyricPanel){
        this.lyricPanel.seekLyric(this.durationTime * event.value / 100 * 1000)
      }
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

  onChangeSong(song:MusicInformation){
    this.currentPlaySong = song;
    this.updateShuffleCurrentIndex(this.playList,this.currentPlaySong!)
  }

  onClearAll(){
    



    this.store$.dispatch(setSongList({songList:[]}))
    this.store$.dispatch(setPlayList({playingList:[]}))
    this.store$.dispatch(setCurrentIndex({currentIndex:-1}))
  }

  onDeleteSong(music:MusicInformation){
    const songList = this.songList.slice();
    const playList = this.playList.slice();
    let currentIndex = this.currentIndex;
    const indexS = songList.findIndex(item => item._id == music._id);
    const indexP = playList.findIndex(item => item._id == music._id);
    songList.splice(indexS,1)
    playList.splice(indexP,1)
    if(currentIndex > indexP || currentIndex == playList.length){
      currentIndex--;
    }
    this.store$.dispatch(setSongList({songList:songList}))
    this.store$.dispatch(setPlayList({playingList:playList}))
    this.store$.dispatch(setCurrentIndex({currentIndex:currentIndex}))
  }




}


