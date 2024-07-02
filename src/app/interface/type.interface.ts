export type SongList = {
    _id:string;
    _MusicIdList:string[]; 
    ImgRaw:string;
    songListName:string;
    songListDesprition:string;
    songListStyle:string;
    songListPop:number;
} 
export type songListSearch = {
    page?: number;
    limit?: number;
    sortBy?:string;
    name?:string;
    category?:string;
}

export type SongListPost = {
    _MusicIdList:string[];
    songListName:string;
    songListDesprition:string;
    songListStyle:string;
}

export type MusicInformation = {
    _id:string;
    coverRaw:string;
    coverType:string;
    musicRaw:string;
    musicType:string;
    musicName:string;
    musicStyle:string;
    musicSinger:string;
    musicAuthor:string;
    musicLong:number;
    musicUploadTime:string;
}

export type MusicInfoUpload = {
    _AblumId:string;
    musicName:string;
    musicStyle:string;
    musicSinger:string;
    musicAuthor:string;
    musicLong:number;
    musicUploadTime:string;
}

export type MusicInfoJsMedia = {
    musicTitle:string;
    musicSingerAuthor:string;
    musicStyle:string;
    musicDuration:number;
}

export type MusicInfoSearch = {
    page?: number;
    limit?: number;
    name?:string;
    style?:string;
    singer?:string;
    author?:string;
    //
    //
}


export type LyricRaw = {
    _MusicInfoId:string;
    lyricContent:string;
}

export type LyricApi = {
    lyric:string
}

export type AblumInfo ={
    ablumName:string;
    ablumBand:string;
    ablumYear:string;
}

export type AblumApi = {
    ablumId:string;
    ablumName:string;
    coverRaw:string;
    coverType:string;
    ablumBand:string;
    ablumYear:string;
    ablumPop:number;
}