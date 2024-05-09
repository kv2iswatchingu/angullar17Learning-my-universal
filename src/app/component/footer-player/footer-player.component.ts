
import { EasyMusicInfo, MusicInfo } from '@/app/service/interface/main-interface.interface';
import { getSongList } from '@/app/store/selectors/player.selector';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { Store} from '@ngrx/store';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-footer-player',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatIconModule,
    MatSliderModule,
    FormsModule,
  ],
  templateUrl: './footer-player.component.html',
  styleUrl: './footer-player.component.scss'
})
export class FooterPlayerComponent {
  //@Input() myplayList = [];
  @Input() playerListMainPageId = "";
/*   @Input() playerList:EasyMusicInfo[] = []; */
  //playerList:EasyMusicInfo[] = [];

  currentIndex = 0;
  currentPlaySong:MusicInfo | undefined;
  playMusicListEasyInfo:EasyMusicInfo[] = [];
  //@ViewChild('audioSlider',{static:false})  audioSlider!:ElementRef;
  value = 0;


  count$:Observable<number> | undefined;

  constructor(
    //private mainPageView:MainPageComponent,
    //private store$ : Store<storePlayerModule>,
    private store: Store<{ count: number }>
  ){

    /* this.store$.select(getSongList).subscribe(list =>{
      console.log(list)
    }) */
  }

  

  ngOnInit(): void {
    
  }

  
  getPlaySong(){
    //this.mainService.getMainPageAblumList().subscribe(res => {
      
  }
  playSong(){
    this.getPlaySong();
    //console.log(this.audioSlider.nativeElement)

  }

  showMusicList(){
  
    //this.playMusicListEasyInfo = this.mainPageView.playerMusicList
    //console.log(this.playMusicListEasyInfo)
  }
  dragStartFunction(){

  }
  dragEndFunction(){

  }
  changeFunction(){

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
