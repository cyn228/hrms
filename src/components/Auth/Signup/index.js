import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthStore from '@stores/Auth.store';
import { observer } from 'mobx-react';
import './signup.css';

@observer class Signup extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      username: '',
	      password: '',
	      confirmPassword: '',
	      type: 'employee'
		};

	    this.handleUsernameChange = this.handleUsernameChange.bind(this);
	    this.handlePasswordChange = this.handlePasswordChange.bind(this);
	    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.handleOptionChange = this.handleOptionChange.bind(this);
	}

	handleUsernameChange(event) {
	  	this.setState({username: event.target.value});
	}

	handlePasswordChange(event) {
	 	this.setState({password: event.target.value});
 	}

 	handleConfirmPasswordChange(event) {
 		this.setState({confirmPassword: event.target.value});
 	}

 	handleOptionChange(event) {
 		this.setState({type: event.target.value});
 	}

	handleSubmit(event) {
		event.preventDefault();
		if (this.state.password === this.state.confirmPassword) {
			AuthStore.signUp(this.state.username, this.state.password, this.state.type);
		}
	}

  	render() {
    	return (
	      	<form className="signupForm" onSubmit={this.handleSubmit}>
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
	      		<div className="confirmPassword">
	      			<label>
			    		Confirm Password:
			    		<input type="password" className="passwordField" value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange} />
			  		</label>
	      		</div>
	      		<div className="radioGroup">
	      			<label className="radioBtn">
			            <input type="radio" value="employee" 
			            	checked={this.state.type === 'employee'}
			            	onChange={this.handleOptionChange}
			             />
			            Employee
			         </label>
			         <label className="radioBtn">
			            <input type="radio" value="manager" 
			            	checked={this.state.type === 'manager'} 
			            	onChange={this.handleOptionChange}
			            />
			            Manager
			         </label>
	      		</div>
			  	<div className="loginBtn">
			  		<input type="submit" value="Sign up" className="loginButton" />
			  	</div>
			  	{(this.state.password !== this.state.confirmPassword && 
					<label className='signupError'>Both password need to be the same.</label>) ||
			  	 (AuthStore.signupError && 
					<label className='signupError'>{AuthStore.signupError}</label>)
				}
			</form>
	    );
  	}
}

export default Signup;
