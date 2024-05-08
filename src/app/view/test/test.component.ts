import { NgOptimizedImage } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { map } from 'rxjs';

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
    private http:HttpClient
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
      }
    }
    
  }

  myMockApi = "https://mock.apifox.com/m1/2316549-2454116-default"
  myfun(){
    /* this.footerplayerService.getMusicList().subscribe(res => {
      console.log(res);
      
    }) */
    this.http.get<any>(this.myMockApi + "/getFooterMusicList")
    .pipe(map(res => res))
    .subscribe(res=>{
      console.log(res)
    })
  }
}
