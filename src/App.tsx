import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList/TodoList";
import {v1} from "uuid";

export type FilteredTasks = 'all' | 'active' | 'completed'

type TodoLists = {
    id: string
    title: string
    filter: FilteredTasks
}

const todoListId_1 = v1();
const todoListId_2 = v1();

const initialTodoListsState: TodoLists[] = [
    {id: todoListId_1, title: 'Movies', filter: 'active'},
    {id: todoListId_2, title: 'What to do', filter: 'completed'}
]

function App() {
    const [todoLists, setTodoLists] = useState(initialTodoListsState)
    const [tasksObj, setTasksObj] = useState({
            [todoListId_1]: [
                {id: v1(), title: 'HTML/CSS', isDone: true},
                {id: v1(), title: 'React', isDone: false},
                {id: v1(), title: 'JS', isDone: true}
            ],
            [todoListId_2]: [
                {id: v1(), title: 'HTML/CSS', isDone: true},
                {id: v1(), title: 'React', isDone: false},
                {id: v1(), title: 'JS', isDone: true}
            ]
        }
    )

    function removeTask(id: string, todoListId: string) {
        let tasks = tasksObj[todoListId]
        tasksObj[todoListId] = tasks.filter(t => t.id != id)
        setTasksObj({...tasksObj})
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

    return (
        <div className="App">
            {
                todoLists.map((tl) => {
                    console.log(tasksObj)
                    console.log(tl.id);
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
                                     filter={tl.filter}/>
                })
            }
        </div>
    );
}

export default App;
