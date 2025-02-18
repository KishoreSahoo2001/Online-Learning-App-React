import { ADD_TO_CART } from '../actions/cartActions';
import { Article } from '../types/types';

interface CartState {
    cartItems: { id: number; title: string; price: number }[];
}

const initialState: CartState = {
    cartItems: [],
};

const cartReducer = (state = initialState, action: any): CartState => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload],
            };
        default:
            return state;
    }
};

export default cartReducer;