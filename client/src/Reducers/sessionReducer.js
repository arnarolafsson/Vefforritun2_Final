import * as actionTypes from '../constants';

export default function sessionReducer(state = {}, action) {
    switch(action.type) {
        case actionTypes.ADD_SESSION:
            const { sessionID } = action.payload;
            localStorage.setItem('s.id', sessionID);
            return action.payload;
        default: return state;
    }
}