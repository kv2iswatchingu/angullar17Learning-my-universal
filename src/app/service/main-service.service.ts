import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Banner, CategoryInfo, EasyAblumInfo, MusicInfo } from './interface/main-interface.interface';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MainService {
  myMockApi = "https://mock.apifox.com/m1/2316549-2454116-default"

  constructor(private http:HttpClient) {
      
  }
  //首页接口 
  
  //获取首页轮播图数据
  getMainPageBanners():Observable<Banner[]>{
    return this.http.get<Banner[]>(this.myMockApi + "/getBanner")
    .pipe(map(res => res));
  }
  //获取首页推荐音乐数据
  getMainPageAblumList(fake?:string):Observable<EasyAblumInfo[]>{
    let url =  this.myMockApi + `/getMainpageAblumList`
    if(fake != undefined){
      url += `?fake=${fake}`
    }
    return this.http.get<EasyAblumInfo[]>(url).pipe(map(res => res));
  }
  //获取首页分类信息
  getMainPageRecommendCategory(fake?:string):Observable<CategoryInfo[]>{
    let url =  this.myMockApi + `/getMainpageCategory`
    if(fake != undefined){
      url += `?fake=${fake}`
    }
    return this.http.get<CategoryInfo[]>(url).pipe(map(res => res));

    /* return this.http.get<CategoryInfo[]>(this.myMockApi + "/getMainpageCategory")
    .pipe(map(res => res)); */
  }
  //
  getpersonalRecommend(fake?:string):Observable<EasyAblumInfo[]>{
    let url =  this.myMockApi + `/getPersonalRecommend`
    if(fake != undefined){
      url += `?fake=${fake}`
    }
    return this.http.get<EasyAblumInfo[]>(url).pipe(map(res => res));
  }
  ////
  getMainPageFullMusicInfoList(fake?:string):Observable<MusicInfo[]>{
    let url =  this.myMockApi + `/getLatestMusicList`
    if(fake != undefined){
      url += `?fake=${fake}`
    }
    return this.http.get<MusicInfo[]>(url).pipe(map(res => res));
  }
}
