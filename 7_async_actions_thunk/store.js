const redux = require('redux')

// "Thunk" means=>  "a piece of code that does some delayed work"
// Thunk (middleware) --> the standard way to define --> "Async actionCreators"
// "action creator" => function which dispatch some [ actions == "thunk functions"] :)
// "thunk function" accepts (dispatch method, getState)   ----   can be called via:->  store.dispatch()
// [yarn add redux-thunk]
const thunk = require('redux-thunk').default

// -- ex --:
// fetchTodoById is the "thunk action creator"
function fetchTodoById(todoId) {
    // fetchTodoByIdThunk is the "thunk function" --> which will perform Async task --then--> dispatch(action)
    return async function fetchTodoByIdThunk(dispatch, getState) {
        const response = await client.get(`/fakeApi/todo/${todoId}`)
        dispatch(todosLoaded(response.todos))
    }
}
// same as === arrow function
// const fetchTodoById = todoId => async dispatch => {
//     const response = await client.get(`/fakeApi/todo/${todoId}`)
//     dispatch(todosLoaded(response.todos))
// }




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

const fetchUsersRequest = () => ( // every Action -returns-> {object}
    {
        type: FETCH_USERS_REQUESTED
    }
)
const fetchUsersSuccess = users => ( // every Action -returns-> {object}
    {
        type: FETCH_USERS_SUCCEDED,
        payload: users
    }
)
const fetchUsersFail = error => ( // every Action -returns-> {object}
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


// "thunk action creator"
// will perform Async func() --then--> dispatch(action)
// 4- Async Action_Creator <<<<<< will (Promise) to perform -> dispatch(ACTION) --depending on--> the Async response :)
const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUsersRequest()) // sets loading:true

        // fetching from API
        fetch(`https://jsonplaceholder.typicode.com/users`) // <<< try to make url malformed << to see Error
            .then(res => res.json())
            .then(data => { // SUCCESS
                const users = data.map(({ id }) => id)
                dispatch(fetchUsersSuccess(users))
            })
            .catch(err => { // FAIL
                dispatch(fetchUsersFail(err.message))
            })
    }
}


// 5- store
const store = redux.createStore(reducer, redux.applyMiddleware(thunk))


// running
store.subscribe(() => console.log("--- Normal subscribe for tracking state --- \n\n", store.getState(), "\n\n"))

store.dispatch(fetchUsers())
// *** NOTE ***
// fetchUsers() --> is not an action by itself --> but it creates the appropriate dispatch(ACTION)
// * so it is called "Action Creator"

// *** that is why we need to use 'redux-thunk' *** => to enables us to call the "Action Creator" function :D