import { MusicInfo } from "@/app/interface/main-interface.interface";
import { createAction, props } from "@ngrx/store";
import { playMode } from "../reducers/player.reducer";

export const  setPlaying = createAction(
    '[player] set playing',
    props<{isPlaying:boolean}>()
)
export const  setPlayList = createAction(
    '[player] set playList',
    props<{playingList:MusicInfo[]}>()
)
export const  setSongList = createAction(
    '[player] set songList',
    props<{songList:MusicInfo[]}>()
)
export const  setPlayMode = createAction(
    '[player] set playmode',
    props<{playMode:playMode }>()
)
export const  setCurrentIndex = createAction(
    '[player] set currentIndex',
    props<{currentIndex:number}>()
)


/* export const increment = createAction('[Counter Component] Increment');
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset'); */