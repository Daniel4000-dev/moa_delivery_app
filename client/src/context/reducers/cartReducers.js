const cartReducer = (state = null, action) => {
    switch (action.type) {
        case "GET_CART_ITEMS":
            return state;

        case "SET_CART_ITEMS":
            return action.items;

        case "CLEAR_CART_ITEMS":
            return action.state;

        default:
            return state;
    }
};

export default cartReducer;