import {FilteredTasks, TodoList} from "../App";
import {v1} from "uuid";

export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodoListAT = {
    type: 'ADD-TODOLIST',
    title: string,
    todolistId: string
}
export type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilteredTasks
}
type ActionsType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todolistsReducer = (state: TodoList[], action: ActionsType): TodoList[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
            }
            return [
                ...state
            ]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.filter;
            }
            return [
                ...state
            ]
        }
        default:
            {
                throw new Error('Oops, something goes wrong')
            }
        }
    }

export const removeTodoAC = (todolistId: string): RemoveTodoListAT => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodoAC = (title: string): AddTodoListAT => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()}
}
export const changeTodoTitleAC = (todolistId: string, title: string): ChangeTodoListTitleAT => {
    return {type: "CHANGE-TODOLIST-TITLE", id: todolistId, title}
}
export const changeTodoFilterAC = (todolistId: string, filter: FilteredTasks): ChangeTodoListFilterAT => {
    return {type: "CHANGE-TODOLIST-FILTER", id: todolistId, filter}
}