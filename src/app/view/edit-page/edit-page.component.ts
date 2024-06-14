import { AblumApi, AblumInfo, MusicInfoJsMedia, MusicInfoUpload } from '@/app/interface/type.interface';
import { ApiService } from '@/app/service/api.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import * as Jsmedia  from '@/app/pluginsScrpit/jsmediatags.min.js'
import { playerTimeFormat } from '@/app/component/audioPlayer/playerTimeFormat.pipe';

@Component({
  selector: 'app-edit-page',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule,
    FormsModule, 
    MatButtonModule,
    MatIconModule,
    MatSelectModule,  
    ReactiveFormsModule,
    playerTimeFormat,
  ],
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.scss'
})
export class EditPageComponent {
  ablumInfo:AblumInfo = { ablumName:"",ablumBand:"",ablumYear:""}
  ablumCover:File | undefined;
  ablumCoverBase64:string | undefined;
  //defalutImg = "http://dummyimage.com/600x600/000"

  //part2
  ablumControl = new FormControl<AblumApi | null>(null, Validators.required);
  ablumList:AblumApi[] | undefined;
  showCurrentAblum:AblumApi | null | undefined;
  musicInfoRaw:File | undefined;
  musicInfoUrl:string | undefined;
  durationTime:number = 0;
  @ViewChild('audioPlayer',{static:false}) audioPlayer!: ElementRef;
  musicInfo:MusicInfoUpload = { _AblumId:"",musicName:"",musicStyle:"",musicSinger:"",musicAuthor:"",musicLong:0,musicUploadTime:""}
  musicJs:MusicInfoJsMedia = { musicTitle:"",musicSingerAuthor:"",musicStyle:"",musicDuration:0}

  //
  

  constructor(
    private apiservice:ApiService
  ){

  }

  ngOnInit(){
    this.getAllAblum();
  }

 

  //part01
  uploadCover(event:any){
    if (event.target.files[0] && !event.target.files[0].type.startsWith('image/')) {
      console.log("err")
      return
    }
    this.ablumCover = event.target.files[0];
    if(this.ablumCover){
      this.ablumCoverBase64 = URL.createObjectURL(this.ablumCover)
    }
  }
  submitAblumInfo(){
    //console.log(this.ablumInfo)
    if(this.ablumInfo.ablumBand == "" || this.ablumInfo.ablumName == "" || this.ablumInfo.ablumYear == "" || this.ablumCover == undefined){
      return
    }else{
      this.apiservice.postAblum(this.ablumCover,this.ablumInfo).subscribe();
    }

  }



  //part02
  getAllAblum(){
    this.apiservice.getAllAblum().subscribe(res=>{
      this.ablumList = res;
    })
  }
  async uploadMusic(event:any){
    if (event.target.files[0] && !event.target.files[0].type.startsWith('audio/')) {
      console.log("err")
      return
    }
    this.musicInfoRaw = event.target.files[0];
    if(this.musicInfoRaw){
      this.musicInfoUrl = URL.createObjectURL(this.musicInfoRaw)
      this.durationTime = await this.getdurationtime(this.musicInfoUrl)
      this.musicJs = await this.getJsMediaInfo(this.musicInfoRaw,this.durationTime)
    }
  }
  ablumChanged(){
      this.showCurrentAblum = this.ablumControl.value;
  }
  getdurationtime(url:string){
    return new Promise<number>((resolve,reject)=>{
      this.audioPlayer.nativeElement.src = url;
      const audio = this.audioPlayer.nativeElement;
      audio.addEventListener('loadedmetadata', function () {
        resolve(audio.duration)
      });
    })
  }
  getJsMediaInfo(file:File,durationTime:number){
    return new Promise<MusicInfoJsMedia>((resolve,reject)=>{
      let musicJs:MusicInfoJsMedia; 
      Jsmedia.read(file,{
        onSuccess:function(tag:any){
          const rawinfo = tag.tags;
          let musicTitle:string;
          let musicSingerAuthor:string;
          let musicStyle:string;
          if(rawinfo.title != undefined){
            musicTitle = rawinfo.title;
          }else{
            musicTitle = file.name.replace(/\.[^/.]+$/, "");
          }
          if(rawinfo.artist != undefined){
            musicSingerAuthor = rawinfo.artist;
          }else{
            musicSingerAuthor = "无歌手作者信息"
          }
          if(rawinfo.genre != undefined){
            musicStyle = rawinfo.genre
          }else{
            musicStyle = "无流派信息"
          }
          musicJs = {
            musicTitle:musicTitle,
            musicSingerAuthor:musicSingerAuthor,
            musicStyle:musicStyle,
            musicDuration:durationTime
          }
          resolve(musicJs);
        },
        onError: function(error: any) {
          console.error(error);
        }
      })
     
    })
  }
  submitMusicInfo(){
    //console.log(this.ablumControl.value)
    if(this.ablumControl.value == null){
      console.log("err")
      return;
    }
    if(this.musicInfoRaw == undefined){
      console.log("err")
      return;
    }
    if(this.musicInfo.musicName == "" || this.musicInfo.musicStyle == "" || this.musicInfo.musicSinger == ""  || this.musicInfo.musicAuthor == ""){
      console.log("err")
      return;
    }
    this.musicInfo._AblumId = this.ablumControl.value.ablumId;
    this.musicInfo.musicLong = this.durationTime;
    this.musicInfo.musicUploadTime = new Date().toLocaleTimeString();
    //console.log(this.musicInfo)
    this.apiservice.postMusicInfo(this.musicInfoRaw,this.musicInfo).subscribe();
  }

}
