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

// store.subscribe() runs on every state change -- [you can perform any code needed on every state change]
const unsubscribe = store.subscribe(() => {
    // log the new state
    console.log("updated_state", store.getState())

    // some other func stuff
    const x = 5
    const y = 6
    console.log("stuff: x+y="+ (x+y))
})

// dispatching Action
store.dispatch(orderCake())
//unsubscribe() // <<<<<<<<<<<<<<<< try to uncomment <<<<<< it stops the subscribed function() -- which run every change
store.dispatch(orderCake())
store.dispatch(orderCake())

// stop monitoring the state change
unsubscribe()