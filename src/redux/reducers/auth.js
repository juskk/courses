import * as actionTypes from '../actionTypes'

const innerState = {
    authenticating: false,
    authType: null,
    idToken: null,
    localId: null,
    email: null,
    loading: false,
    error: false,
}

const auth = (state = innerState, action) => {
    switch (action.type) {
        case actionTypes.SWITCH_AUTHENTICATING:
            const gotAuthType = state.authenticating ? null : action.authType;
            return {
                ...state,
                authenticating: !state.authenticating,
                authType: gotAuthType,
            }
        case actionTypes.START_AUTH:
            return {
                ...state,
                loading: true,
                error: false,
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                idToken: action.idToken,
                localId: action.localId,
                authenticating: false,
                authtype: null,
                email: action.email,
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                idToken: null,
                localId: null,
            }
        default: 
            return {
                ...state
            }
    }
}

export default auth