const redux = require('redux')
const reduxLogger = require('redux-logger')

// MiddleWare
// 1- happens between: dispatching an Action & its Reducer
// 2- used for: Async tasks & logging
// [yarn add redux-logger]
const logger = reduxLogger.createLogger() // <<<<<<<<<< middleware showing (prev_state, action, next_state)


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

const store = redux.createStore(reducer, redux.applyMiddleware(logger))
// store.subscribe(() => console.log(store.getState())) // <<<<<<<<<<<<< we used "logger" instead
console.log("initState", store.getState())

// dispatch an action ==> Notice: logger Middleware happening
store.dispatch(changeStreet('btata'))
// one more time time :)
store.dispatch(changeStreet('yesooooo'))