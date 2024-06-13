
import { createAction, props } from "@ngrx/store";
import { playMode } from "../reducers/player.reducer";
import { MusicInformation } from "@/app/interface/type.interface";

export const  setPlaying = createAction(
    '[player] set playing',
    props<{isPlaying:boolean}>()
)
export const  setPlayList = createAction(
    '[player] set playList',
    props<{playingList:MusicInformation[]}>()
)
export const  setSongList = createAction(
    '[player] set songList',
    props<{songList:MusicInformation[]}>()
)
export const  setPlayMode = createAction(
    '[player] set playmode',
    props<{playMode:playMode }>()
)
export const  setCurrentIndex = createAction(
    '[player] set currentIndex',
    props<{currentIndex:number}>()
)