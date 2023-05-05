import { csrfFetch } from './csrf';

const CREATE_WALLET = 'wallet/createWallet';
const UPDATE_WALLET = '/wallet/updateWallet';

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
    const { buyingPower, userId, accountType } = wallet;

    const wallet = await csrfFetch('/api/wallet', {
        method: 'POST',
        body: JSON.stringify({
            buyingPower,
            userId,
            accountType,
        }),
    });
    const data = await wallet.json();
    dispatch(createWallet(data.wallet));
    return wallet;

};

export const update = (wallet) => async (dispatch) => {
    const { userId, accountType, amount } = wallet;

    const wallet = await csrfFetch('/api/wallet/update', {
        method: 'POST',
        body: JSON.stringify({
            userId,
            accountType,
            amount
        }),
    });

    const data = await wallet.json();
    dispatch(updateWallet(data.wallet));
    return wallet

};

const walletReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case CREATE_WALLET:
            newState = Object.assign({}, state)
        case UPDATE_WALLET:

        default:
            return state
    }
}

export default walletReducer;