import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { Banner, CategoryInfo, EasyAblumInfo, defalutSrc } from '@/app/interface/main-interface.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AblumApi, AblumInfo, LyricApi, LyricRaw, MusicInformation, SongList } from '../interface/type.interface';

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



    //PART ABLUM
    //获取所有专辑列表
    getAllAblum():Observable<AblumApi[]>{
        let url = this.serverAddress + `/ablum/getAll`;
        return this.http.get<AblumApi[]>(url).pipe(map(res=>res));
    }
    //上传专辑
    postAblum(file:File,ablumData:AblumInfo){
        const formData = new FormData();
        formData.append('file',file)
        formData.append('ablumName',ablumData.ablumName)
        formData.append('ablumBand',ablumData.ablumBand)
        formData.append('ablumYear',ablumData.ablumYear)
        return this.http.post<string>(this.serverAddress + '/ablum',formData).pipe(map(res => res));
    }


    //PART Lyric
    //上传歌词接口
    createLyric(lyricData:LyricRaw){
        let url = this.serverAddress + `/lyric`;
        return this.http.post(url,lyricData).pipe(map(res => res))
    }
    //根据歌曲的Id获取歌词
    getLyricById(musicInfoId:string):Observable<LyricApi>{
        let url = this.serverAddress + `/lyric/${musicInfoId}`
        return this.http.get<LyricApi>(url).pipe(map(res => res))
    }



    
    
}