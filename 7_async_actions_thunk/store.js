const redux = require('redux')

// Thunk: a middleware --> defines Async actionCreators    [yarn add redux-thunk]
const thunk = require('redux-thunk').default

const applyMiddleWare = redux.applyMiddleware

// 1- State
const initialState = {
    loading: false,
    data: [],
    error: ``
}

// 2- Actions
const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED'
const FETCH_USERS_SUCCEDED = 'FETCH_USERS_SUCCEDED'
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'

const fetchUsersRequest = () => (
    {
        type: FETCH_USERS_REQUESTED
    }
)
const fetchUsersSuccess = users => (
    {
        type: FETCH_USERS_SUCCEDED,
        payload: users
    }
)
const fetchUsersFail = error => (
    {
        type: FETCH_USERS_FAILED,
        payload: error
    }
)


// 3- Reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUESTED:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCEDED:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: ``
            }
        case FETCH_USERS_FAILED:
            return {
                ...state,
                loading: false,
                data: [],
                error: action.payload
            }
        default: {
            return state
        }
    }
}


// 4- Async Action_Creator
const fetchUsers = () => {
    return function(dispatch){
        dispatch(fetchUsersRequest()) // sets loading:true

        // fetching from API
        fetch(`https://jsonplaceholder.typicode.com/users`)
        .then(res=> res.json())
        .then(data => {
            const users = data.map(({id}) => id)
            dispatch(fetchUsersSuccess(users))
        })
        .catch(err => {
            dispatch(fetchUsersFail(err.message))
        })
    }
}


// 5- store
const store = redux.createStore(reducer, applyMiddleWare(thunk))


// running
store.subscribe(() => console.log(store.getState()))

store.dispatch(fetchUsers())