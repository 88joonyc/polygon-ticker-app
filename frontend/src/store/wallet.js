import { csrfFetch } from './csrf';

const LOAD = 'wallet/load'
const CREATE_WALLET = 'wallet/createWallet';
const UPDATE_WALLET = 'wallet/updateWallet';

const load = (wallet) => {
    return {
        type: load,
        payload: wallet
    }
};

const createWallet = (wallet) => {
    return {
        type: CREATE_WALLET,
        payload: wallet,
    };
};

const updateWallet = (wallet) => {
    return {
        type: UPDATE_WALLET,
        payload: wallet
    }
};

export const create = (wallet) => async (dispatch) => {
    const { amount, userId, accountType } = wallet;

    console.log(wallet)

    const response = await csrfFetch('/api/wallet', {
        method: 'POST',
        body: JSON.stringify({
            amount,
            userId,
            accountType,
        }),
    });
    const data = await response.json();
    dispatch(createWallet(data.wallet));
    return response;

};

export const update = (wallet) => async (dispatch) => {
    const { userId, accountType, amount } = wallet;

    const response = await csrfFetch('/api/wallet/update', {
        method: 'POST',
        body: JSON.stringify({
            userId,
            accountType,
            amount
        }),
    });

    const data = await response.json();
    dispatch(updateWallet(data.wallet));
    return response

};


const initialState = { user: null };


const walletReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD: 
            newState = Object.assign({}, state);
            newState.wallet = action.payload;
            return newState;
        case CREATE_WALLET:
        case UPDATE_WALLET:
            return {
                ...state,
                [action.wallet.id]: action.wallet,
            }

        default:
            return state
    }
}

export default walletReducer;