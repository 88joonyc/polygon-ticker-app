import { csrfFetch } from "./csrf";

const initialState = { multiple: null };

const SET_MULTIPLE = 'multiple/setMultiple';

const setMultiple = (multiple) => {
    return {
        type: SET_MULTIPLE,
        payload: multiple
    }
};

export const fetchMultipleTickers = (stocksData, dayBefore, dayCounter) => async (dispatch) => {
        console.log('thisisrunning')
        let response
        try{
            response = await csrfFetch('/api/ticker/search/multiple', {
                method: 'POST',
                'Content-type': 'application/JSON',
                body: JSON.stringify({
                    symbols: stocksData?.map(stock => stock?.ticker),
                    to: dayBefore,
                    from: dayCounter,
                })
            })
        } catch(err) {
            console.log(err)
        }
        const data = await response.json()
        // setData(data)

        return data
};

const multipleReducer = function(state = initialState, action){
    let newState;
    switch(action.type) {
        case SET_MULTIPLE:
            newState = Object.assign({}, state);
            newState.multiple = null;
            return newState
        default:
            return state;
    };
}

export default multipleReducer;