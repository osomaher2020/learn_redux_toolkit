const redux = require('redux')


// =================== Cake ===============
// 1- State
const initialCakeState = {
    numOfCakes: 10
}

// ----------------- actions_Types -------------
const ORDER_CAKE = 'ORDER_CAKE'
const RESTOCK_CAKE = 'RESTOCK_CAKE'

// 2- Actions on cakes --> always returns:--> Object
const orderCake = () => {
    return {
        type: ORDER_CAKE,
        quantity: 1
    }
}

const reStockCake = (qty) => {
    return {
        type: RESTOCK_CAKE,
        quantity: qty
    }
}


// 3- Reducer --> (oldState, action) => newState
const cakeReducer = (state = initialCakeState, action) => {
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
        default:
            return state // noChange on initialState
    }
}



// init REDUX
const cakeStore = redux.createStore(cakeReducer) // Accepts (reducer) which is responsible for --> state update
console.log("initial_state", cakeStore.getState())

// store.subscribe() runs on every state change
const unsubscribeCake = cakeStore.subscribe(() => console.log("updated_state", cakeStore.getState()))

// dispatching Action
cakeStore.dispatch(orderCake())
// unsubscribe() // try to uncomment
cakeStore.dispatch(orderCake())
cakeStore.dispatch(orderCake())


// dispatching RESTOCK_CAKE <<<<<<<<<<<<<<<<<<<<<< Action 2
cakeStore.dispatch(reStockCake(3)) // it will go back to --> quantity: 10

// stop monitoring the state change
unsubscribeCake()
// ========================================




// =================== IceCream ===============
// 1- State
const initialIceCreamState = {
    numOfIceCreams: 10
}

// ----------------- actions_Types -------------
const ORDER_ICECREAM = 'ORDER_ICECREAM'
const RESTOCK_ICECREAM = 'RESTOCK_ICECREAM'

// 2- Actions on cakes --> always returns:--> Object
const orderIceCream = (qty = 1) => {
    return {
        type: ORDER_ICECREAM,
        payload: qty
    }
}
// Action 2 <<<<<<<<<<<<<<<<<<<<<<
const reStockIcecream = (qty = 1) => {
    return {
        type: RESTOCK_ICECREAM,
        payload: qty
    }
}


// 3- Reducer --> (oldState, action) => newState
const icecreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case ORDER_ICECREAM:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - action.payload
            }
        case RESTOCK_ICECREAM:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams + action.payload
            }
        default:
            return state
    }
}


// init REDUX
const icecreamStore = redux.createStore(icecreamReducer)
console.log("initial_icecream_state", icecreamStore.getState())

// store.subscribe() runs on every state change [dispatch]
const unsubscribeIcecream = icecreamStore.subscribe(() => console.log("updated_icecream_state", icecreamStore.getState()))

// dispatching Action
icecreamStore.dispatch(orderIceCream())
// unsubscribe() // try to uncomment
icecreamStore.dispatch(orderIceCream())
icecreamStore.dispatch(orderIceCream())


// dispatching RESTOCK_CAKE <<<<<<<<<<<<<<<<<<<<<< Action 2
icecreamStore.dispatch(reStockIcecream(3)) // it will go back to --> quantity: 10

// stop monitoring the state change
unsubscribeIcecream()
// ========================================





// >>>>>>>>>>>>>>>>>>>>> Combining Reducers <<<<<<<<<<<<<<<<<<<<<<<<<
const rootReducer = redux.combineReducers({
    cake: cakeReducer,
    icecream: icecreamReducer
})

const store = redux.createStore(rootReducer)

const unSubscribeStore = store.subscribe(() => console.log("root_store", store.getState()))

// >>>>>> dispatching Actions using rootReducer
// dispatching Action
console.log("---------- rootReducer [Combined_Reducers] -----------------")
store.dispatch(orderIceCream())