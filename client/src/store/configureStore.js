import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../Reducers';
import { createLogger } from 'redux-logger';

// export default function configureStore(initialState) {
//     const enhancer = applyMiddleware(thunk);
//     return createStore(
//         reducer,
//         initialState,
//         enhancer
//     );

const logger = createLogger();

export const store = createStore(
    reducer,
    applyMiddleware(
        thunk,
        logger,
    ),
);
