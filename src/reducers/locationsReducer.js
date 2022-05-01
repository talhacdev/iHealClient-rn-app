
export default function (state = {}, action) {
    switch (action.type) {
        case 'GET_LOCATIONS': {
            return { ...state, locations: action.locations }
        }
        default:
            return state
    }
}