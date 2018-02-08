/* eslint-env mocha */

import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from '../../containers/TodoList';

import { Provider } from 'react-redux';
import store from '../../store/store';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(
		<Provider store={ store } >
			<TodoList />
		</Provider>
		, div);
});


