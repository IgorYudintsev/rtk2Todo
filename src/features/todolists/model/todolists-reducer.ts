import {TodolistType} from "../api/todolistsApi.types.ts";
import {asyncThunkCreator, buildCreateSlice, PayloadAction} from "@reduxjs/toolkit";
import {todolistsApi} from "../api/todolistsApi.ts";

export type InitialType = TodolistType & {
    filter: string
}
type ErrorType = {
    message: string;
};

const initialState: InitialType[] = [
    // {id: 'todolistID1', title: 'What to learn', filter: 'all'},
    // {id: 'todolistID2', title: 'What to buy', filter: 'all'},
]

const createTodolistsSlice = buildCreateSlice({creators: {asyncThunk: asyncThunkCreator}})

const slice = createTodolistsSlice({
    name: 'todolists',
    initialState,
    reducers: (creators) => ({
        getTodolists: creators.asyncThunk<{ todos: TodolistType[] }, void, {
            rejectValue: ErrorType
        }>(async (arg, thunkAPI) => {
                const {dispatch, rejectWithValue} = thunkAPI
                try {
                    const result = await todolistsApi.getTodolists()
                    return {todos: result.data}
                } catch (error: ErrorType) {
                    return thunkAPI.rejectWithValue({message: error.message})
                }
            }, {
                fulfilled: (state, action: PayloadAction<{ todos: TodolistType[] }>) => {
                    return action.payload.todos.map(el => ({...el, filter: 'all'}))
                }
            }
        ),

        createTodolist: creators.asyncThunk<{ todos: TodolistType }, { title: string }, {
            rejectValue: ErrorType
        }>(async (arg: {
            title: string
        }, thunkAPI) => {
            const {dispatch, rejectWithValue} = thunkAPI
            try {
                const result = await todolistsApi.createTodolist(arg.title)
                return {todos: result.data.data.item}
            } catch (error: ErrorType) {
                return thunkAPI.rejectWithValue({message: error.message})
            }
        }, {
            fulfilled: (state, action: PayloadAction<{ todos: TodolistType }>) => {
                return [{...action.payload.todos, filter: 'all'}, ...state]

            }
        }),

        deleteTodolist: creators.asyncThunk<{id:string}, {id:string}, any>(async (arg:{id:string}, thunkAPI) => {
            const {dispatch, rejectWithValue} = thunkAPI
            try{
                const result = await todolistsApi.deleteTodolist(arg.id)
                return {id:arg.id}
            }catch (error: ErrorType) {
                return thunkAPI.rejectWithValue({message: error.message})
            }
        }, {
            fulfilled: (state:TodolistType[], action: PayloadAction<{id:string}>) => {
                return state.filter(el=>el.id!==action.payload.id)

            }
        }),
        exampleWithoutThunk: creators.reducer((state, action: PayloadAction<{ id: string }>) => {
            // const index = state.findIndex((posts) => posts.id === action.payload.id);
            // if (index !== -1) state.splice(index, 1);
        }),
    })
})

export const todolistsReducer = slice.reducer
export const {getTodolists, createTodolist,deleteTodolist} = slice.actions