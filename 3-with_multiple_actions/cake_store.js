const redux = require('redux')

////// Run: node cake_store //////

// 1- State
const initialState = {
    numOfCakes: 10,
    anotherProperty: 'blabla',
    details: { // <<<<<<<<<<<<<<< Object property
        size: 15,
        topping: '',
        sugar: 0
    }
}

// -- actions_Types --
const ORDER_CAKE = 'ORDER_CAKE'
const RESTOCK_CAKE = 'RESTOCK_CAKE'
const DETAILED_ORDER = 'DETAILED_ORDER'

// 2- Action on cakes --> always returns:--> Object
const orderCake = () => {
    return {
        type: ORDER_CAKE,
        quantity: 1
    }
}
// Action 2 <<<<<<<<<<<<<<<<<<<<<<
const reStockCake = (qty) => {
    return {
        type: RESTOCK_CAKE,
        quantity: qty
    }
}
// Action 3 -- orderWithDetails <<<<<<<<<<<<<<<<
const detailedOrderCake = (qty, orderDetails) => {
    return {
        type: DETAILED_ORDER,
        quantity: qty,
        details: orderDetails
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
        case RESTOCK_CAKE:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.quantity // <<<<<<<<<<<<< dynamically used action.property
            }
        case DETAILED_ORDER: // <<<<<<<<<<<<<<<<<<<<<
            return {
                ...state,
                numOfCakes: state.numOfCakes - action.quantity,
                details: action.details // <<<<<<< Object property
            }
        default:
            return state // noChange on initialState
    }
}


// init REDUX
const store = redux.createStore(reducer) // Accepts (reducer) which is responsible for --> state update
console.log("initial_state", store.getState())

// store.subscribe() runs on every state change
const unsubscribe = store.subscribe(() => console.log("updated_state", store.getState()))

// dispatching Action
store.dispatch(orderCake())
// unsubscribe() // try to uncomment
store.dispatch(orderCake())
store.dispatch(orderCake())


// dispatching RESTOCK_CAKE <<<<<<<<<<<<<<<<<<<<<< Action 2
store.dispatch(reStockCake(3)) // it will go back to --> quantity: 10


// dispatching Action 3
store.dispatch(detailedOrderCake(2, {
    size: 20,
    topping: 'Strawberry',
    sugar: 40
}))
store.dispatch(detailedOrderCake(2, {
    size: 22,
    topping: 'Chocolate',
    sugar: 44
}))

// stop monitoring the state change
unsubscribe()