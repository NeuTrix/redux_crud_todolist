import axios from 'axios';
import { editItem } from './todoActions';

import {
	EDIT_HAS_SUCCEEDED,
	EDIT_HAS_ERRORED ,
	EDIT_IS_POSTING,
} from './typeConstants';

export const editHasSucceeded = (bool) => {
	return {
		type: EDIT_HAS_SUCCEEDED,
		payload: { status: bool }
	};
};

export const editHasErrored = (bool) => {
	return {
		type: EDIT_HAS_ERRORED ,
		payload: { status: bool }
	};
};

export function editIsPosting (bool)  {
	return {
		type: EDIT_IS_POSTING,
		payload: { status: bool }
	};
}

export function editTodo (_id, data) {
 	let url = 'https://redux-todo-api.herokuapp.com'

	return (dispatch) => {
		axios.put (`${ url }/api/todos/${ _id }`, data)
			dispatch (editIsPosting(true))
			.then ((res) => {
				if (res.status !== 200) {
					throw Error (res.statusText);
				} else {
					dispatch (editItem (_id, res.data.todo))
				}
			})
			.then (() => {
				dispatch (editIsPosting (false));
				dispatch (editHasSucceeded (true));
			})
			.catch ((err) => {
				dispatch (editHasErrored (true));
				console.error(err);
			});
	};
}
