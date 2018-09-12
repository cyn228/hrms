import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';
import './index.css';

class Header extends Component {
  render() {
    return (
      <div className='system-header'>
        <PageHeader>HR System</PageHeader>
      </div>
    );
  }
}

export default Header;
