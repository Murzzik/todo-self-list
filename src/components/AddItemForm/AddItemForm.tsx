import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemForm = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemForm) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.length)
            setError(false)
        setTitle(e.currentTarget.value)
    }

    const onClickHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle.length) {
            props.addItem(trimmedTitle)
            setTitle('')
            setError(false)
        } else {
            setError(true)
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        const trimmedTitle = title.trim()
        if (e.key === 'Enter' && trimmedTitle.length) {
            props.addItem(trimmedTitle)
            setError(false)
            setTitle('')
        } else {
            setError(true)
        }

    }

    return (
        <div>
            <input value={title} onChange={onChangeHandler} onKeyDown={onKeyPressHandler} type="text"/>
            <button onClick={onClickHandler}>+</button>
            {error && <div>Title is required</div>}
        </div>
    );
};

