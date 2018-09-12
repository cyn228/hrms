import React, { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

class Search extends Component {
  render() {
    return (
    <form className='Search'>
      <FormGroup bsSize="small">
        <FormControl type="text" placeholder="Search" />
      </FormGroup>
    </form>
    );
  }
}

export default Search;
