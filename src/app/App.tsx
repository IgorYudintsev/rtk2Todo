import {useEffect, useState} from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {todolistsApi} from "../features/todolists/api/todolistsApi.ts";
import {useAppDispatch} from "../common/hooks/useAppDispatch.ts";
import {createTodolist, getTodolists} from "../features/todolists/model/todolists-reducer.ts";
import {useAppSelector} from "../common/hooks/useAppSelector.ts";
import {selectTodos} from "../features/todolists/model/todolists-selectors.ts";
import {Todolists} from "../features/todolists/ui/todolists/Todolists.tsx";
import s from './../features/todolists/ui/todolists/todolist.module.css'

function App() {
    const dispatch = useAppDispatch()

    const todos = useAppSelector(selectTodos)

    useEffect(() => {
        dispatch(getTodolists())
        // todolistsApi.getTodolists().then(res=>console.log(res.data))
    }, []);

    const createTodolistHandler = () => {
        const createdDate = new Date().toISOString();
        dispatch(createTodolist({title: `newTodo - ${createdDate}`}))
    }




    return (
        <div className={s.todolistsContainer}>
            <button onClick={createTodolistHandler}>CREATE NEW TODOLIST</button>
            <table className={s.todolistsTable}>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Filter</th>
                    <th>Order</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {todos.map(todo => (
                    <Todolists
                        key={todo.id}
                        {...todo}
                    />
                ))}
                </tbody>
            </table>
        </div>

    )
}

export default App
