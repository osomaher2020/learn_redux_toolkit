const redux = require('redux')

////// Run: node cake_store //////

// 1- State
const initialState = {
    numOfCakes: 10,
    anotherProperty: 'blabla'
}

// actions_Types
const ORDER_CAKE = 'ORDER_CAKE'

// 2- Action on cakes --> always returns:--> Object
const orderCake = () => {
    return {
        type: ORDER_CAKE,
        quantity: 1
    }
}

// 3- Reducer --> (oldState, action) => newState
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_CAKE:
            return {
                ...state, // to keep other properties as it is
                numOfCakes: state.numOfCakes - 1
            }
        default:
            return state // noChange on initialState
    }
}



const store = redux.createStore(reducer) // <<<<<<<< Accepts (reducer) which is responsible for --> state update
console.log("initial_state", store.getState())

// store.subscribe() runs on every state change
const unsubscribe = store.subscribe(() => console.log("updated_state", store.getState()))

// dispatching Action
store.dispatch(orderCake())
// unsubscribe() // <<<<<<<<<<<<<<<< try to uncomment
store.dispatch(orderCake())
store.dispatch(orderCake())

// stop monitoring the state change
unsubscribe()