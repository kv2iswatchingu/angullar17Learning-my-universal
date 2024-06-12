export type SongList = {
    _id:string;
    _MusicIdList:string[]; 
    ImgRaw:string;
    songListName:string;
    songListDesprition:string;
    songListStyle:string;
    songListPop:number;
} 

export type MusicInformation = {
    _id:string;
    _AblumId:string;
    musicRaw:string;
    musicName:string;
    musicStyle:string;
    musicSinger:string;
    musicAuthor:string;
    musicLong:number;
    musicUploadTime:string;
}