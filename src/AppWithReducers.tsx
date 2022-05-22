import React, {useReducer} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList/TodoList";
import {v1} from "uuid";
import {TaskType} from "./components/Task/Task";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import 'antd/dist/antd.css'
import {
    addTodoAC,
    changeTodoFilterAC,
    changeTodoTitleAC,
    removeTodoAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilteredTasks = 'all' | 'active' | 'completed'

export interface TodoList {
    id: string
    title: string
    filter: FilteredTasks
}

export interface TaskState {
    [todoListTestId: string]: TaskType[]
}

const todoListTestId = v1()

const initialTodoListsState: TodoList[] = [
    {id: todoListTestId, title: 'What to do', filter: "all"}
]

function AppWithReducers() {
    const [todoLists, dispatchToTodoReducer] = useReducer(todolistsReducer, initialTodoListsState)
    const [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todoListTestId]: [{id: v1(), title: 'What to test', isDone: true}]
    })

    function removeTask(id: string, todoListId: string) {
        dispatchToTasksReducer(removeTaskAC(todoListId, id))
    }

    function addTask(title: string, todoListId: string) {
        dispatchToTasksReducer(addTaskAC(todoListId, title))
    }

    function changeFilter(value: FilteredTasks, todoListId: string) {
        dispatchToTodoReducer(changeTodoFilterAC(todoListId, value))
    }

    function changeStatus(taskId: string, isDone: boolean, todoListsId: string) {
        dispatchToTasksReducer(changeTaskStatusAC(todoListsId, taskId, isDone))
    }

    function changeTaskTitle(id: string, newTitle: string, todoListsId: string) {
        dispatchToTasksReducer(changeTaskTitleAC(todoListsId, id, newTitle))
    }

    function removeTodoList(todoListId: string) {
        dispatchToTasksReducer(removeTodoAC(todoListId))
        dispatchToTodoReducer(removeTodoAC(todoListId))
    }

    function changeTodoListTitle(id: string, newTitle: string) {
        dispatchToTodoReducer(changeTodoTitleAC(id, newTitle))
    }

    function addTodoList(title: string) {
        debugger
        const action = addTodoAC(title)
        dispatchToTasksReducer(action)
        dispatchToTodoReducer(action)
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {
                todoLists.map((tl) => {
                    console.log(tl.title)
                    let taskForTodoLists = tasksObj[tl.id]
                    if (tl.filter === 'active') {
                        taskForTodoLists = taskForTodoLists.filter(t => !t.isDone)
                    }
                    if (tl.filter === 'completed') {
                        taskForTodoLists = taskForTodoLists.filter(t => t.isDone)
                    }
                    return <TodoList key={tl.id} id={tl.id} title={tl.title} tasks={taskForTodoLists}
                                     removeTask={removeTask}
                                     addTask={addTask} removeTodoList={removeTodoList}
                                     changeFilter={changeFilter}
                                     changeStatus={changeStatus}
                                     filter={tl.filter} changeTaskTitle={changeTaskTitle}
                                     changeTodoListTitle={changeTodoListTitle}/>
                })
            }
        </div>
    );
}

export default AppWithReducers;
