import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import normalizeDate from '../../helpers/normalizeDate';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired,
	createTodo: PropTypes.func.isRequired,
	owner: PropTypes.string.isRequired, // id of the current list owner
};

class TodoForm extends Component {

	constructor(props) {
		super(props);
		const { owner } = this.props; // lint requires deconstruction
		this.state = {
			date: normalizeDate(new Date()),
			owner, // assign owner to state for createTodo function
			rank: 'Med',
			task: '',
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(e) {
		const { createTodo } = this.props;
		e.preventDefault();
		createTodo(this.state);
		this.setState({ task: '' });
	}

	handleChange(e) {
		e.preventDefault();
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { classes } = this.props;
		const { date, rank, task } = this.state;

		return (
			<FormControl
				className={classes.grid}
				component="form"
				onSubmit={this.handleSubmit}
			>
				<TextField
					className={classes.task}
					fullWidth
					id="new_item_task"
					label="enter new task"
					margin="dense"
					name="task"
					required
					type="text"
					value={task}
					variant="outlined"
					onChange={this.handleChange}
				/>
				<TextField
					className={classes.rank}
					fullWidth
					id="new_item_priority"
					label="set rank"
					margin="dense"
					name="rank"
					select
					value={rank}
					onChange={this.handleChange}
				>
					<option value="High">High</option>
					<option value="Med">Med</option>
					<option value="Low">Low</option>
				</TextField>

				<TextField
					className={classes.datePick}
					id="new_item_date"
					fullWidth
					label="set due date"
					margin="dense"
					name="date"
					// style={{background:'orange', padding: 10}}
					type="date"
					value={date}
					onChange={this.handleChange}
				/>

				<Button
					className={classes.button}
					component="button"
					id="new_item_submit"
					color="secondary"
					type="submit"
					variant="contained"
				>
					{'Add'}
				</Button>
			</FormControl>
		);
	}
}

const styles = theme => ({
	button: {
		gridArea: 'button',
		height: '75%',
		marginTop: 5,
	},

	datePick: {
		gridArea: 'date',
	},

	grid: {
		/* mobile view */
		border: '2px solid',
		borderColor: theme.palette.secondary.main,
		display: 'inline-grid',
		gridColumnGap: '20px',
		gridTemplateAreas: `
			" task task task "
			" rank date button " 
		`,
		gridTemplateColumns: '3fr 4fr 1fr',
		marginBottom: 20,
		padding: 10,
		placeItems: 'center',
	},

	menu: {
		background: 'orange',
		color: 'orange',
	},

	rank: {
		gridArea: 'rank',

	},

	task: {
		gridArea: 'task',
		marginBottom: 10,
		textIndent: 5,
	},
});

TodoForm.propTypes = propTypes;

export default withStyles(styles)(TodoForm);
