import React, {ChangeEvent, useState} from 'react';

type EditableSpan = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = (props: EditableSpan) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(props.title)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title);
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    return editMode
        ? <input value={title} onChange={onChangeHandler} onBlur={activateViewMode} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{title}</span>;
};
