import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {todolistsReducer} from "../../features/todolists/model/todolists-reducer.ts";

const rootReducer=combineReducers({
    todos:todolistsReducer,
})

export const store=configureStore({
    reducer:rootReducer
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch