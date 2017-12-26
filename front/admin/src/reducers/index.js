import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import channels from './channels'
import filters from './filters'

let composeEnhancers = compose;

const agregator = combineReducers({
  channels,
  filters,
});

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(createLogger());
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(
  agregator,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store
