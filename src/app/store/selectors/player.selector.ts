import { createFeatureSelector, createSelector } from "@ngrx/store";
import { playerState } from "../reducers/player.reducer"

//export const selectPlayerState = (state:playerState) => state;
export const selectPlayerState = createFeatureSelector<playerState>('player')

export const getPlaying = createSelector(
    selectPlayerState,
    (state:playerState) => state.isPlaying!
);
export const getPlayList = createSelector(
    selectPlayerState,
    (state:playerState) => state.playingList
);
export const getSongList = createSelector(
    selectPlayerState,
    (state:playerState) => state.songList!
);
export const getPlayMode= createSelector(
    selectPlayerState,
    (state:playerState) => state.playMode
);
export const getCurrentIndex = createSelector(
    selectPlayerState,
    (state:playerState) => state.currentIndex
);
export const getRawSong = createSelector(
    selectPlayerState,
    ({playingList,currentIndex}:playerState) => playingList[currentIndex]
);