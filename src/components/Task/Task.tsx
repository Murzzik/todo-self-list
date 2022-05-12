import React, {ChangeEvent} from 'react';
import s from './Task.module.css'
import {v1} from "uuid";
import {FilteredTasks} from "../../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id: string
    tasks: TaskType[]
    removeTask: (id: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeFilter: (value: FilteredTasks, todoListId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: FilteredTasks
}

export const Task = (props: PropsType) => {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div className={s.taskContainer}>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(t => {

                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(t.id, e.currentTarget.checked, props.id)

                        return <li key={v1()}><input type="checkbox" onChange={onChangeHandler}
                                                     checked={t.isDone}/>
                            <EditableSpan title={t.title} onChange={(value) => {alert(value)}}/>
                            <button onClick={() => props.removeTask(t.id, props.id)}>x</button>
                        </li>
                    })}
            </ul>
            <div>
                <button className = {props.filter === 'all' ? s.activeFilter : ''} onClick={() => props.changeFilter('all', props.id)}>All</button>
                <button className = {props.filter === 'active' ? s.activeFilter : ''} onClick={() => props.changeFilter('active', props.id)}>Active</button>
                <button className = {props.filter === 'completed' ? s.activeFilter : ''} onClick={() => props.changeFilter('completed', props.id)}>Completed</button>
            </div>
        </div>
    );
};
