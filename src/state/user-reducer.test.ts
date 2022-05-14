import {userReducer} from "./user-reducer";


test('user reducer should increment only age', () => {
    const startState = {age: 20, childrenCount: 4, name: 'Maximilian'}
    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(4)
})

test('user reducer should increment only childrenCount', () => {
    const startState = {age: 23, childrenCount: 5, name: 'Alison'}
    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState.age).toBe(23)
    expect(endState.childrenCount).toBe(6)
})

test('user reducer should change name of user', () => {
    const startState = {name: 'Mickas', age: 21, childrenCount: 1};
    const newName = 'Alex';
    const endState = userReducer(startState, {type: 'CHANGE-USER-NAME', newName: newName})

    expect(endState.name).toBe(newName)
})