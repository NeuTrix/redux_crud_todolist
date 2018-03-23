export const ADD_TODO = 'ADD_TODO';
export const EDIT_ITEM  = 'EDIT_ITEM';
export const READ_ALL_TODOS = 'READ_ALL_TODOS';
export const REMOVE_TODO = 'REMOVE_TODO';
export const RESET_TODOS_STATE = 'RESET_TODOS_STATE';
export const TOGGLE_COMPLETE = 'TOGGLE_COMPLETE';
export const UPDATE_ITEM = 'UPDATE_TASK'; // Updates entire item obj.
export const UPDATE_TASK = 'UPDATE_TASK';
export const UPDATE_RANK = 'UPDATE_RANK';
export const UPDATE_DATE = 'UPDATE_DATE';

export const resetTodosState = (resetState) => {
	return {
		type: RESET_TODOS_STATE,
		payload: {
			resetState: resetState
		}
	};
}

export const todosSetInitialState = (initialState) => {
	return {
		type: READ_ALL_TODOS,
		payload: {
			newState: initialState
		}
	};
}

export const addTodo = (todo) => {
// ??? can this just be 'todo'
	return {
		type: ADD_TODO,
		payload: {
			todo: todo
		}
	};
};

export const editItem = (id, _update) => {
	return {
		type: EDIT_ITEM,
		payload: {
			_id: id,
			update: _update
		}
	};
};

export const removeTodo = (id) => {
	return {
		type: REMOVE_TODO,
		payload: {_id: id}
	};
};

export const toggleComplete = (id) => {
	return {
		type: TOGGLE_COMPLETE,
		payload: {_id: id}
	};
};

//updates task only
export const updateTask = (id, _task) => {
	return {
		type: UPDATE_TASK,
		payload: {
			_id: id,
			task: _task
		}
	};
};

export const updateRank = (id, _rank) => {
	return {
		type: UPDATE_RANK,
		payload: {
			_id: id,
			rank: _rank
		}
	};
};

export const updateDate = (id, _date) => {
	return {
		type: UPDATE_DATE,
		payload: {
			_id: id,
			date: _date
		}
	};
};


