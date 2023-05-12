const createSlice = require("@reduxjs/toolkit").createSlice

const cakeSlice = createSlice({ // <<<<< returns {reducer , actions}
    name: 'cake',
    initialState: {
        numberOfCakes: 10
    },
    reducers: {
        ordered: (state) => {
            state.numberOfCakes--
        },
        restock: (state, action) => {
            state.numberOfCakes += action.payload
        }
    }
})


module.exports = cakeSlice.reducer
module.exports.cakeActions = cakeSlice.actions