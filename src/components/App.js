// vendor
import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import styled from 'styled-components';
// custom
import './material.css';
import requireAuth from '../helpers/requireAuth';
import {logout} from '../actions/loginActions';
import FlashMessageList from './messages/FlashMessageList';
import NavBar from './main/NavBar';
import Home from './main/Home';
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import TodoPage from './todos/TodoPage';
// CSS
const Grid =styled.div `
  display: grid;
  grid-template-areas:   
    " header " 
    " messages "  
    " main "  
  ;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  grid-template-rows: auto;
  font-family: arial;
  padding: 0px 10px 0px 10px;
`;

const Header =styled.div `
		grid-area: header;
		margin-bottom: 40px;
	`;
const Messages =styled.div `grid-area: messages;`;
const Main =styled.div `grid-area: main;`;

// Component
const App =(props) => {
  return (
    <Grid className='App' >

      <Header className='Header' >
        <NavBar
          authApi={ props.authApi }
          logout={ props.logout }
        />
      </Header>

      <Messages className='Messages'>
        <FlashMessageList/>
      </Messages>

      <Main className='Main'>
        <Route exact path='/' render={() =>
          <Home authorized={props.authApi.isAuthenticated} />}
        />
        <Route path='/login' component={ LoginPage } />
        <Route path='/register' component={ RegisterPage } />
        <Route
          exact path='/todos'
          component={ requireAuth(ReactDom.render=(props) =>
            <TodoPage className='TodoPage' />
          )}
        />
      </Main>
    </Grid>
  );
};

App.propTypes ={
  authApi: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};
const mapDispatchToProps =(dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};
const mapStateToProps =(state) => {
  return {
    authApi: state.authApi,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
