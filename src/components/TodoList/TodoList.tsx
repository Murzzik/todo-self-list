import React from 'react';
import {Task, TaskType} from "../Task/Task";
import s from './TodoList.module.css'
import {v1} from "uuid";
import {FilteredTasks} from "../../App";

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
            <h3>{props.title}</h3>
            <Task key={v1()} id={props.id} tasks={props.tasks} removeTask={props.removeTask}
                  addTask={props.addTask} changeFilter={props.changeFilter} changeStatus={props.changeStatus} filter={props.filter}/>
        </div>
    );
};

