import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDom from 'react-dom';
import { Route } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';

import FlashMessageList from './components/messages/FlashMessageList';
import Home from './components/main/Home';
import LoginPage from './components/auth/LoginPage';
import { logout } from './actions/loginActions';
import MenuDrawer from './components/main/MenuDrawer';
import RegisterPage from './components/auth/RegisterPage';
import requireAuth from './helpers/requireAuth';
import TodoPage from './components/todos/TodoPage';

const propTypes = {
	authApi: PropTypes.instanceOf(Object).isRequired,
	classes: PropTypes.instanceOf(Object).isRequired,
	handleLogout: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
	handleLogout: () => { dispatch(logout()); },
});

const mapStateToProps = state => ({
	authApi: state.authApi,
});

function App(props) {
	const { authApi, handleLogout, classes } = props;
	const isAuth = authApi.isAuthenticated; // boolean val to pass down to children

	return (
		<div className={`grid ${classes.grid}`}>
			<CssBaseline />
			<MenuDrawer auth={isAuth} logout={handleLogout} />
			<div className={`messages ${classes.messages}`}>
				<FlashMessageList />
			</div>
			<div className={`main ${classes.main}`}>
				<Route exact path="/" render={() => <Home authorized={isAuth} />} />
				<Route path="/login" component={LoginPage} />
				<Route path="/register" component={RegisterPage} />
				<Route
					exact
					path="/todos"
					component={requireAuth(ReactDom.render = () => (<TodoPage />))}
				/>
			</div>
		</div>
	);
}

const styles = () => ({
	grid: {
		display: 'grid',
		fontFamily: 'arial',
		gridGap: '10px',
		gridTemplateAreas: `   
			" navBar " 
			" messages "  
			" main " 
		`,
		gridTemplateRows: 'auto',
		marginTop: '50px',
		padding: '0px 10px 0px 10px',
	},
	main: { gridArea: 'main' },
	messages: { gridArea: 'messages' },
});

App.propTypes = propTypes;
App.displayName = 'App';

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
