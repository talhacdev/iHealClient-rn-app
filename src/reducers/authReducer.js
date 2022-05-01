
export default function (state = {}, action) {
    switch (action.type) {
        case 'SIGNUP': {
            return { ...state, user: action.user }
        }
        case 'LOGIN': {
            return { ...state, user: action.user }
        }
        case 'PROFILE': {
            return { ...state, user: action.user, sessionExpired: action.sessionExpired }
        }
        case 'SESSION': {
            return { ...state, sessionExpired: action.sessionExpired }
        }
        default:
            return state
    }
}