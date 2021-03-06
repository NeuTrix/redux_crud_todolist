import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from '../reducers';
// import { loadState, saveState } from './localStorage';
// import throttle from 'lodash/throttle';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

const middlewares = [ 
	promise(), 
	thunk 
];
 
// only adds redux-logger in the TEST_ENV
if (process.env.NODE_ENV === 'development') {
	const { logger } = require('redux-logger');
	middlewares.push(logger);
}

// +++++++++ TEST LOGGING  
// to turn on logs in the test env
/*if (process.env.NODE_ENV === `test`) {
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
}*/

// state management: start the app with the current state in localStr
// const persistedState = loadState();

const store = createStore (
	
	rootReducer, 
	// persistedState, 
	compose(
		applyMiddleware(...middlewares),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);

store.subscribe(() => {
	// consider some action here...
});

// save the state anytime we have a change in the store
// add lodash #throttle to prevent overuse of an expensive ...
// ... JSON #stringify method in the saveState fn.

/*store.subscribe(throttle(() => {
	saveState({ 
		// pass specific object to limit scope of state saved
		// e.g. not save state of a visibility filter
		todos: store.getState().todos
	});
	// limits the store update
}, 1000));*/

export default store;
