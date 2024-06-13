export type Banner = {
    targetId:number,
    url:string,
    imageUrl:string
}
export type EasyAblumInfo = {
    id:string,
    ablumName:string,
    ablumCover:string,
    ablumView:number
}
export type CategoryInfo = {
    category:string
}
/* export type MusicInfo = {
    id:string,
    ablumName:string,
    ablumCover:string,
    ablumView:number,
    musicName:string,
    musicPlaytimes:number,
    musicUrl:string,
    musicStyle:string,
    musicAuthor:string,
    musicSinger:string,
    musicBand:string,
    musicLatestTime:string,
    musicUploadTime:string,
    musicLike:string,
    musicLong:number
} */
export type defalutSrc = {
    src:string
}

export interface LyricAnalysised {
    lyricText:string,
    lyricTime:number
};