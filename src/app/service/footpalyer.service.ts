import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Banner, CategoryInfo, EasyAblumInfo, EasyMusicInfo, MusicInfo, defalutSrc } from './interface/main-interface.interface';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FooterPlayerService {
  myMockApi = "https://mock.apifox.com/m1/2316549-2454116-default"

  constructor(private http:HttpClient) {
      
  }
   
  getMusicList(ablumId:string,fake?:string):Observable<EasyMusicInfo[]>{
    let url =  this.myMockApi + `/getFooterMusicList?ablumId=${ablumId}`
    if(fake){
      url += `&fake=${fake}`
    }
    return this.http.get<EasyMusicInfo[]>(url).pipe(map(res => res));
    /* return this.http.get<EasyMusicInfo[]>(this.myMockApi + "/getFooterMusicList")
    .pipe(map(res => res)); */
  }
  
  getCurentMusicRaw(id:string,fake?:string):Observable<MusicInfo>{
    let url =  this.myMockApi + `/getFooterMusic?id=${id}`
    if(fake){
      url += `&fake=${fake}`
    }
    return this.http.get<MusicInfo>(url).pipe(map(res => res));
  }
  getMusicCoverDefalut():Observable<defalutSrc>{
    return this.http.get<defalutSrc>(this.myMockApi + "/getDefalutSrc")
    .pipe(map(res => res));
  }
}
