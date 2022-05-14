import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList/TodoList";
import {v1} from "uuid";
import {TaskType} from "./components/Task/Task";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import 'antd/dist/antd.css'

export type FilteredTasks = 'all' | 'active' | 'completed'

interface TodoList {
    id: string
    title: string
    filter: FilteredTasks
}

const todoListTestId = v1()

const initialTodoListsState: TodoList[] = [
    {id: todoListTestId, title: 'What to do', filter: "all"}
]

function App() {
    const [todoLists, setTodoLists] = useState(initialTodoListsState)
    const [tasksObj, setTasksObj] = useState<Record<string, TaskType[]>>({
        [todoListTestId]: [{id: v1(), title: 'What to test', isDone: true}]
    })

    function removeTask(id: string, todoListId: string) {
        if (todoListId in tasksObj) {
            let tasks = tasksObj[todoListId]
            tasksObj[todoListId] = tasks.filter(t => t.id !== id)
            setTasksObj({...tasksObj})
        }
    }

    function addTask(title: string, todoListId: string) {
        const task = {id: v1(), title: title, isDone: false}
        const tasks = tasksObj[todoListId]
        tasksObj[todoListId] = [task, ...tasks]
        setTasksObj({...tasksObj})
    }

    function changeFilter(value: FilteredTasks, todoListId: string) {
        const todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists])
        }
    }

    function changeStatus(taskId: string, isDone: boolean, todoListsId: string) {
        const tasks = tasksObj[todoListsId]
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }
    }

    function changeTaskTitle(id: string, newTitle: string, todoListsId: string) {
        const todolistsTasks = tasksObj[todoListsId]
        const task = todolistsTasks.find(t => t.id === id)
        if (task) {
            task.title = newTitle
        }
        setTasksObj({...tasksObj})
    }

    function removeTodoList(todoListId: string) {
        const newTodoLists = todoLists.filter(tl => tl.id !== todoListId)
        setTodoLists(newTodoLists)
    }

    function changeTodoListTitle(id: string, newTitle: string) {
        const todoList = todoLists.find(tl => tl.id === id)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    function addTodoList(title: string) {
        const todoList: TodoList = {
            id: v1(),
            title: title,
            filter: 'all'
        }
        setTodoLists([todoList, ...todoLists])
        setTasksObj({...tasksObj, [todoList.id]: []})
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

export default App;
