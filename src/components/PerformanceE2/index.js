import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, ButtonToolbar, Button, ButtonGroup, Table} from 'react-bootstrap';
import {observer} from 'mobx-react';
import Chart  from 'react-chartjs';
import ManagerStore from '@stores/Manager.store';
import PayrollStore from '@stores/Payroll.store';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Resources from '@components/Resources';
import _ from 'lodash';


var options = {
  labelScale: "yes",
}


@observer class PerformanceE2 extends Component {

    static displayName = 'PerformanceE2';

     constructor(props){
        super(props);
        ManagerStore.getAllEmployees();



    this.state = {
        salesProgress:{
            labels: ["Name"],
            datasets: [{
                labels: ["EmpolyeeName"],
                data: ["renee ren", "whatever ren"],
                fillColor: ["#43a857", "rgba(0,10,220,0.5)"]
            },{
               label: "EmpolyeeName",
                data: [],
                fillColor: "rgba(0,0,220,0.5)"
            }]
        },
            donutData2: [
      {
        value: 40,
        color:"#43a857",
        highlight: "#43a857",
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
    ]

    }
     }

    render(){
         //for sales data for all employees(no managers)
    const salesData = this.state.salesProgress;
    let empName = [];
    let empScore = [];
     // for donut graph of evaluation

    const evaluationData = this.state.donutData2;

    let satisfied = 0;
    let soso = 0;
    let improve = 0;

    // for a table of the bonus benefits for satisfied employees

    let semp = [];
    let totalScore = 0;
    let avgScore = 0;
    let empNum = 0;

    _.forEach(ManagerStore.allemployees, (em, emuser) => {
        if(em.type == "employee"){
          if (em.performanceScore > 0){
           totalScore = totalScore + em.performanceScore;
           empNum = empNum + 1;

           if(em.performanceScore < 6){
              improve = improve + 1;
          }else if(em.performanceScore >= 8){
              satisfied = satisfied + 1;
          }else{
              soso = soso + 1;
          }
        }
        } else {}
    });

    avgScore = (totalScore / empNum).toFixed(2);



    evaluationData[0].value = satisfied;
    evaluationData[1].value = soso;
    evaluationData[2].value = improve;

    empName.push("avg");
    empScore.push(avgScore);


    _.forEach(ManagerStore.allemployees, (em, emuser) => {
        if(em.type == "employee" && em.performanceScore > 0){

            let bonusScore = 0;
            bonusScore = em.performanceScore-avgScore;
            if(bonusScore > 0){
                empName.push(em.firstName +' ' + em.lastName);
                empScore.push(em.performanceScore);
                const obj = {
                    name: em.firstName + " " + em.lastName,
                    performanceScore: em.performanceScore,
                    rate: 22.5,
                    bonusBenefits: 22.5*bonusScore
                }
                semp.push(obj);

          }
        }
    });

    salesData.labels = empName;
    salesData.datasets[0].data = empScore;
    // and then map
    const myData = [].concat(semp)
        .sort((a, b) => a.performanceScore > b.performanceScore)
        .map((item, i) =>
            <div key={i}> {item.name} {item.performanceScore} {item.rate} {item.bonusBenefits}</div>
    );


    return(
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
           <Row>
               <Col sm={6} className="Graph">
        <h3>Satisfied Performance DYNAM</h3>
           <Chart.Bar data={this.state.salesProgress} options={options} width="400" height="250"/>
        </Col>
        <Col sm={6} className="Graph">
        <h3>Performance Evaluations </h3>
        <Chart.Doughnut ref="test" data={this.state.donutData2} width="400" height="250"/>
        <ul>
            <li><span class="mylegend"></span><font color="#43a857">Very Satisfied</font></li>
            <li><span class="mylegend"></span><font color="#71a5dd"> Satisfied </font></li>
            <li><span class="mylegend"></span><font color="#f2b04d">To Improve</font></li>
        </ul>
        </Col>
        </Row>
        <h3>Bonus Benefits Table</h3>
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>performanceScore</th>

                  <th>Bonus Rate($)</th>
                  <th>Actual Benefits Earned($)</th>

                </tr>
              </thead>
              <tbody>
                	{semp.map(row => {
				        	return (
					            <tr>
					              <td>{row.name}</td>
                                  <td>{row.performanceScore}</td>

					              <td>{row.rate}</td>
					              <td>{row.bonusBenefits.toFixed(2)}</td>
					            </tr>
				        	);
				        })}


              </tbody>
            </Table>

        </div>
    );
    }
}

export default PerformanceE2;
