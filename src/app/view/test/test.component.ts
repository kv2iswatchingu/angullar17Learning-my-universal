import { ApiService } from '@/app/service/api.service';
import { PlayerService } from '@/app/service/player.service';
import { NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
  bound = false;
  test = "https://raw.githubusercontent.com/kv2iswatchingu/WebSitePicLibrary/main/neko_500.png"
  audio = "https://github.com/kv2iswatchingu/WebSitePicLibrary/raw/dev/resouce/music/%E6%98%9F%E3%81%AE%E8%A8%98%E6%86%B6%E3%81%AB%E5%88%BB%E3%81%BE%E3%82%8C%E3%81%97%E9%BB%92%E7%B4%AB%E3%81%AE%E7%BF%BC.mp3"
  audio2 = "https://github.com/kv2iswatchingu/WebSitePicLibrary/raw/dev/resouce/music/harukage.mp3"

  @ViewChild('audioPlayer',{static:false}) audioPlayer!: ElementRef;
  files: any[] = [];

  constructor(
    private playerService:PlayerService,
    private apiService:ApiService
  ){}

  playLocalMusic(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.audioPlayer.nativeElement.src = e.target.result;
        this.audioPlayer.nativeElement.play();
      };
      reader.readAsDataURL(file);
    }
  }
  uploadLocalMusic(event:any){
    this.files = event.target.files;
    if(this.files){
      for(let i = 0; i < this.files.length; i++){
        const file = this.files[i];
        console.log(file)
        this.playerService.postMusic(file).subscribe(res =>{
          console.log(res)
        })
      }
    }
    
  }

  getMucsc(){
    const a = "Awake.mp3";
    let url = "";
    this.playerService.getMusic(a).subscribe(res=>{
      console.log(res)
      if(res[0]){
        const buffer = res[0].musicRaw;
        let arr = buffer.split(',')
        //let mime = arr[0].match(/:(.*?);/)[1]
        let bstr = atob(arr[0])
        let n = bstr.length
        let u8arr = new Uint8Array(n)
        while(n --){
          u8arr[n] = bstr.charCodeAt(n)
        }
        const blob = new Blob([u8arr],{type:"audio/mpeg"})
        const reader = new FileReader();
        
        console.log(blob)
        url = URL.createObjectURL(blob)
       
      }
    })
    setTimeout(() => {
      console.log(url)
      this.audioPlayer.nativeElement.src = url;
      this.audioPlayer.nativeElement.play();
    }, 2000);

    
  }

  uploadLocalImg(event:any){
    this.files = event.target.files;
    if(this.files){
      for(let i = 0; i < this.files.length; i++){
        const file = this.files[i];
        console.log(file)
        this.playerService.postT(file).subscribe(res =>{
          console.log(res)
        })
      }
    }
    
  }


  uploadSongList(event:any){
    this.files = event.target.files;
    if(this.files){
      for(let i = 0; i < this.files.length; i++){
        const file = this.files[i];
        console.log(file)
        this.playerService.postSongList(file).subscribe(res =>{
          console.log(res)
        })
      }
    }
    
  }
  getLIST(){
    this.apiService.getAllSongList().subscribe(res=>{
      console.log("resAAAAAAAAAAAAAAAAA",res)
    })
  }

  myMockApi = "https://mock.apifox.com/m1/2316549-2454116-default"
}
