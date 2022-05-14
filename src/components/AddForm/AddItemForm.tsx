import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


const AddItemForm = () => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {

        }
    }
    const onClickHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle.length) {
            setTitle('')
            setError(false)
        } else {
            setError(true)
        }
    }

    return (
        <div>
            <div>
                <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler} type="text"/>
                <button onClick={onClickHandler}>+</button>
            </div>
            {error && <div>Title is required</div>}
        </div>
    );
};

export default AddItemForm;