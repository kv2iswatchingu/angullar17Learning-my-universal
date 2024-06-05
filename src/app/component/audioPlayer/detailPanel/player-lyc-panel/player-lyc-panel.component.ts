import { LyricAnalysised, MusicInfo } from '@/app/interface/main-interface.interface';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { playerTimeFormat } from '@/app/component/audioPlayer/playerTimeFormat.pipe';
import { PlayerService } from '@/app/service/player.service';
import { LyricAnalysis } from './lyricAnalysis';
import { ScrollComponnetComponent } from '../scroll-componnet/scroll-componnet.component';
import { compose } from '@ngrx/store';

@Component({
  standalone: true,
  imports: [
    MatButtonModule, 
    MatIconModule,
    FormsModule,
    CommonModule,
    MatListModule,
    playerTimeFormat,
    ScrollComponnetComponent,
  ],
  selector: 'app-player-lyc-panel',
  templateUrl: './player-lyc-panel.component.html',
  styleUrls: ['./player-lyc-panel.component.scss']
})
export class PlayerLycPanelComponent {
  @Input() songList:MusicInfo[] | undefined;
  @Input() currentSong:MusicInfo | undefined;
  @Input() show:boolean = false;
  @Input() playing:boolean = false;
  @Output() outputClosePanel = new EventEmitter();
  @Output() outputOnChangeSong = new EventEmitter<MusicInfo>();
  @ViewChild('lyric',{static:true}) private lyricDom!:ScrollComponnetComponent;
 // @ViewChild('lyric',{static:true}) private lyricHtml!:ElementRef;
  currentIndex:number | undefined = 0;
  currentLyric:LyricAnalysised[] = [];
  songLyric:LyricAnalysis | undefined;
  currentLyricLineNum:number = 0;
  lyricRefs: NodeList | undefined;

  constructor(
    private playerService:PlayerService
  ){}

  ngOnInit(){}

  ngOnChanges(changes:SimpleChanges):void{
    if(changes['playing']){
      if(!changes['playing'].firstChange){
        if(this.songLyric){
          this.songLyric.togglePlay(this.playing)
          //this.songLyric.lyricplay();
        }
      }
    }
    if(changes['songList']){
      //console.log(this.songList)
      
    }
    if(changes['currentSong']){
      const index =  this.songList?.findIndex(item=>
        item.id == this.currentSong?.id
      )
      if(index != -1 || index != undefined){
        this.currentIndex = index;
        if(this.currentSong){
          this.updateLyc(this.currentSong.id);
        }else{
          this.resetLyric();
        }
        
      }
      /* if(this.currentSong){
        if(this.show){
          this.scrollToCurrent();
        }
      } */
    }
    if(changes['show']){
      console.log(this.show)
      if(!changes['show'].firstChange && this.show){
        this.lyricDom.refreshScroll();
      }
    }
  }

  closePanel(){
    this.outputClosePanel.emit()
  }
  onChangeSong(song:MusicInfo){
    this.outputOnChangeSong.emit(song)
  }
  updateLyc(id:string){
    this.resetLyric();
    this.playerService.getMusicLyric(id,"true").subscribe(res=>{
      console.log(res);
      this.songLyric = new LyricAnalysis(res.lyric)
      this.currentLyric = this.songLyric.lyricAnalsised;
      //console.log(this.currentLyric) 
      /* this.songLyric.handler */
      this.handleLyric();
      
      this.lyricDom.scrollTo(0,0)


      if(this.playing){
        this.songLyric.lyricplay();
      }
    })
  }

  private handleLyric(){
    this.songLyric?.handler.subscribe(({lineNumber})=>{
      //console.log(lineNumber)
      if(!this.lyricRefs){
        this.lyricRefs = this.lyricDom.el.nativeElement.querySelectorAll('mat-list-item')
      }
      if(this.lyricRefs?.length){
        this.currentLyricLineNum = lineNumber;
        const targetLine = this.lyricRefs[lineNumber];
        if(targetLine){
          this.lyricDom.scrollToElement(targetLine,300,false,-100)
        }
      }


      this.currentLyricLineNum = lineNumber;
    })
  }
  /* scrollToCurrent(){
    const lyricRef = this.lyricDom.el.nativeElement.querySelectorAll('mat-list-item')
    //console.log(lyricRef)
  } */
  resetLyric(){
    if(this.songLyric){
      this.songLyric.stop();
      this.songLyric = undefined;
      this.currentLyric = [];
      this.currentLyricLineNum = 0;
      this.lyricRefs = undefined;
    }
  }

  seekLyric(time:number){
    if(this.songLyric){
      this.songLyric.seek(time);
    }
  }
}
