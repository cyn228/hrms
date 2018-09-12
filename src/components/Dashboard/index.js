import React, { Component } from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Col, Nav, NavItem } from 'react-bootstrap';
import UserStore from '@stores/User.store';
import Notification from './Notification';
import TopNavBar from './TopNavBar';
import TABS from './tabs';
import { observer, computed } from 'mobx-react';
import './styles.css';

import AuthStore from '@stores/Auth.store';

@observer class Dashboard extends Component {

  constructor(props) {
    super(props);
    const activeTab = UserStore.type || 'employee';
    this.state = {
      currUrl: `${this.props.match.url}/${TABS[activeTab][0].path}`
    };
  }

  handleTabSelect = (selectedTab) => {
    this.setState({ currUrl: selectedTab });
  }


  render() {
    const currUrl = this.props.match.url;
    const activeTab = UserStore.type;
    if (!AuthStore.updateLoggedIn()) {
      return <Redirect to={{ pathname: '/login' }} />;
    }

    if(!activeTab){
      return(
        <div>
        </div>
      );
    }

    return (
      <div className="container-fluid">
        <Notification />
        <TopNavBar />
        <Row className="content">
          <Col sm={2} className="sidebar">
            <Nav bsStyle="pills" stacked activeKey={this.state.currUrl} onSelect={this.handleTabSelect}>
              { TABS[activeTab].map((tab) => (
                <LinkContainer to={`${currUrl}/${tab.path}`} key={`Tab-Link-${tab.name}`}>
                  <NavItem eventKey={`${currUrl}/${tab.path}`} key={`Tab-${tab.name}`}>
                    {tab.name}
                  </NavItem>
                </LinkContainer>
              )) }
            </Nav>
          </Col>
          <Col sm={10} className="currentView">
            <Route exact path={`${currUrl}`} component={() => (<Redirect to={{ pathname: `${currUrl}/${TABS[activeTab][0].path}` }} />)} />
            { TABS[activeTab].map((tab) => (
              <Route key={`Route-${tab.name}`} path={`${currUrl}/${tab.path}`} component={tab.component} />
            )) }
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
