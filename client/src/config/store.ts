/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import promiseMiddleware from 'redux-promise-middleware';

import errorMiddleware from './error-middleware';
import notificationMiddleware from './notification-middleware';
import loggerMiddleware from './logger-middleware';
import reducer, { IRootState } from '../shared/reducers';

import './axios-interceptor'

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const defaultMiddlewares = [
    thunkMiddleware,
    errorMiddleware,
    notificationMiddleware,
    promiseMiddleware,
    loadingBarMiddleware(),
    loggerMiddleware
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialize = (initialState?: IRootState, middlewares = []) => createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...defaultMiddlewares, ...middlewares))
);

export default initialize;
