import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ButtonToolbar, Button, Panel } from 'react-bootstrap';
import './hiringPage.css';


const title = (
  <h1>HR Manager</h1>
);

class HiringPage extends Component {
  render() {
    return (
      <div className='hiringDetail'>
        <ButtonToolbar>
          <Link to="/dashboard/hiring">
            <Button className='back'>&larr;</Button>
          </Link>
          <Button className='contact'>Contact</Button>
          <Button className='apply'>Apply</Button>
        </ButtonToolbar>
        <Panel className='hiringTitle' header={title}></Panel>
        <Panel className='hiringText'>
          You are passionate about optimizing team members and believe that people managers can transform an organization and it’s people. 
          You are a trusted coach and an expert in people development.  You are passionate about helping others develop and be the very best they can be. The opportunity to build and implement a leadership development and coaching program for at an innovative, fast-paced, global company is something that excites you!  This role reports directly to Kik’s Chief People Officer with frequent, ongoing interaction with the full executive team.
        </Panel>
      </div>
    );
  }
}

export default HiringPage;
