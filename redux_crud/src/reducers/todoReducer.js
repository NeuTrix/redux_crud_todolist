import shortid from 'shortid'

const TodoReducer = (
	state = [
	{id:"0.1HxYz", date: 	"2020-01-01", complete: false, task:"Get some Milk", rank: "High"},
	{id:"0.2HxYz", date: 	"2020-01-01", complete: false, task:"Kiss my daughter", rank: "Med"},
	{id:"0.3HxYz", date: 	"2020-01-01", complete: false, task:"Celebrate life!", rank: "Low"},
	],
	action) => {

	let payload  = action.payload;
	let type = action.type;

	switch (type) {

		case "ADD_TODO": {
			action.payload.id = shortid.generate();
			return [...state, payload];
		}

		case "REMOVE_TODO":{
					
			let _id = payload.id
			let matchId = (task) => { return task.id === _id }

			if(state.some(matchId)) {
				let index = state.findIndex(matchId)

				return [
					...state.slice(0, index), 
				 	...state.slice(index+1)
				]
			} 
				return state
		}

		case "TOGGLE_TODO": {

			let _id = payload.id
			let matchId = (task) => { return task.id === _id }
			let target = state.findIndex(matchId)

			let newState = state.map((task, index) => {
				if(index !== target ) {
					return task
				}
				return Object.assign(
						{}, 
						task, 
						{complete:!task.complete}
					)
			})

			return Object.assign([], state, newState)
		}

		case "UPDATE_TODO": {

			let _id = payload.id
			let _newTask = payload.task
			let matchId = (task) => { return task.id === _id }

			let target = state.findIndex(matchId)

			let updatedTask = state.map((task, index) => {
				if(index !== target ) {
					return task
				} else {
				return Object.assign({}, task, {task:_newTask})
				}
			})

		 return Object.assign([], state, updatedTask)
		}

		default: {
			return state
		}
	}
}

export default TodoReducer