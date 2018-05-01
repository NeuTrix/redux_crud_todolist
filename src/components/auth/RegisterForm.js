import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled	from 'styled-components';
// custom
import validateInput from '../../helpers/signupValidator';
import TextFieldGroup from './TextFieldGroup';
import BasicButton from '../buttons/BasicButton';
import { colors, media  } from '../../helpers/cssConstants';

// +++++++++  CSS  +++++++++ 

const Grid = styled.form `
	display: grid;
	grid-template-areas: 
		"title"
		"user"
		"email"
		"emConf"
		"pword"
		"pwConf"
		"submit"
	;
	grid-row-gap: 10px;
	border: 1px solid steelblue;
	color: ${colors._iceblue};
	padding: 20px;
	width: 300px;

	@media (${media._large}) {
		width: 500px;
	}
`;

const Title = styled.div `
	gride-area: title;
`;

const  User = styled(TextFieldGroup) `
	gride-area: user;
`;

const  Email = styled(TextFieldGroup) `
	gride-area: email;
`;

const  EmailConf = styled(TextFieldGroup) `
	gride-area: emConf;
`;

const  Pword = styled(TextFieldGroup) `
	gride-area: pword;
`;

const  PwordConf = styled(TextFieldGroup) `
	gride-area: pwConf;
`;

const  Submit = styled(BasicButton) `
	gride-area: submit;
`;

// +++++++++  COMPONENT  +++++++++ 

class RegisterForm extends Component {

	constructor(props, context) {

		super(props, context);
		this.state = {
			email: '',
			emailConfirm: '',
			errors: { },
			isLoading: false,
			password: '',
			passwordConfirm: '',
			username: '',
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		e.preventDefault();
		this.setState({ [e.target.name]: e.target.value });
	}

	isValid() {
		const { errors, isValid } = validateInput(this.state);
		if(!isValid) {
			this.setState({ errors });
		}
		return isValid;
	}

	onSubmit(e) {
		e.preventDefault(); 

		if (this.isValid()) {
			this.setState({ errors: { }, isLoading: true }); // reset state
			this.props.userSignupRequest(this.state)
				.then((res) => { 
					this.props.addFlashMessage({
						type: 'success',
						text: `Welcome ${ res.data.username} ! You have successfully Registered and Logged In.`
					});
					this.context.router.history.push('/todos'); 
				}, 
				(err) => {
					this.props.addFlashMessage({
						type: 'error',
						text: `WARNING! Something went wrong.  Please try again:   ${ err }.`
					});
					this.setState({ 
						errors: err.response.data, 
						isLoading: false 
					});
				});
		}
	}

	render() {
    
		const { errors } = this.state;

		return (

			<Grid 
				id = 'registerForm'
				className = 'boxClr paper' 
				onSubmit = { this.onSubmit } 
			>
				<Title className = 'engr under ctr'> 
					 <h2> Registration </h2>
				</Title>

				<User 
					errors = { errors.username }
					label = 'Username' 
					name = 'username'
					onChange = { this.onChange }
					placeholder = 'Enter a username'
					type = 'text'
					value = { this.state.username }
				/>

				<Email 
					errors = { errors.email }
					label = 'Email' 
					name = 'email'
					onChange = { this.onChange }
					placeholder = 'Enter your email address'
					type = 'email'
					value = { this.state.email }
				/>
				<EmailConf 
					errors = { errors.emailConfirm }
					name = 'emailConfirm'
					placeholder = 'Confirm your email address'
					onChange = { this.onChange }
					type = 'email'
					value = { this.state.emailConfirm }
				/>

				<Pword 
					errors = { errors.password }
					label = 'Password' 
					name = 'password'
					onChange = { this.onChange }
					placeholder = 'Enter your password'
					type = 'password'
					value = { this.state.password }
				/>

				<PwordConf 
					errors = { errors.passwordConfirm }
					name = 'passwordConfirm'
					placeholder = 'Confirm your password'
					onChange = { this.onChange }
					type = 'password'
					value = { this.state.passwordConfirm } 
				/>

				<Submit 
					className = 'ctr'
					area = 'submit'
					type = 'submit' 
					name = 'Register' 
					disable = { this.state.isLoading.toString()} 
				/>

			</Grid>
		);
	}
}

RegisterForm.propTypes = {
	userSignupRequest: PropTypes.func.isRequired,
	addFlashMessage: PropTypes.func.isRequired
};

RegisterForm.defaultProps = {
	userSignupRequest: f => f,
	addFlashMessage: f => f
};

RegisterForm.contextTypes = {
	router: PropTypes.object.isRequired
};

export default RegisterForm;