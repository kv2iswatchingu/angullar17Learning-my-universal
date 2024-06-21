import { AblumApi, AblumInfo, MusicInfoJsMedia, MusicInfoSearch, MusicInfoUpload, MusicInformation, SongListPost } from '@/app/interface/type.interface';
import { ApiService } from '@/app/service/api.service';
import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import * as Jsmedia  from '@/app/pluginsScrpit/jsmediatags.min.js'
import { playerTimeFormat } from '@/app/component/audioPlayer/playerTimeFormat.pipe';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import {PageEvent, MatPaginatorModule, MatPaginatorIntl, MatPaginator} from '@angular/material/paginator';


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
    MatCheckboxModule,
    playerTimeFormat,
    MatListModule,
    MatPaginatorModule
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

  //part3
  songListPost:SongListPost = {_MusicIdList:[],songListName:"",songListDesprition:"",songListStyle:""}
  songListImg:File | undefined;
  songListImgUrl:string | undefined;

  searchInput:string = "";
  searchFirst:boolean = true;
  searchMusicList:MusicInformation[] = [];
  
  musicSearch:MusicInfoSearch ={
    page:1,
    limit:6
  }
  //@ViewChild('selectMusic',{static:false}) selectMusic!: ElementRef;
  @ViewChild(MatSelectionList,{static: false }) selectMusic!: MatSelectionList;
  musicIdList:string[] = []
  musicIdListCurrentPage:string[] | null | undefined;
  pageLength:number = 0;
  pageIndex:number = 0;

  constructor(
    private apiservice:ApiService,
    private matPage: MatPaginatorIntl
  ){
    matPage.firstPageLabel = "第一页"
    matPage.lastPageLabel = "最后一页"
    matPage.nextPageLabel = "下一页"
    matPage.previousPageLabel = "上一页"
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



  //part03
  uploadSongListImg(event:any){
    if (event.target.files[0] && !event.target.files[0].type.startsWith('image/')) {
      console.log("err")
      return
    }
    this.songListImg = event.target.files[0];
    if(this.songListImg){
      this.songListImgUrl = URL.createObjectURL(this.songListImg)
    }
  }
  searchMusic(){
    this.musicSearch.page = 1;
    this.pageIndex = 0;
    this.musicIdList = [];
    this.musicIdListCurrentPage = [];
    this.musicSearchApi();
  }
  musicSearchApi(){
    this.apiservice.getTotalBySearch(this.musicSearch).subscribe(res=>{
      this.pageLength = res;
    })
    this.apiservice.getMusicInfoBySearch(this.musicSearch).subscribe(res=>{
      //console.log(res,"editSearch");
      this.searchMusicList = res;
      this.searchFirst = false;
    })
  }
  pageChange(event:PageEvent){
    this.musicSearch.page = event.pageIndex + 1;
    if( this.musicIdListCurrentPage){
      this.musicIdListCurrentPage.forEach(item =>{
        if(!this.musicIdList.includes(item)){
          this.musicIdList.push(item)
        }
      })
    }
    this.musicSearchApi();
    this.pageIndex = event.pageIndex;
  }
  selectionChange(){
    this.musicIdListCurrentPage =  this.selectMusic._value;
  }
  


  songListSubmit(){
    if( this.musicIdListCurrentPage){
      this.musicIdListCurrentPage.forEach(item =>{
        if(!this.musicIdList.includes(item)){
          this.musicIdList.push(item)
        }
      })
    }
    if(this.musicIdList.length == 0){
      console.log("err")
      return;
    }else{
      this.songListPost._MusicIdList = this.musicIdList;
    }
    if(this.songListImg == undefined){
      console.log("err")
      return;
    }
    if(this.songListPost._MusicIdList.length == 0 || this.songListPost.songListName == "" || this.songListPost.songListStyle == ""  || this.songListPost.songListDesprition == ""){
      console.log("err")
      return;
    }
    this.apiservice.postSongList(this.songListImg,this.songListPost).subscribe();
  }


}
