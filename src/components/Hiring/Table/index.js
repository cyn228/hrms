import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table } from 'react-bootstrap';

class HiringTable extends Component {
  render() {
    const trArray = [
      {
        title: 'HR Manager',
        decription:'need experenced manager',
        manager: 'Otto',
        timePosted: '04/15/2017'
      },
      {
        title: 'Engineer',
        decription:'An engineer with more than 3 years experience',
        manager: 'Bock',
        timePosted: '04/13/2017'
      },
      {
        title: 'Sales',
        decription:'Selling product',
        manager: 'Kebe',
        timePosted: '03/11/2017'
      },
      {
        title: 'Technician Manager',
        decription:'experienced techician manager',
        manager: 'Bob',
        timePosted: '01/11/2017'
      },
      {
        title: 'Mechanic Technician',
        decription:'Part time mechanic technician',
        manager: 'Pe',
        timePosted: '03/3/2017'
      },
      {
        title: 'Warehouse Manager',
        decription:'Full time manager',
        manager: 'Ana',
        timePosted: '09/13/2016'
      },
      {
        title: 'Customer Service',
        decription:'Part time customer support',
        manager: 'Nvidie',
        timePosted: '03/1/2017'
      },
      {
        title: 'Factory Supervisor',
        decription:'Experienced supervisor needed',
        manager: 'Nvidie',
        timePosted: '03/1/2017'
      },
      {
        title: 'Manager, Production Planning',
        decription:'Communicate with Corporate Supply Chain',
        manager: 'Dors',
        timePosted: '03/1/2017'
      },
      {
        title: 'Cleaner',
        decription:'Cleaners with Commercial cleaning experience',
        manager: 'Elsfew',
        timePosted: '02/9/2017'
      },
      {
        title: 'Testing Driver',
        decription:'Liscensed testing driver',
        manager: 'Peop',
        timePosted: '01/31/2017'
      },
      {
        title: 'Payroll Officer',
        decription:'Process pay raises, pay adjustments from present and prior pay periods',
        manager: 'Kwerw',
        timePosted: '01/31/2017'
      },
      {
        title: 'Payroll & HR Administrator',
        decription:'3+ years human resources, payroll and administrative experience.',
        manager: 'Popv',
        timePosted: '01/31/2017'
      },
      {
        title: 'Business Analyst',
        decription:'Progressive experience as a Business Analyst or equivalent experience',
        manager: 'Popv',
        timePosted: '01/31/2017'
      },
      {
        title: 'Security',
        decription:'Licensed Security Guards Needed',
        manager: 'Nanticoke',
        timePosted: '01/1/2017'
      },
      {
        title: 'Senior Project Manager',
        decription:'Prepare Statements of Work capturing project objectives',
        manager: 'Nanticoke',
        timePosted: '01/9/2017'
      },
    ];

    return (
      <Table bordered bsClass="hiringTable">
    <thead>
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Manager</th>
        <th>Time Posted</th>
      </tr>
    </thead>
    <tbody>
      {trArray.map(row => {
        return (
          <LinkContainer to='/dashboard/hiring/details'>
            <tr>
              <td>{row.title}</td>
              <td>{row.decription}</td>
              <td>{row.manager}</td>
              <td>{row.timePosted}</td>
            </tr>
          </LinkContainer>
        );
      })}
    </tbody>
  </Table>
    );
  }
}

export default HiringTable;
