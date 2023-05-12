const store = require('./store/store')
const cakeActions = require('./store/cakeSlice').cakeActions


console.log("initState", store.getState())
const unsubscribe = store.subscribe(() => console.log("updated_state", store.getState()))

store.dispatch(cakeActions.ordered())
store.dispatch(cakeActions.ordered())
store.dispatch(cakeActions.ordered())
//restock
store.dispatch(cakeActions.restock(3))
unsubscribe()