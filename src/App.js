import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDom from 'react-dom';
import { Route } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';

import FlashMessageList from './components/messages/FlashMessageList';
import Home from './components/main/Home';
import LoginContainer from './components/auth/LoginContainer';
import { logout } from './actions/loginActions';
import NavBar from './components/main/NavBar';
// import RegisterPage from './components/auth/RegisterPage';
import RegistrationContainer from './components/auth/RegistrationContainer';
import requireAuth from './helpers/requireAuth';
import TodoContainer from './components/todos/TodoContainer';

const propTypes = {
	authApi: PropTypes.instanceOf(Object).isRequired,
	classes: PropTypes.instanceOf(Object).isRequired,
	logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	authApi: state.authApi,
});

function App(props) {
	// logout must be passed in through redux map-to-props
	const { authApi, classes, logout } = props;
	const isAuth = authApi.isAuthenticated;

	return (
		<div className={`grid ${classes.grid}`}>
			<CssBaseline />

			<NavBar isAuth={isAuth} logout={logout} />

			<div className={classes.messages}>
				<FlashMessageList />
			</div>

			<div className={classes.main}>
				<Route exact path="/" render={() => <Home authorized={isAuth} />} />
				<Route path="/login" component={LoginContainer} />
				<Route path="/register" component={RegistrationContainer} />
				<Route
					exact
					path="/todos"
					component={requireAuth(ReactDom.render = () => (<TodoContainer />))}
				/>
			</div>
		</div>
	);
}

const styles = theme => ({
	grid: {
		display: 'grid',
		fontFamily: theme.typography.fontFamily,
		gridGap: theme.spacing.unit,
		gridTemplateAreas: ` 
			"main" 
		`,
		marginTop: '50px',
		padding: '0px 10px 0px 10px',
	},

	main: {
		display: 'grid',
		gridArea: 'main',
		justifyContent: 'center',
		paddingTop: theme.spacing.unit * 5,
	},

	messages: {
		display: 'inline-grid',
		fontFamily: theme.typography.fontFamily,
		left: theme.spacing.unit,
		marginTop: theme.spacing.unit * 3,
		position: 'fixed',
		top: theme.spacing.unit * 6,
		zIndex: theme.zIndex.tooltip,
	},
});

App.propTypes = propTypes;

export default connect(mapStateToProps, { logout })(withStyles(styles)(App));
