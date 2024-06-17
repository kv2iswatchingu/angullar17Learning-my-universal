import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { Banner, CategoryInfo, EasyAblumInfo, defalutSrc } from '@/app/interface/main-interface.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AblumApi, AblumInfo, LyricApi, LyricRaw, MusicInfoUpload, MusicInformation, SongList } from '../interface/type.interface';

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
    //获取首页随机八个歌单列表
    getMainPageSonglist():Observable<SongList[]>{
        let url = this.serverAddress + `/songList/mainPage`;
        return this.http.get<SongList[]>(url).pipe(map(res => res));
    }
    




    //PART MUSICINFO
    //根据歌单的Id获取歌曲列表
    getMusicInfoBySongList(songListId:string):Observable<MusicInformation[]>{
        let url = this.serverAddress + `/musicInfo/songListId/${songListId}`;
        return this.http.get<MusicInformation[]>(url).pipe(map(res => res));
    }
    getMusicInfoByAblumId(ablumId:string):Observable<MusicInformation[]>{
        let url = this.serverAddress + `/musicInfo/ablumId/${ablumId}`;
        return this.http.get<MusicInformation[]>(url).pipe(map(res => res));
    }
    //上传一首歌
    postMusicInfo(file:File,musicInfo:MusicInfoUpload){
        const formData = new FormData();
        formData.append('file',file);
        formData.append('_AblumId',musicInfo._AblumId);
        formData.append('musicName',musicInfo.musicName);
        formData.append('musicStyle',musicInfo.musicStyle);
        formData.append('musicSinger',musicInfo.musicSinger);
        formData.append('musicAuthor',musicInfo.musicAuthor);
        formData.append('musicLong',musicInfo.musicLong.toString());
        formData.append('musicUploadTime',musicInfo.musicUploadTime);
        let url = this.serverAddress + `/musicInfo`;
        return this.http.post<string>(url,formData).pipe(map(res => res));
    }


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