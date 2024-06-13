
import { Action, createReducer, on } from "@ngrx/store"
import { setCurrentIndex, setPlayList, setPlayMode, setPlaying, setSongList } from "../actions/player.action"
import { MusicInformation } from "@/app/interface/type.interface";

export const playerFeatureKey = "player";
export type playerState = {
    isPlaying:boolean,
    playMode:playMode,
    songList:MusicInformation[] ,
    playingList:MusicInformation[],
    currentIndex:number
}
export type playMode = {
    type:'loop' | 'random' | 'singleLoop',
    label: '循环' | '随机' | '单曲循环'
}

export const initialState: playerState = {
    isPlaying:false,
    playMode:{type:'loop',label:'循环'},
    songList:[],
    playingList:[],
    currentIndex:-1
}
export const playerReducer = createReducer(
    initialState,
    on(setPlaying,(state,{ isPlaying })=> ({...state,isPlaying})),
    on(setPlayList,(state,{ playingList })=> ({...state,playingList})),
    on(setSongList,(state,{ songList })=> ({...state,songList})),
    on(setPlayMode,(state,{ playMode})=> ({...state,playMode})),
    on(setCurrentIndex,(state,{ currentIndex })=> ({...state,currentIndex}))
);


