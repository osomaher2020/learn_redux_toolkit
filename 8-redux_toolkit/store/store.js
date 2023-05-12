const configureStore = require("@reduxjs/toolkit").configureStore
const cakeReducer = require('./cakeSlice')

const store = configureStore({
    reducer: {
        cake: cakeReducer,
        // >>>>>>>>>>>> you can add as much reducers as you need <<<<<<<<<< it executed [combineReducers()] under the hood
        // icecream: icecreamReducer,
    }
})

module.exports = store