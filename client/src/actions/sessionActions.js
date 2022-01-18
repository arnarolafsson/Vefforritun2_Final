import * as actionTypes from '../constants';

export const addSession = session => ({
    type: actionTypes.ADD_SESSION,
    payload: session
});