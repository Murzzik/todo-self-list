<<<<<<< HEAD
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from './Task.module.css'
import {v1} from "uuid";
import {FilteredTasks} from "../../App";
=======
import React, {ChangeEvent} from 'react';
import s from './Task.module.css'
import {v1} from "uuid";
import {FilteredTasks} from "../../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
>>>>>>> 1faf918 (new functions added)

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

<<<<<<< HEAD
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.length)
        setError(false)
        setTaskTitle(e.currentTarget.value)
    }

    const onClickHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle.length) {
            props.addTask(trimmedTitle, props.id)
            setTaskTitle('')
            setError(false)
        } else {
            setError(true)
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.addTask(taskTitle, props.id)
        }
=======
    const addTask = (title: string) => {
        props.addTask(title, props.id)
>>>>>>> 1faf918 (new functions added)
    }

    return (
        <div className={s.taskContainer}>
<<<<<<< HEAD
            <div>
                <input value={taskTitle} onChange={onChangeHandler} onKeyPress={onKeyPressHandler} type="text"/>
                <button onClick={onClickHandler}>+</button>
            </div>
            {error && <div>Title is required</div>}
=======
            <AddItemForm addItem={addTask}/>
>>>>>>> 1faf918 (new functions added)
            <ul>
                {
                    props.tasks.map(t => {

                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(t.id, e.currentTarget.checked, props.id)

                        return <li key={v1()}><input type="checkbox" onChange={onChangeHandler}
<<<<<<< HEAD
                                                     checked={t.isDone}/><span>{t.title}</span>
=======
                                                     checked={t.isDone}/>
                            <EditableSpan title={t.title} onChange={(value) => {alert(value)}}/>
>>>>>>> 1faf918 (new functions added)
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