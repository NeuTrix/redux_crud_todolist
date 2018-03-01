/* eslint-env jest, mocha, chai */

// should split this into a reducer test suite
// import React from 'react';

// ======== esllint
/*eslint no-undef: "error"*/

import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import store from '../../store/store';
import shortid from 'shortid';

import { 
	addTodo, 
	editItem,
	updateTask,
	removeTodo, 
	toggleComplete,
	updateRank, 
	updateDate,
	todosSetInitialState,
} from '../../actions/todoActions';

// +++++++++ 

xdescribe('The TODOS_SET_INITIAL_STATE reducer', () => {

	xdescribe('The iniital state', () => {
		let	firstState = store.getState().todos;
		deepFreeze(firstState);

		it('... has a default state array ', () => {
			expect(firstState).to.be.an('array');
		});
		it('... has at least 1 initial item', () => {
			expect(firstState.length).to.be.above(0);
		});
	});

	xdescribe('the todosSetInitialState action creator', () => {

		xit('... has a type of "TODOS_SET_INITIAL_STATE"', () => {
			expect(todosSetInitialState()).to.have.property('type')
				.to.eql('TODOS_SET_INITIAL_STATE');
		});

		xit('... it has a payload prop of "newState" ', () => {
			expect(todosSetInitialState()).to.have.property('payload');
			expect(todosSetInitialState().payload).to.have.property('newState');
		});

	});

	xdescribe('The Set intial state REDUCER', () => {

		let	initialState = [{
			_id: shortid.generate(), 
			date: 	'2020-12-31', 
			completed: false, 
			task:'New state item', 
			rank: 'High' 
		}];  

		let newState;

		beforeAll(() => {
			store.dispatch(todosSetInitialState(initialState));
			newState = store.getState().todos;
		});

		it('... can return a new state array', () => {
			expect(newState).to.be.an('array');
		});

		it('... has replaced the old state', () => {
			expect(newState.length).to.eql(1);
			expect(newState[0].task).to.eql('New state item');
		});
			
	});
});

describe('The TodoReducer CRUD suite', () => {

	let 
		initialTodoList,
		addedTodoToList,
		toggledTodoToList,
		initialLength,
		modLength, 
		newItem,
		_task,
		_id;

	let matchItem = (item) => {
		return item._id === _id;
	};

	beforeAll(() => {
		initialTodoList = store.getState().todos;
		deepFreeze(initialTodoList);
		initialLength = initialTodoList.length;
	});

	afterAll(() => {
		initialTodoList = [];
	});

	// subsequent CRUD tests will depend on ADD_TODO's state
	
	describe('The ADD_TODO function', () => { 

		beforeAll(() => {

			newItem = { 
				date: '2017-12-31',
				completed: true,
				details: 'TodoReducer test suite',
				owner: 'Todo Tester',
				rank: 'High',
				task: '**** ADDED a new TODO ****',
			};

			store.dispatch(addTodo(newItem));
			addedTodoToList = store.getState().todos;
			modLength = addedTodoToList.length;
			_task = addedTodoToList[modLength -1];
			_id = _task._id;

		});

		it('... the new "addedTodoToList" is an array', () => {
			expect(addedTodoToList).to.be.an('array');
		});

		it('...can ADD one more _task to the initialTodoList', () => {
			expect(initialLength).to.above(0);
			expect(modLength).to.eql(initialLength + 1);
		});

		it('... has the expected _id property', () => {
			expect(_task).to.have.property('_id');
		});

		it('... has the expected date property', () => {
			expect(_task).to.have.property('date').eql(newItem.date);
		});

		it('... has the expected completed property', () => {
			expect(_task).to.have.property('completed').eql(newItem.completed);
		});

		it('... has the expected details property', () => {
			expect(_task).to.have.property('details').eql(newItem.details);
		});

		it('... has the expected owner property', () => {
			expect(_task).to.have.property('owner').eql(newItem.owner);
		});

		it('... has the expected rank property', () => {
			expect(_task).to.have.property('rank').eql(newItem.rank);
		});

		it('... has the expected task property', () => {
			expect(_task).to.have.property('task').eql(newItem.task);
		});
	});

	
	
	describe('The TOGGLE_COMPLETE function', () => {

		it('... initial task completed is "true" ', () => {
			expect(_task.completed).to.eql(true);
		});

		it('changes the task completed status to false', () => {
			store.dispatch(toggleComplete(_id));
			toggledTodoToList = store.getState().todos;

			let new_task = toggledTodoToList[ modLength - 1 ];
			expect(new_task.completed).to.eql(false);
		});
	});

	describe('The UPDATE_TASK function', () => {

		it('... can update the todo items tasks', () => {
			let content = '**** UPDATED the TASK for this todo item ****';
			store.dispatch(updateTask(_id, content));
			let updatedTodoToList = store.getState().todos;

			let new_task = updatedTodoToList[ modLength - 1 ];
			expect(new_task.task).to.eql(content);
		});
	});

	describe('The UPDATE_TASK function', () => {

		let new_task, editTodoList, old_task

		beforeAll(() => {
			new_task = { owner: "Black Panther", task:"kickass" }
			old_task = store.getState().todos[0];
			// console.log(old_task)
		});

		it('... initiall has a difference in tasks', () => {
			expect(old_task.task).not.to.eql(new_task.task);
		});

		it('... initially old_task has new owner prop', () => {
			expect(old_task).not.to.have.property('owner')
		})

		it('... edited task is different from old task', () => {
			let _id = old_task._id
			store.dispatch(editItem(_id, new_task));
			let edited_task = store.getState().todos[0];
			// console.log('**Edited ==>', edited_task)
			expect(edited_task).not.to.eql(old_task);
 		});
	});

	describe('The UPDATE_RANK function', () => {

		it('... can update the todo items rank', () => {
			let content = 'Low';

			store.dispatch(updateRank(_id, content));
			let updatedTodoToList = store.getState().todos;

			let new_task = updatedTodoToList[ modLength - 1 ];
			expect(new_task.rank).to.eql(content);
		});
	});

	describe('The UPDATE_DATE function', () => {
		it('... can update the todo items date', () => {
			let content = new Date(); 

			store.dispatch(updateDate(_id, content));
			let updatedTodoToList = store.getState().todos;

			let new_task = updatedTodoToList[ modLength - 1 ];
			expect(new_task.date).to.eql(content);
		});
	});

	describe('The REMOVE_TODO function', () => {

		let 
			removedTodoFromList, 
			postLength;

		beforeAll(() => {
			store.dispatch(removeTodo(_id));
			removedTodoFromList = store.getState().todos;
			postLength = removedTodoFromList.length; 
		});

		it('... starts with an inital list of at least 2 items', () => {
			expect(modLength).to.be.above(1);
		});

		it('...the previous array contained the "_task" ', () => {
			let presence = addedTodoToList.some(matchItem);
			expect(presence).to.eql(true);
		});

		it('...it removed the task from the list', () => {
			let presence = removedTodoFromList.some(matchItem);
			expect(presence).to.eql(false);
		});

		it('... the updatedTodoList is now smaller', () => {
			expect(postLength).to.eql(modLength - 1);
		});
	});

});
