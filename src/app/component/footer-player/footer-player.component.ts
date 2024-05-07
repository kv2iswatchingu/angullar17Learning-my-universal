import { FooterPlayerService } from '@/app/service/footpalyer.service';
import { EasyMusicInfo, MusicInfo } from '@/app/service/interface/main-interface.interface';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-footer-player',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatIconModule
  ],
  templateUrl: './footer-player.component.html',
  styleUrl: './footer-player.component.scss'
})
export class FooterPlayerComponent {
  //@Input() myplayList = [];
  @Input() playerListMainPageId = "";

  currentIndex = 0;
  currentPlaySong:MusicInfo | undefined;
  playMusicListEasyInfo:EasyMusicInfo[] = [];

  constructor(
    private footerplayerService: FooterPlayerService
  ){
   
  }
  ngOnInit(): void {
    //this.getPlayeList();
  }
  /* getPlayeList(){
    this.footerplayerService.getMusicList().subscribe(res => {
      console.log(res);
      this.playMusicListEasyInfo = res
    })
  } */
  getPlaySong(){
    //this.mainService.getMainPageAblumList().subscribe(res => {
     // console.log(res);
     // this.mainPageAblumList = res
    //})
    
  }
  playSong(){
    this.getPlaySong();


  }
}
