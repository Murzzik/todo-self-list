import React, {ChangeEvent} from 'react';
import s from './Task.module.css'
import {v1} from "uuid";
import {FilteredTasks} from "../../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, Checkbox} from "antd";
import {CheckboxChangeEvent} from "antd/es/checkbox";

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
    changeTaskTitle: (id: string, newTitle: string, todoListsId: string) => void
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
                        console.log(t.title)
                        const onChangeHandler = (e: CheckboxChangeEvent) => props.changeStatus(t.id, e.target.checked, props.id)
                        const onChangeTitleHandler = (newValue: string) => props.changeTaskTitle(t.id, newValue, props.id)

                        return <li key={v1()}><Checkbox type="checkbox" onChange={onChangeHandler}
                                                     checked={t.isDone}/>
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                            <Button size='small' onClick={() => props.removeTask(t.id, props.id)}>x</Button>
                        </li>
                    })}
            </ul>
            <div>
                <Button className = {props.filter === 'all' ? s.activeFilter : ''} onClick={() => props.changeFilter('all', props.id)}>All</Button>
                <Button className = {props.filter === 'active' ? s.activeFilter : ''} onClick={() => props.changeFilter('active', props.id)}>Active</Button>
                <Button className = {props.filter === 'completed' ? s.activeFilter : ''} onClick={() => props.changeFilter('completed', props.id)}>Completed</Button>
            </div>
        </div>
    );
};
