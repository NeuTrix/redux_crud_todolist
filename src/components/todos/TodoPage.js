// vendor
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
// custom
import { createTodo } from '../../actions/createActions';
import { deleteTodo } from '../../actions/deleteActions';
import { editTodo } from '../../actions/editActions';

import TaskCounter from './TaskCounter';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

// +++++++++ CSS +++++++++

const Grid = styled.div`
	/* mobile view */

	display: grid;
	grid-template-areas: 
		" count "
		" new "
		" list "
	;
	grid-auto-rows: auto;
	margin-top: 10px;
`;

const Counter = styled(TaskCounter)`
	grid-area: count;
`;

const NewItem = styled(TodoForm)`
	grid-area: new;
`;

const List = styled(TodoList)`
	grid-area: list;
`;

// +++++++++ COMPONENT +++++++++

class TodoPage extends Component {
	componentDidMount() {
		const { isAuthenticated, fetchTodos } = this.props;
		return (
			isAuthenticated
				? fetchTodos()
				: ''
		);
	}

	render() {
		return (
			<Grid className="TodoPage">
				<Counter
					fetchTodos={this.props.fetchTodos}
					todos={this.props.todoArray}
  />
				<NewItem
					createTodo={this.props.createTodo}
					owner={this.props.user._id}
  />
				<List
					deleteTodo={this.props.deleteTodo}
					editTodo={this.props.editTodo}
					todoArray={this.props.todoArray}
  />
  </Grid>
		);
	}
}

// +++++++++ PROPS +++++++++

TodoPage.propTypes = {
	createTodo: PropTypes.func.isRequired,
	deleteTodo: PropTypes.func.isRequired,
	fetchTodos: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
	todoArray: PropTypes.array.isRequired,
	user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	isAuthenticated: state.authApi.isAuthenticated,
	todoArray: state.todos,
	user: state.authApi.user,
});

const mapDispatchToProps = dispatch => ({
	createTodo: (task) => { dispatch(createTodo(task)); },
	deleteTodo: (_id) => { dispatch(deleteTodo(_id)); },
	editTodo: (_id, task) => { dispatch(editTodo(_id, task)); },
	fetchTodos: () => 		{ dispatch(fetchTodos()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoPage);
