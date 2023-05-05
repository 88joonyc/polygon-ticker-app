const LOAD = 'stock/LOAD'

const load = stocks => ({
    type: LOAD,
    payload: stocks
});

const all = function () {

}

const initialState = { stock: null };

const stockReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case LOAD:
            newState = Object.assign({}, state);
            newState = [...action.payload];
        default:
            return state
    }

} 


export default  stockReducer