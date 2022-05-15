import {v1} from "uuid";
import {FilteredTasks, TodoList} from "../App";
import {AddTodoAC, ChangeTodoFilterAC, ChangeTodoTitleAC, RemoveTodoAC, todolistsReducer} from "./todolists-reducer";

test('correct todolist should be removed', () => {
    const todoListTestId = v1()
    const startState: TodoList[] = [
        {id: todoListTestId, title: 'What to do', filter: 'all'}
    ]
    const endState = todolistsReducer(startState, RemoveTodoAC(todoListTestId))

    expect(endState.length).toBe(0)
})

test('new todolist should be added', () => {
    const todoListTestId = v1()
    const newTodolistTitle = 'New Todolist'
    const startState: TodoList[] = [
        {id: todoListTestId, title: 'What to do', filter: 'all'}
    ]
    const endState = todolistsReducer(startState, AddTodoAC(newTodolistTitle))

    expect(endState.length).toBe(2)
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {
    const todoListTestId = v1()
    const newTodolistTitle = 'New Todolist'
    const startState: TodoList[] = [
        {id: todoListTestId, title: 'What to do', filter: 'all'}]
    const endState = todolistsReducer(startState, ChangeTodoTitleAC(todoListTestId, newTodolistTitle));

    expect(endState[0].title).toBe(newTodolistTitle)
})

test('correct filter of todolist shoul d be changed', () => {
    const todoListTestId = v1()
    const newFilter: FilteredTasks = 'completed'
    const startState: TodoList[] = [
        {id: todoListTestId, title: 'What to do', filter: 'all'}
    ]
    const endState = todolistsReducer(startState, ChangeTodoFilterAC(todoListTestId, newFilter));

    expect(endState[0].filter).toBe(newFilter)
})