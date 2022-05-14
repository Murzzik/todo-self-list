import {v1} from "uuid";
import {FilteredTasks, TodoList} from "../App";
import {todolistsReducer} from "./todolists-reducer";

test('correct todolist should be removed', () => {
    const todoListTestId = v1()
    const startState: TodoList[] = [
        {id: todoListTestId, title: 'What to do', filter: 'all'}
    ]
    const endState = todolistsReducer(startState, {type: 'REMOVE-TODOLIST', id: todoListTestId})

    expect(endState.length).toBe(0)
})

test('new todolist should be added', () => {
    const todoListTestId = v1()
    const newTodolistTitle = 'New Todolist'
    const startState: TodoList[] = [
        {id: todoListTestId, title: 'What to do', filter: 'all'}
    ]
    const endState = todolistsReducer(startState, {type: 'ADD-TODOLIST', title: newTodolistTitle})

    expect(endState.length).toBe(2)
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {
    const todoListTestId = v1()
    const newTodolistTitle = 'New Todolist'
    const startState: TodoList[] = [
        {id: todoListTestId, title: 'What to do', filter: 'all'}]
    const action = {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        id: todoListTestId,
        title: newTodolistTitle
    }
    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    const todoListTestId = v1()
    const newFilter: FilteredTasks = 'completed'
    const startState: TodoList[] = [
        {id: todoListTestId, title: 'What to do', filter: 'all'}
    ]
    const action = {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        id: todoListTestId,
        filter: newFilter
    }
    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe(newFilter)
})