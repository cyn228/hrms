import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Row, Col, Nav, NavItem } from 'react-bootstrap';
import Login from './Login';
import Signup from './Signup';
import AuthStore from '@stores/Auth.store';
import { observer } from 'mobx-react';
import './index.css';

@observer class Auth extends Component {
  handleTabSelect = (selectedTab) => {
    AuthStore.setTab(selectedTab);
  };

  renderForm = () => {
    if (AuthStore.activeTab === 'signup') return <Signup/>;
    return <Login/>;
  };

  render() {
    if (AuthStore.isLoggedIn) {
      return <Redirect to={{ pathname: '/' }} />;
    }

    return (
      <div className='container-fluid authContainer'>
        <Grid>
          <Row>
            <Nav className="authNavbar" bsStyle="tabs" activeKey={AuthStore.activeTab} onSelect={this.handleTabSelect}>
              <NavItem className="authNavItem" eventKey={'login'} href="login">Login</NavItem>
              <NavItem className="authNavItem" eventKey={'signup'} href="signup">Signup</NavItem>
            </Nav>
          </Row>
          <Row>
            <Col>{ this.renderForm() }</Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Auth;
