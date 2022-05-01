
export default function (state = {}, action) {
    switch (action.type) {
        case 'GET_ORDERS': {
            return { ...state, orders: action.orders }
        }
        case 'GET_COMPLETED_ORDERS': {
            return { ...state, completedOrders: action.completedOrders }
        }
        case 'EDIT_ORDER': {
            return { ...state, edit_order: action.edit_order }
        }
        case 'CART': {
            return { ...state, cartData: action.cartData }
        }
        case 'GET_CARDS': {
            return { ...state, cards: action.cards }
        }
        default:
            return state
    }
}