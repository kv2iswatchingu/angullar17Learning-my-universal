import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import * as Jsmedia  from '@/app/pluginsScrpit/jsmediatags.min.js'
import { playerState } from '@/app/store/reducers/player.reducer';
import { Store } from '@ngrx/store';
import { setCurrentIndex, setPlayList, setSongList } from '@/app/store/actions/player.action';
import { getCurrentIndex, getPlayList, getPlayMode, getPlaying, getRawSong, getSongList } from '@/app/store/selectors/player.selector';
import { playerTimeFormat } from '@/app/component/audioPlayer/playerTimeFormat.pipe';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MusicInformation } from '@/app/interface/type.interface';




@Component({
  standalone:true,
  selector: 'app-cd-player-custom-page',
  imports: [
    CommonModule,
    NgOptimizedImage,
    MatFormFieldModule,
    MatInputModule,
    playerTimeFormat,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './cd-player-custom-page.component.html',
  styleUrls: ['./cd-player-custom-page.component.scss']
})
export class CdPlayerCustomPageComponent {
  files: any[] = [];
  localplayIndex:number = 0;
  localSongList:MusicInformation[] = []
  localPlayList:MusicInformation[] | undefined
  localCurrentSong:MusicInformation | undefined
  constructor(
    private store$:Store<playerState>
  ){
    this.store$.select(getSongList).subscribe(songlist =>{
      this.watchSongList(songlist)
    })
    this.store$.select(getPlayList).subscribe(playList =>{
      this.watchPlayList(playList)
    })
    this.store$.select(getCurrentIndex).subscribe(index =>{
      this.watchCurrentIndex(index)
    })    
    this.store$.select(getRawSong).subscribe(raw =>{
      this.watchRawSong(raw)
    })
  }

  private watchSongList(songList:MusicInformation[]){
    this.localSongList = songList;
  }
  private watchPlayList(playList:MusicInformation[]){
    this.localPlayList = playList;
  }
  private watchCurrentIndex(currentIndex:number){
    this.localplayIndex = currentIndex;
  }
  private watchRawSong(raw:MusicInformation){
    if(this.localplayIndex != -1){
      this.localCurrentSong = raw
      const index =  this.localSongList?.findIndex(item=>
        item._id == this.localCurrentSong?._id
      )
      if(index != -1 || index != undefined){
        this.localplayIndex = index;
      }
    }
  }
 

  

  async uploadLocalMusic(event:any){
    this.files = event.target.files;
    this.localSongList = await this.setlocalSonglist()
    this.store$.dispatch(setSongList({songList:this.localSongList}))
    this.store$.dispatch(setPlayList({playingList:this.localSongList}))
    this.store$.dispatch(setCurrentIndex({currentIndex:0}))
  }
  setlocalSonglist(){
    return new Promise<MusicInformation[]>(async (resolve,reject)=>{
      let songlist:MusicInformation[] = []
      for(let i = 0; i < this.files.length; i++){
        const file = this.files[i];
        const localurl = URL.createObjectURL(file);
        const durationTime = await this.getdurationtime(localurl)
        const localmusic = await this.setJsmedia(file,localurl,durationTime)
        songlist.push(localmusic)
      }
      resolve(songlist);
    })
  }
  setJsmedia(file:any,localurl:string,durationTime:number){
    return new Promise<MusicInformation>((resolve,reject)=>{
      let localmusic:MusicInformation; 
      Jsmedia.read(file,{
        onSuccess:function(tag:any){
          console.log(tag)
          const rawinfo = tag.tags;
          let  localmusicName;
          let  localmusicAuthor;
          let  localmusicAblum;
          let  localmusicGenre;
          let  localmusciCover;
          if(rawinfo.title != undefined){
            localmusicName = rawinfo.title;
          }else{
            localmusicName = file.name.replace(/\.[^/.]+$/, "");
          }
          if(rawinfo.artist != undefined){
            localmusicAuthor = rawinfo.artist;
          }else{
            localmusicAuthor = "无歌手作者信息"
          }
          if(rawinfo.album != undefined){
            localmusicAblum = rawinfo.album
          }else{
            localmusicAblum = "无专辑信息"
          }
          if(rawinfo.genre != undefined){
            localmusicGenre = rawinfo.genre
          }else{
            localmusicGenre = "无流派信息"
          }
          if(rawinfo.picture != undefined){
            localmusciCover = URL.createObjectURL(new Blob([new Uint8Array(rawinfo.picture.data).buffer]));
          }else{
            localmusciCover = "http://dummyimage.com/600x600/000/FFF&text=无封面"
          }
          localmusic = {
            _id:"local"+ localmusicName,
            coverRaw:localmusciCover,
            coverType:"",
            musicRaw:localurl,
            musicType:"",
            musicName:localmusicName,
            musicStyle:localmusicGenre,
            musicAuthor:localmusicAuthor,
            musicSinger:localmusicAuthor,
            musicUploadTime:"",
            musicLong:durationTime
          }
          //console.log(localmusic)
          resolve(localmusic);
        },
        onError: function(error: any) {
          console.error(error);
        }
      })
     
    })
  }
  getdurationtime(localurl:string){
    return new Promise<number>((resolve,reject)=>{
      const audio = new Audio(localurl);
      audio.addEventListener('loadedmetadata', function () {
        resolve(audio.duration)
      });
      
    })
  }
  uploadLocalLyric(event:any){
    this.files = event.target.files;
    if(this.files){
      for(let i = 0; i < this.files.length; i++){
        const file = this.files[i];
        console.log(file)
      }
    }
  }
  onChangeSong(song:MusicInformation){
    this.localCurrentSong = song;
    const newIndex = this.localPlayList!.findIndex(item => item._id == song._id)
    this.store$.dispatch(setCurrentIndex({currentIndex:newIndex}))
  }
}
