import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList/TodoList";
import {v1} from "uuid";
import {TaskType} from "./components/Task/Task";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";

export type FilteredTasks = 'all' | 'active' | 'completed'

type TodoList = {
    id: string
    title: string
    filter: FilteredTasks
}

const initialTodoListsState: TodoList[] = []

function App() {
    const [todoLists, setTodoLists] = useState(initialTodoListsState)
    const [tasksObj, setTasksObj] = useState<Record<string, TaskType[]>>({
    })

    function removeTask(id: string, todoListId: string) {
        if (todoListId in tasksObj) {
            let tasks = tasksObj[todoListId]
            tasksObj[todoListId] = tasks.filter(t => t.id != id)
            setTasksObj({...tasksObj})
        }
    }

    function removeTodoList(todoListId: string) {
        const filteredTodoList = todoLists.filter(tl => tl.id != todoListId)
        setTodoLists(filteredTodoList)
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

    function addTodoList(title: string) {
        const todoList: TodoList = {
            id: v1(),
            title: title,
            filter: 'all'
        }
        setTodoLists([todoList, ...todoLists])
        setTasksObj({...tasksObj, [todoList.id] : []})
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {
                todoLists.map((tl) => {
                    console.log(tl.title)
                    let taskForTodoLists = tasksObj[tl.id]
                    if (tl.filter === 'active') {
                        taskForTodoLists = taskForTodoLists.filter(t => t.isDone === false)
                    }
                    if (tl.filter === 'completed') {
                        taskForTodoLists = taskForTodoLists.filter(t => t.isDone === true)
                    }
                    return <TodoList key={tl.id} id={tl.id} title={tl.title} tasks={taskForTodoLists}
                                     removeTask={removeTask}
                                     addTask={addTask} changeFilter={changeFilter} changeStatus={changeStatus}
                                     filter={tl.filter} removeTodoList={removeTodoList}/>
                })
            }
        </div>
    );
}

export default App;
