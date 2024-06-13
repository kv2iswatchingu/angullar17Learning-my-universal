import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Banner, CategoryInfo, EasyAblumInfo, defalutSrc } from '@/app/interface/main-interface.interface';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  myMockApi = "https://mock.apifox.cn/m1/2316549-2454116-default"

  constructor(private http:HttpClient) {
      
  }
   
 
  getMusicCoverDefalut():Observable<defalutSrc>{
    return this.http.get<defalutSrc>(this.myMockApi + "/getDefalutSrc")
    .pipe(map(res => res));
  }
  

  /////LOCOALHOST3000
  serverAddress = "http://localhost:3000/";

  uploadMusic(file:File):Observable<any>{
    const formData = new FormData();
    formData.append('file',file)
    return this.http.post<any>(this.serverAddress + 'musicSavePrivate',formData,{
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(error => {
        console.error('Error uploading file:', error);
        return error;
      })
    );
  }

  getMusic(musicName:string):Observable<any>{
    return this.http.get<any>(this.serverAddress + 'musicSavePrivate' + musicName)
    .pipe(map(res => res));
  }
  //postAblum
  postT(file:File):Observable<string>{
    const formData = new FormData();
    formData.append('file',file)
    /* const data = {
      ablumName:"数字电台",
      ablumBand:"真空管",
      ablumYear:"2250"
    } */
    formData.append('ablumName',"数字电台")
    formData.append('ablumBand',"真空管")
    formData.append('ablumYear',"2250")
    return this.http.post<string>(this.serverAddress + 'ablum',formData).pipe(map(res => res));
  }
  postMusic(file:File):Observable<string>{
    const formData = new FormData();
    formData.append('file',file)
    formData.append('_AblumId',"666a5886d0adb60f07bf71d6")
    formData.append('musicName','Awake')
    formData.append('musicStyle','JRock')
    formData.append('musicSinger','yuiko')
    formData.append('musicAuthor','yuiko')
    formData.append('musicLong','224')
    formData.append('musicUploadTime','2024-6-10')
    let url = this.serverAddress + 'musicInfo'
    return this.http.post<string>(url,formData).pipe(map(res => res));
  }

  postSongList(file:File):Observable<string>{
    const formData = new FormData();
    formData.append('file',file)
    let arr = ['666a5908d0adb60f07bf71db']
    for(let i = 0; i < arr.length; i ++){
      formData.append('_MusicIdList',arr[i])
    }
    formData.append('songListName','我的测试歌单')
    formData.append('songListDesprition','测试测试测试测试从')
    formData.append('songListStyle','JRock')
    return this.http.post<string>(this.serverAddress + 'songList',formData).pipe(map(res => res));
  }

  

}
  ///Otheroutput 
  //getMusic()


