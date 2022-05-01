
export default function (state = {}, action) {
    switch (action.type) {
        case 'GET_VEHICLES': {
            return { ...state, vehicles: action.vehicles }
        }
        default:
            return state
    }
}