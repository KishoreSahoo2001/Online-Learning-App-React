import { ADD_TO_CART } from '../actions/cartActions';

interface CartItem {
    id: number;
    title: string;
    price: number;
}

interface CartState {
    cartItems: CartItem[];
}

interface AddToCartAction {
    type: typeof ADD_TO_CART;
    payload: CartItem;
}

type CartAction = AddToCartAction;

const initialState: CartState = {
    cartItems: [],
};

const cartReducer = (state = initialState, action: CartAction): CartState => {
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