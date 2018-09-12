import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Chart from 'react-chartjs';
import { Row, Col, Nav, NavItem, Table } from 'react-bootstrap';
import './resources.css';
import _ from 'lodash';
import ManagerStore from '@stores/Manager.store';
import { ButtonToolbar, Button, ButtonGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class Resources extends Component {

  constructor(props){
    super(props);
    ManagerStore.getAllEmployees();
  }

  state = {
    dynambarData:{ //for every 5 employee, there should be one manager
    labels: ["Actual", "Needed"],
    datasets: [{
      label: "Employees",
       data: [15,0],
       fillColor: "rgba(116,219,196,0.5)"
     },
     {
       label: "Manager",
       data: [2,1],
       fillColor: "rgba(116,119,219,0.5)"
     }
    ]
  },
    linechartData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July','Aug'],
      datasets: [
        {
          label: 'New Hiring Proj',
          data: [12, 2, 2, 1, 5, 4, 8,11],
          fillColor: "rgba(0,10,220,0)",
          strokeColor: "rgba(116,119,219,0.4)",
        },{
          label: 'Terminate Proj',
          data: [-2, -2, 0, -3, -2, 0, 2,4],
          fillColor: "rgba(0,10,220,0)",
          strokeColor: "rgba(116,219,196,0.4)",
        },{
          label: 'Projected Needs Proj',
          data: [10, 3, 3, 1, 6, 3, 7,9],
          fillColor: "rgba(255,153,0,0)",
          strokeColor: "rgba(221,126,201,0.4)",
        },{
        label: 'New Hiring',
        data: [12, 2, 2, 1, 5, 4, 8,],
        fillColor: "rgba(0,10,220,0)",
        strokeColor: "rgba(116,119,219,1)",
      },{
        label: 'Terminate',
        data: [-2, -2, 0, -3, -2, 0, 2,],
        fillColor: "rgba(0,10,220,0)",
        strokeColor: "rgba(116,219,196,1)",
      },{
        label: 'Projected Needs',
        data: [10, 3, 3, 1, 6, 3, 7,],
        fillColor: "rgba(255,153,0,0)",
        strokeColor: "rgba(221,126,201,1)",
      }]
    },
    linesourceData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July'],
      datasets: [{
        label: 'Talent Network',
        data: [30, 28, 36, 38, 39, 45, 35],
        fillColor: "rgba(153,255,51,0)",
        strokeColor: "rgba(116,119,219,1)",
      },{
        label: 'Referral',
        data: [5, 9, 6, 8, 9, 5, 5],
        fillColor: "rgba(0,10,220,0)",
        strokeColor: "rgba(116,219,196,1)",
      },{
        label: 'Internal Career Site',
        data: [12, 19, 14, 15, 17, 9, 15],
        fillColor: "rgba(255,153,0,0)",
        strokeColor: "rgba(221,126,201,1)",
      },
      {
        label: 'External Job Board',
        data: [40, 47, 46, 43, 49, 54, 52],
        fillColor: "rgba(255,153,0,0)",
        strokeColor: "rgba(124,186,113,1)",
      }]
    }
  }
  render() {
    const newdata = this.state.dynambarData;
    let num_manager = 0;
    let num_employee = 0;


    _.forEach(ManagerStore.allemployees, (em, emuser) => {
        if(em.type == "employee"){
          num_employee = num_employee + 1;
        } else {
          num_manager = num_manager + 1;
        }
    });
    let needmana;
    needmana = ((num_employee -(num_employee % 5))/5) - num_manager;


    newdata.datasets[0].data = [num_employee, 0] ;
    newdata.datasets[1].data = [num_manager,needmana];

    return (
      <div className="container">
      <Row>
      <Col sm={8} className="Graph">
       <ButtonToolbar>
      <ButtonGroup>
          <Link to='/dashboard/performance/edit'>
            <Button bsStyle="primary">Resouce Planning</Button>
          </Link>
          <Link to='/dashboard/performance/edit2'>
            <Button bsStyle="primary">Payroll Analytics</Button>
          </Link>
          <Link to='/dashboard/performance/performanceE2'>
            <Button bsStyle="primary">Performance Tracking</Button>
          </Link>
      </ButtonGroup>
    </ButtonToolbar>
     </Col>
     <Col sm={2} className="Graph">
     <ButtonGroup>
         <Link to='/dashboard/performance'>
           <Button bsStyle="primary">Home Dashboard</Button>
         </Link>
    </ButtonGroup>
     </Col>
    </Row>

       <Row>
         <Col sm={6} className="Graph">
           <h3>Resource Planning </h3>
           <Chart.Line data={this.state.linechartData} width="500" height="250"/>
           <ul text-align="center">
           <li><span class="mylegend"></span><font color="#7477db"> New Hiring</font></li>
           <li><span class="mylegend"></span><font color="#74dbc4"> Terminate</font></li>
           <li><span class="mylegend"></span><font color="#dd7ec9"> Projected Needs</font></li>
           </ul>
         </Col>
         <Col sm={6} className="Table">
            <h3>Hiring Needed</h3>

            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th>Priority</th>
                  <th>Department</th>
                  <th>Position</th>
                  <th>#</th>
                  <th>Best Bets</th>
                </tr>
              </thead>
              <tbody>
              <LinkContainer to='/dashboard/performance/hiring'>
                <tr>
                  <td>1</td>
                  <td>HR</td>
                  <td>Project Manager</td>
                  <td>2</td>
                  <td>Talent Netowrk</td>
                </tr>
                </LinkContainer>
                <LinkContainer to='/dashboard/performance/hiring'>
                <tr>
                  <td>1</td>
                  <td>Sales</td>
                  <td>Data Analyst</td>
                  <td>2</td>
                  <td>Talent Netowrk</td>
                </tr>
                </LinkContainer>
                <LinkContainer to='/dashboard/performance/hiring'>
                <tr>
                  <td>2</td>
                  <td>Production</td>
                  <td>Line Worker</td>
                  <td>2</td>
                  <td>Internal Referral</td>
                </tr>
                </LinkContainer>
              </tbody>
            </Table>
         </Col>
      </Row>
      <Row>
         <Col sm={6} className="Graph">
           <h3>Recruting Dashboard - Resouce Trends </h3>
           <Chart.Line data={this.state.linesourceData} width="500" height="250" />
           <ul text-align="center">
               <li><span class="mylegend"></span><font color="#7477db"> Talent Network</font></li>
               <li><span class="mylegend"></span><font color="#74dbc4"> Referral</font></li>
               <li><span class="mylegend"></span><font color="#dd7ec9"> Internal Board</font></li>
               <li><span class="mylegend"></span><font color="#7cba71"> External Board</font></li>
           </ul>
         </Col>
         <Col sm={6} className="Graph">
           <h3>Current Month Resource Needs DYNAM</h3>
           <Chart.Bar data={this.state.dynambarData} width="500" height="250"/>
           <ul text-align="center">
           <li><span class="mylegend"></span><font color="#74dbc4"> Number of Employees</font></li>
           <li><span class="mylegend"></span><font color="#7477db"> Number of Managers</font></li>
           </ul>
         </Col>
       </Row>
       </div>
    );

  }

}

export default Resources;
