import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { PageHeader } from 'react-bootstrap';
import AuthStore from '@stores/Auth.store';
import { observer } from 'mobx-react';
import './login.css';

@observer class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
  	this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
  	this.setState({password: event.target.value});
  }

  handleSubmit(event) {
  	event.preventDefault();
  	AuthStore.logIn(this.state.username, this.state.password);
  }

  render() {
    return (
      	<form className="loginForm" onSubmit={this.handleSubmit}>
      		<div className="username">
      			<label>
		    		  Username:
		    		  <input type="text" className="usernameField" value={this.state.username} onChange={this.handleUsernameChange} />
		  		</label>
      		</div>
      		<div className="password">
      			<label>
		    		  Password:
		    		  <input type="password" className="passwordField" value={this.state.password} onChange={this.handlePasswordChange} />
		  		</label>
      		</div>
		  	<div className="loginBtn">
		  		<input type="submit" value="Log In" className="loginButton" />
		  	</div>
		  	{AuthStore.logInFail && 
				<label className='loginError'>Login failed</label>
			}
		</form>
    );
  }
}

export default Login;

