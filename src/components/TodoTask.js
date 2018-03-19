import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { Col, Button, Form, FormControl, Row } from 'react-bootstrap';
import DeleteBtn from '../components/DeleteBtn';

class TodoTask extends Component {

	constructor (props) {
		super(props);

		this.state = {
			item: this.props.item,
			task: this.props.item.task,
			_id: this.props.item._id,
			defStyle: this.props.style,
			isComplete: this.props.item.completed,
			isEditing: false,
			editStyle: { backgroundColor: 'aliceBlue', color: 'navy'}
		};

		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillReceiveProps (newProps) {
		this.setState({ defStyle: newProps.style, isComplete: newProps.item.completed });
	}

	handleClick(e) {
		e.preventDefault()
		let { isComplete, editStyle } = this.state

		if (isComplete) {
			alert(`completed is: "${isComplete}".\nPlease uncheck "completed" before continuing to edit`);
			this.setState({ defStyle: this.props.style });
		} else {
			this.setState({ isEditing: true, defStyle: editStyle  });
		}
	}

	handleChange(e){
		e.preventDefault()
		this.setState({ task: e.target.value })
	}

	handleSubmit(e){
		e.preventDefault()
		const { _id, task} = this.state
		this.props.editTodo( _id, {task: task})
	}

	handleFocus(e){
		e.preventDefault()
			e.target.setSelectionRange(0, e.target.value.length);
	}
	
	render () {

		const space = { 
			xs: { form: 8, delt: 1, edit: 2 }, 
			sm: { form: 8, delt: 1, edit: 2 }, 
			md: { form: 8, delt: 1, edit: 2 }, 
			lg: { form: 8, delt: 1, edit: 2 }, 
		};

		return (

			<div>
				<Row>
					<Form onSubmit = { this.handleSubmit } >

					<Col 
						xs = { space.xs.form } 
						sm = { space.sm.form } 
						md = { space.md.form } 
						lg = { space.lg.form } 
					>
						<FormControl 
							className = 'task' 
							name = 'task'
							defaultValue = { this.props.item.task }
							required
							style = { this.state.defStyle }
							type = 'text'  
							onClick = { this.handleClick }
							onChange = { this.handleChange }
							onFocus =  { this.handleFocus }
						/> 
					</Col>
					<Col 
						xs = { space.xs.delt } 
						sm = { space.sm.delt } 
						md = { space.md.delt } 
						lg = { space.lg.delt }
						xsPull = { 1 }
					>
						<DeleteBtn 
							task = { this.props.item.task } 
							_id = { this.props.item._id }
							deleteTodo = { this.props.deleteTodo } 
						/>
					</Col>

					<Col 
						xs = { space.xs.edit } 
						sm = { space.sm.edit } 
						md = { space.md.edit } 
						lg = { space.lg.edit } 
					>
							<Button type = 'submit' bsStyle = 'primary' >
			          Edit
			        </Button> 
					</Col>
						</Form>
				</Row>
			</div>
		);
	}
}

TodoTask.propTypes = {
	deleteTodo: PropTypes.func.isRequired,
	editTodo: PropTypes.func.isRequired,
	item: PropTypes.object.isRequired,
	style: PropTypes.object.isRequired,
};

TodoTask.defaultProps = {
	deleteTodo: f => f,
	editTodo: f => f,
	item: {
		task: 'default from TodoTask.js',
		completed: false
	},
	style: {},
};

export default TodoTask;