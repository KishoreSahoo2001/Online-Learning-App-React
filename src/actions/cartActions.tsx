export const ADD_TO_CART = 'ADD_TO_CART';

interface AddToCartAction {
    type: typeof ADD_TO_CART;
    payload: { id: number; title: string; price: number };
}

export const addToCart = (article: { id: number; title: string; price: number }): AddToCartAction => {
    return {
        type: ADD_TO_CART,
        payload: article,
    };
};