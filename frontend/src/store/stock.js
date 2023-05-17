import { csrfFetch } from "./csrf";

const LOAD = 'stock/load'
const PURCHASE_STOCK = 'stock/purchaseStock';
const UPDATE_STOCK = 'stock/updateStock';

const load = stocks => ({
    type: LOAD,
    payload: stocks
});

const purchaseStock = (stock) => {
    return {
        type: PURCHASE_STOCK,
        payload: stock,
    };
};

const updateStock = (stock) => {
    return {
        type: UPDATE_STOCK,
        payload: stock
    }
};

export const stocks = id => async dispatch => {
    const response = await csrfFetch(`/api/stock/${id}`)
    const data = await response.json();

    dispatch(load(data.stocks))

    return response
}

export const purchase = (stock) => async dispatch => {

    const response = await csrfFetch(`/`, {
        method: 'POST',
        body: JSON.stringify(stock)
    })

    const data = response.json();

    dispatch(purchaseStock(data.stock))
    return data

}

const initialState = { stock: [] };

const stockReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case LOAD:
            newState = Object.assign({}, state);
            newState.stock = [...action.payload];
            return newState
        default:
            return state
    }

} 


export default  stockReducer