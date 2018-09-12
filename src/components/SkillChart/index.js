import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Chart from 'react-chartjs';
import { Row, Col, Nav, NavItem } from 'react-bootstrap';

class SkillChart extends Component {
  static displayName = 'SkillChart';

  state = {
    chartData1: {
    labels: ['Java', 'C++', 'PHP', 'C#', 'HTML', 'JavaScript', 'Python','More'],
    datasets: [{
        label: 'ComputerSkills',
        data: [12,19,3,17,6,3,7,5],
        fillColor: "rgba(153,255,51,0.6)"
    }]
},

chartData2: {
    labels: ['English', 'French', 'Spanish', 'Chinese', 'Japanese', 'Korean', 'Russian','More'],
    datasets: [{
        label: 'LangaugeSkills',
        data: [20,18,3,17,6,6,2,7],
        fillColor: "rgba(255,153,0,0.6)"
    }]
},

chartData3: {
    labels: ['High School', 'Bachelor', 'Master', 'Doctor', 'More'],
    datasets: [{
        label: 'Degrees',
        data: [2,10,23,5,0],
        fillColor: "rgba(255,255,51,0.6)"
    }]
},

chartData4: {
    labels: ['Computer Science', 'Accounting', 'Arts', 'Science', 'Economics', 'Physics', 'Biology','More'],
    datasets: [{
        label: 'Majors',
        data: [20,10,5,5,10,2,7],
        fillColor: "rgba(215,40,51,0.6)"
    }]
}

  };

  render() {
    return (
       <div class='container-fluid'>
           <Row>
           <Col sm={6} className="Graph">
             <h3>Current Month Resource Needs</h3>
             <Chart.Bar data={this.state.chartData1} width="500" height="250"/>
           </Col>
           <Col sm={6} className="Graph">
             <h3>Current Month Resource Needs</h3>
             <Chart.Bar data={this.state.chartData2} width="500" height="250"/>
           </Col>
           </Row>

           <Row>
           <Col sm={6} className="Graph">
             <h3>Current Month Resource Needs</h3>
             <Chart.Bar data={this.state.chartData3} width="500" height="250"/>
           </Col>
           <Col sm={6} className="Graph">
             <h3>Current Month Resource Needs</h3>
             <Chart.Bar data={this.state.chartData4} width="500" height="250"/>
           </Col>
           </Row>
       </div>
    );

  }

}

export default SkillChart;
