import React, { Component } from 'react';
import { DropdownButton } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';

class DDButton extends Component {
  render() {
    return (
      <div>
      <ButtonToolbar className="btbar">
        <DropdownButton bsSize="small" title="Department" id="department-dropdown">
          <MenuItem eventKey="1">Production</MenuItem>
          <MenuItem eventKey="2">Administration</MenuItem>
          <MenuItem eventKey="3">Sales & Marketing</MenuItem>
        </DropdownButton>
        
        <DropdownButton bsSize="small" title="Time" id="department-dropdown">
          <MenuItem eventKey="1">Recent 3 days</MenuItem>
          <MenuItem eventKey="2">Recent 1 month</MenuItem>
          <MenuItem eventKey="3">Recent 3 months</MenuItem>
          <MenuItem eventKey="3">Recent 1 year</MenuItem>
          <MenuItem eventKey="4">More than 1 year</MenuItem>
        </DropdownButton>

        <DropdownButton bsSize="small" title="Salary" id="department-dropdown">
          <MenuItem eventKey="1">$0-30000</MenuItem>
          <MenuItem eventKey="2">$30000-50000</MenuItem>
          <MenuItem eventKey="3">$50000-80000</MenuItem>
          <MenuItem eventKey="3">$80000-100000</MenuItem>
          <MenuItem eventKey="4">More than $100000</MenuItem>
          <MenuItem eventKey="5">Negotiable</MenuItem>
        </DropdownButton>

        <DropdownButton bsSize="small" title="Full Time" id="department-dropdown">
          <MenuItem eventKey="1">Part Time</MenuItem>
        </DropdownButton>
      </ButtonToolbar>
      </div>
    );
  }
}

export default DDButton;
