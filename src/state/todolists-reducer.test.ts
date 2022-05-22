import {v1} from "uuid";
import {FilteredTasks, TodoList} from "../App";
import {addTodoAC, changeTodoFilterAC, changeTodoTitleAC, removeTodoAC, todolistsReducer} from "./todolists-reducer";

test('correct todolist should be removed', () => {
    const todoListTestId = v1()
    const startState: TodoList[] = [
        {id: todoListTestId, title: 'What to do', filter: 'all'}
    ]
    const action = removeTodoAC(todoListTestId)
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(0)
})

test('new todolist should be added', () => {
    const todoListTestId = v1()
    const newTodolistTitle = 'New Todolist'
    const startState: TodoList[] = [
        {id: todoListTestId, title: 'What to do', filter: 'all'}
    ]
    const action = addTodoAC(newTodolistTitle)
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(2)
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {
    const todoListTestId = v1()
    const newTodolistTitle = 'New Todolist'
    const startState: TodoList[] = [
        {id: todoListTestId, title: 'What to do', filter: 'all'}]
    const action = changeTodoTitleAC(todoListTestId, newTodolistTitle)
    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe(newTodolistTitle)
})

test('correct filter of todolist shoul d be changed', () => {
    const todoListTestId = v1()
    const newFilter: FilteredTasks = 'completed'
    const startState: TodoList[] = [
        {id: todoListTestId, title: 'What to do', filter: 'all'}
    ]
    const action = changeTodoFilterAC(todoListTestId, newFilter)
    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe(newFilter)
})