
import { EasyMusicInfo, MusicInfo } from '@/app/service/interface/main-interface.interface';
import { MainPageComponent } from '@/app/view/main-page/main-page.component';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';


@Component({
  selector: 'app-footer-player',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatIconModule,
    MatSliderModule,
    FormsModule
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

  constructor(
    private mainPageView:MainPageComponent,
    
  ){
   
  }
  ngOnInit(): void {
    
  }
  /* getPlayeList(){
    this.footerplayerService.getMusicList().subscribe(res => {
      console.log(res);
      this.playMusicListEasyInfo = res
    })
  } */
  
  getPlaySong(){
    //this.mainService.getMainPageAblumList().subscribe(res => {
      
  }
  playSong(){
    this.getPlaySong();
    //console.log(this.audioSlider.nativeElement)

  }

  showMusicList(){
  
    this.playMusicListEasyInfo = this.mainPageView.playerMusicList
    console.log(this.playMusicListEasyInfo)
  }

  value = 0;
}
