import { combineReducers } from 'redux'
import todoReducer from './todoReducer'


export default combineReducers({
	// todo: todoReducers
	// no need to provid a key/val pair if same names 
	todoReducer
})