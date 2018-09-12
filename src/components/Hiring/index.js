import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import DropdownButton from './DropdownButton';
import HiringPage from '@components/HiringPage';
import Table from './Table';
import Search from './Search';
import './hiring.css';

class HiringWrap extends Component {
  render() {
    const url = this.props.match.url;

    return (
      <div>
        <Route exact path={url} component={Hiring} />
        <Route path={`${url}/details`} component={HiringPage} />
      </div>
    );
  }
}

class Hiring extends Component {
  render() {
    return (
      <div className='hiringPage'>
        <div className="hiringBar">
          <h4>Filter:</h4>
          <DropdownButton />
          <Search />
        </div>
        <Table />
      </div>
    );
  }
}

export default HiringWrap;
