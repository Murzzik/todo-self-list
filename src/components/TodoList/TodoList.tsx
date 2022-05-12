import React from 'react';
import {Task, TaskType} from "../Task/Task";
import s from './TodoList.module.css'
import {v1} from "uuid";
import {FilteredTasks} from "../../App";
<<<<<<< HEAD
=======
import {EditableSpan} from "../EditableSpan/EditableSpan";
>>>>>>> 1faf918 (new functions added)

type TodoListType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (id: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeFilter: (value: FilteredTasks, todoListId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: FilteredTasks
}

export const TodoList = (props: TodoListType) => {
    return (
        <div className={s.todoContainer}>
<<<<<<< HEAD
            <h3>{props.title}</h3>
=======
            <EditableSpan title={props.title} onChange={(value) => {alert(value)}}/>
>>>>>>> 1faf918 (new functions added)
            <Task key={v1()} id={props.id} tasks={props.tasks} removeTask={props.removeTask}
                  addTask={props.addTask} changeFilter={props.changeFilter} changeStatus={props.changeStatus} filter={props.filter}/>
        </div>
    );
};

