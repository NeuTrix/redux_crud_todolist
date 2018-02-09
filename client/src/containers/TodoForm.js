import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button, Form } from 'react-bootstrap';

import TodoTitleBar from './TodoTitleBar'

// ========= ========= ========= 
const TodoForm = (props) => {

	// create a default format for today's date
	const getDay = (date) => {
		let year = date.getFullYear();
		let month = date.getMonth()+1;
		let day = date.getDate();
		let fullDate =[];
		return [...fullDate, year, month, day].join('-');
	};
	const _today = getDay(new Date());

	let _task, _rank, _date;
	
	const handleSubmit = (event) => {
		event.preventDefault();
		props.addTodo({
			date: _date.value,
			task: _task.value, 
			rank: _rank.value, 
		});
	
		// reset the fields
		_task.value ='';
		_task.focus();
	};

	const style ={
		// outline: '0.5px solid lightgrey',
		// padding:0,
	};

	const styleTop ={
		// outline: '1px solid lightgrey',
		// backgroundColor: "#ffdda3",//orange
		// backgroundColor: "#60D9FA",
		backgroundColor: 'lightblue',
		borderRadius: 5,
		padding:10,
		// paddingBottom:20,
		// paaddingTop: 20,
		marginBottom: 20,
	};

	const styleTitle ={
		color:'#006699',
		// marginBottom: 20,
	};

	return (
		<Grid className= 'TodoForm'>

			<Form onSubmit={ handleSubmit }>

				<Row className= 'AddTodoTitle'>	
					<h3>
						Add a new Todo here:
					</h3>
				</Row>

				<Row>	
					<TodoTitleBar/>
				</Row>

				<Row style= { styleTop }>

					<Col sm = { 1 } > 
						<p>
							===>
						</p>
					</Col>

					<Col className='rank' sm = { 2 } > 

						<select  
							ref= { (value) => _rank = value }
							defaultValue='Med' 
						>
							<option value='High'>High</option>
							<option value='Med' >Med</option>
							<option value='Low'>Low</option>

						</select>

					</Col>

					<Col className='date' style={ style } sm = { 2 } > 

						<input 
							ref= { (input) => _date = input } 
							type = 'date'  
							defaultValue = { _today } 
							required
						/> 

					</Col>

					<Col className='task'  sm = { 5 } > 

						<input 
							ref= { (input) => _task = input } 
							type = 'text'  
							placeholder='enter a new task here...' 
							size={ 60 } 
							maxLength= {48} 
							required
						/>

					</Col>
			
					<Col className='reset' style= { style } sm = { 1 } > 
						<Row>
							<Col sm= { 6 }>
								<Button 
									className= { 'btn btn-info btn-sm' } 
									type= 'submit' 
									value= 'Add' 
								> Add </Button>
							</Col>

							<Col sm= { 6 }>
								<Button 
									className= { 'btn btn-warning btn-sm' } 
									type = 'reset'
								> Reset 
								</Button> 
							</Col>

						</Row>
					</Col>

				</Row>

			</Form>

		</Grid>
	);
};

TodoForm.propTypes = {
	addTodo: PropTypes.func.isRequired,
	_task: PropTypes.string.isRequired,
	_rank: PropTypes.string.isRequired,
	_date: PropTypes.string.isRequired,
};

TodoForm.defaultProps = {
	addTodo: f=>f,
	_task: '',
	_rank: '',
	_date: ''
};

export default TodoForm;