import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Banner, CategoryInfo, EasyAblumInfo, EasyMusicInfo, MusicInfo } from './interface/main-interface.interface';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FooterPlayerService {
  myMockApi = "https://mock.apifox.com/m1/2316549-2454116-default"

  constructor(private http:HttpClient) {
      
  }
   
  getMusicList():Observable<EasyMusicInfo[]>{
    return this.http.get<MusicInfo[]>(this.myMockApi + "/getFooterMusicList")
    .pipe(map(res => res));
  }
  getCurentMusicRaw(id:string,fake?:string):Observable<MusicInfo>{
    let url =  this.myMockApi + `/getFooterMusic/${id}`
    if(fake !== undefined){
      url += `?fake=${fake ? 'true' : 'false'}`
    }
    return this.http.get<MusicInfo>(url).pipe(map(res => res));
  }

}
