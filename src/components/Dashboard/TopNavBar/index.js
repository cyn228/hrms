import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import AuthStore from '@stores/Auth.store';

class TopNavBar extends Component {
  handleClickLogout(){
    AuthStore.logOut();
    window.location.reload();
  }


  render() {
    return (
      <Navbar fixedTop fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to="/">
              <a>HR SYSTEM</a>
            </LinkContainer>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavDropdown title="Options" id="options">
            <MenuItem>My Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem>Feedbacks</MenuItem>
            <MenuItem divider />
            <MenuItem onClick={this.handleClickLogout}>Logout</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}

export default TopNavBar;
