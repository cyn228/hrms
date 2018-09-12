import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, ButtonToolbar, Button, ButtonGroup} from 'react-bootstrap';
import {observer} from 'mobx-react';
import Chart  from 'react-chartjs';
import ManagerStore from '@stores/Manager.store';
import PayrollStore from '@stores/Payroll.store';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Resources from '@components/Resources';
import PayrollAnalytics from '@components/PayrollAnalytics';
import Hiring from '@components/Hiring';
import _ from 'lodash';
import './legend.css';
import payrollPage from '@components/Payroll';
import PerformanceE2 from '@components/PerformanceE2';

class PerformanceWrap extends Component {
  render() {
    const url = this.props.match.url;
    return (
      <div>
      <Route exact path={url} component={Performance} />
      <Route path={`${url}/edit`} component={Resources} />
      <Route path={`${url}/edit2`} component={PayrollAnalytics} />
      <Route path={`${url}/hiring`} component={Hiring} />
      <Route path={`${url}/payroll`} component={payrollPage} />
      <Route path={`${url}/performanceE2`} component={PerformanceE2} />
      </div>
    );
  }
}

var options = {
  labelScale: "yes",
}


@observer class Performance extends Component {
static displayName = 'Performance';

  constructor(props){
    super(props);
    ManagerStore.getAllEmployees();
    PayrollStore.getAllPayrolls();
  }


  state = {

    linechartData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July','Aug'],
      datasets: [{
        label: 'Very Satisfied Proj',
      data: [59,58,59,69,66,75,80,85],
        fillColor: "rgba(0,10,220,0)",
        strokeColor: "#afeabb",
        strokeDash: [5, 5],
      },{
        label: 'Satisfied Proj',
        data: [40,43,41,33,32,28,20,14],
        fillColor: "rgba(0,10,220,0)",
        strokeColor: "#cde1f7",
      },{
        label: 'To Improve Proj',
        data: [30,33,32,29,16,14,7,5],
        fillColor: "rgba(255,153,0,0)",
        strokeColor: "#f7ce91",
      },{
        label: 'Very Satisfied',
        data: [59,58,59,69,66,75,80,],
        fillColor: "rgba(0,10,220,0)",
        strokeColor: "#43a857",
      },{
        label: 'Satisfied',
        data: [40,43,41,33,32,28,20,],
        fillColor: "rgba(0,10,220,0)",
        strokeColor: "#71a5dd",
      },{
        label: 'To Improve',
        data: [30,33,32,29,16,14,7,],
        fillColor: "rgba(255,153,0,0)",
        strokeColor: "#f2b04d",
      }]
    },

    donutData1: [
      {
        value: 80,
        color:"#43a857",
        highlight: "#43a857",
        label: "Very Satisfied"
      },
      {
        value: 30,
        color: "#71a5dd",
        highlight: "#71a5dd",
        label: "Satisfied"
      },
      {
        value: 15,
        color: "#f2b04d",
        highlight: "#f2b04d",
        label: "Needs Improvement"
      }
    ],
     salesProgress:{
      labels: ["EmployeeName"],
      datasets: [{
        label: "Performance Score",
         data: [],
         fillColor: "rgba(0,10,220,0.5)"
       }]
    },
    donutData2: [
      {
        value: 40,
        color:"#43a857",
        highlight: "#43a858",
        label: "Very Satisfied"
      },
      {
        value: 60,
        color: "#71a5dd",
        highlight: "#71a5dd",
        label: "Satisfied"
      },
      {
        value: 25,
        color: "#f2b04d",
        highlight: "#f2b04d",
        label: "Needs Improvement"
      }
    ],
    donutData3: [
      {
        value: 55,
        color:"#43a857",
        highlight: "#FF5A5E",
        label: "Very Satisfied"
      },
      {
        value: 43,
        color: "#71a5dd",
        highlight: "#71a5dd",
        label: "Satisfied"
      },
      {
        value: 35,
        color: "#f2b04d",
        highlight: "#f2b04d",
        label: "Needs Improvement"
      }
    ],
    donutoptions: {
      pieceLabel: {
        mode: 'label',
        arc: true,
        position: 'border'
      }
    }

  };
  componentDidMount() {
    const legend = this.refs.chart.getChart().generateLegend();
    this.setState({ legend });
  }

  render(){
    let trArray = [];
    var legend = this.state && this.state.legend || '';

    _.forEach(PayrollStore.allPayrolls, (payroll, id) => {
      const obj = {
          request_id: payroll.request_id,
          department: payroll.department,
          manager: payroll.manager,
          timeRequested: moment(payroll.timeRequested).format('YYYY-MM-DD'),
          startDate: moment(payroll.startDate).format('YYYY-MM-DD'),
          endDate: moment(payroll.endDate).format('YYYY-MM-DD'),
          totalAmount: payroll.totalAmount,
          status: payroll.status
        };
        trArray.push(obj);
    });

    //for sales data for all employees(no managers)
    const salesData = this.state.salesProgress;
    let empName = [];
    let empScore = [];


    _.forEach(ManagerStore.allemployees, (em, emuser) => {
        if(em.type == "employee"){
           empName.push(em.firstName +' ' + em.lastName);
           empScore.push(em.performanceScore);
        } else {}
    });

    salesData.labels = empName;
    salesData.datasets[0].data = empScore;

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
    </Row>

      <h2>Welcome to HR Performance Dashboard!</h2>
      <Row>
      <Col sm={4} className="Graph">
        <h3>Employee Engagement </h3>
        <Chart.Doughnut ref="test" data={this.state.donutData1} width="400" height="250"/>
        <ul>
            <li><span class="mylegend"></span><font color="#43a857">Very Satisfied</font></li>
            <li><span class="mylegend"></span><font color="#71a5dd"> Satisfied </font></li>
            <li><span class="mylegend"></span><font color="#f2b04d">To Improve</font></li>
        </ul>
      </Col>
      <Col sm={4} className="Graph">
        <h3> Performance  Evaluations</h3>
        <Chart.Doughnut ref="chart" data={this.state.donutData2} options={this.state.donutoptions} width="400" height="250"/>
        <ul>
            <li><span class="mylegend"></span><font color="#43a857">Very Satisfied</font></li>
            <li><span class="mylegend"></span><font color="#71a5dd"> Satisfied </font></li>
            <li><span class="mylegend"></span><font color="#f2b04d">To Improve</font></li>
        </ul>
      </Col>
      <Col sm={4} className="Graph">
        <h3> Training Progress </h3>
        <Chart.Doughnut data={this.state.donutData3} options={this.state.donutoptions} width="400" height="250"/>
        <ul>
            <li><span class="mylegend"></span><font color="#43a857">Very Satisfied</font></li>
            <li><span class="mylegend"></span><font color="#71a5dd"> Satisfied </font></li>
            <li><span class="mylegend"></span><font color="#f2b04d">To Improve</font></li>
        </ul>
      </Col>
      </Row>
      <Row>
      <Col>
      <h3>Historic Employee Satisfaction</h3>
      <Chart.Line data={this.state.linechartData} width="500" height="250"/>
      <ul text-align="center">
        <li><span class="mylegend"></span><font color="#43a857">Very Satisfied</font></li>
        <li><span class="mylegend"></span><font color="#71a5dd"> Satisfied </font></li>
        <li><span class="mylegend"></span><font color="#f2b04d">To Improve</font></li>
        <li><span class="mylegend"></span>Future Projections</li>
      </ul>
      </Col>
      </Row>
      </div>
    );
  }
}

export default PerformanceWrap;
