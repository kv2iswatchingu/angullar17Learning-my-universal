import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Banner, CategoryInfo, EasyAblumInfo, MusicInfo, apiLyric, defalutSrc } from '@/app/interface/main-interface.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MusicInformation, SongList } from '../interface/type.interface';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http:HttpClient) {}

    serverAddress = "http://localhost:3000";

    //PART SONGLIST
    //获取所有歌单列表
    getAllSongList():Observable<SongList[]>{
        let url = this.serverAddress + `/songList/all`;
        return this.http.get<SongList[]>(url).pipe(map(res => res));
    }
    //根据歌单的Id获取歌曲列表
    getMusicInfoBySongList(songListId:string):Observable<MusicInformation[]>{
        let url = this.serverAddress + `/musicInfo/${songListId}`;
        return this.http.get<MusicInformation[]>(url).pipe(map(res => res));
    }




    //PART MUSICINFO

    
}