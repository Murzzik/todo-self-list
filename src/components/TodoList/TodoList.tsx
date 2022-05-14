import React from 'react';
import {Task, TaskType} from "../Task/Task";
import s from './TodoList.module.css'
import {v1} from "uuid";
import {FilteredTasks} from "../../App";
import {EditableSpan} from "../EditableSpan/EditableSpan";

type TodoListType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (id: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    removeTodoList: (id: string) => void
    changeFilter: (value: FilteredTasks, todoListId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todoListsId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
    filter: FilteredTasks
}


export const TodoList = (props: TodoListType) => {

    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    return (
        <div className={s.todoContainer}>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodoListTitle}/>
                <button onClick={removeTodoList}>x</button>
            </h3>
            <Task key={v1()} id={props.id} tasks={props.tasks} removeTask={props.removeTask}
                  addTask={props.addTask} changeFilter={props.changeFilter} changeStatus={props.changeStatus}
                  filter={props.filter} changeTaskTitle={props.changeTaskTitle}
            />
        </div>
    );
};

