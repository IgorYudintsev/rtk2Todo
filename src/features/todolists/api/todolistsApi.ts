import axios from "axios";
import {instance} from "../../../common/instance/instance.ts";
import {BaseResponse, TodolistType} from "./todolistsApi.types.ts";

export const todolistsApi={
    getTodolists(){
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<BaseResponse<{ item: TodolistType }>>("todo-lists", { title })
    },
    deleteTodolist(id: string) {
        return instance.delete<BaseResponse>(`todo-lists/${id}`)
    },
}



