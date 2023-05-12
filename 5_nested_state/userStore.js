const redux = require('redux')


// 1- State
const initialState = {
    name: 'osama',
    address: {
        street: 10,
        city: 'Palm Hills'
    }
}

// 2- Actions
// >> types
const CHANGE_STREET = 'CHANGE_STREET'
// >> Action Creators
const changeStreet = (newStreet) => ({
    type: CHANGE_STREET,
    payload: newStreet
})

// 3- Reducers
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_STREET:
            return {
                ...state,
                address: {
                    ...state.address, // <<<<<<<<<< keeping the other "address" details
                    street: action.payload
                }
            }
        default: {
            return state
        }
    }
}

const store = redux.createStore(reducer)
store.subscribe(() => console.log(store.getState()))
console.log("initState", store.getState())
store.dispatch(changeStreet('btata'))