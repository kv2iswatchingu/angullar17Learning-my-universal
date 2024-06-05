import { MusicInfo } from "@/app/interface/main-interface.interface"
import { Action, createReducer, on } from "@ngrx/store"
import { setCurrentIndex, setPlayList, setPlayMode, setPlaying, setSongList } from "../actions/player.action"

export const playerFeatureKey = "player";
export type playerState = {
    isPlaying:boolean,
    playMode:playMode,
    songList:MusicInfo[] ,
    playingList:MusicInfo[],
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


/*
import { increment, decrement, reset } from '../actions/player.action';

 export const initialState2 = 0; 

/* export const counterReducer = createReducer(
  initialState2,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1),
  on(reset, (state) => 0)
);
 */
