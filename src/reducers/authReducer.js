import isEmpty from 'lodash/isEmpty';
import {
	REGISTER_IS_POSTING,
	REGISTER_HAS_SUCCEEDED,
	SET_CURRENT_USER,
	REGISTER_HAS_ERRORED,
} from '../actions/typeConstants';

export const initialState = {
	registerIsPosting: false,
	registerHasSucceeded: false,
	registerHasErrored: false,
	loginIsPosting: false,
	loginHasSucceeded: false,
	loginHasErrored: false,
	user: {},
	isAuthenticated: false,
};

export const authReducer = (state = initialState, action = {}) => {
	let payload = action.payload;

	switch(action.type) {

	case REGISTER_IS_POSTING:
		return {
			...state, 
			registerIsPosting: payload.status
		}; 

	case REGISTER_HAS_SUCCEEDED:
		return {
			...state, 
			registerHasSucceeded : payload.status
		}; 
	
	case SET_CURRENT_USER:
		return {
			...state, 
			...{ isAuthenticated: !isEmpty(payload.user), 
				user: payload.user }
		}; 
					
	case REGISTER_HAS_ERRORED:
		return {
			...state, 
			registerHasErrored: payload.status
		}; 
	default: 
		return state;
	}
};

export default authReducer;