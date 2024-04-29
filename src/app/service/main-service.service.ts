import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Banner, EasyAblumInfo } from './interface/main-interface.interface';
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
  getMainPageAblumList():Observable<EasyAblumInfo[]>{
    return this.http.get<EasyAblumInfo[]>(this.myMockApi + "/getMainpageAblumList")
    .pipe(map(res => res));
  }
}
