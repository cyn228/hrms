import React, { Component } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import PayrollReqPage from './modal/payrollReq';
import PayrollStore from '@stores/Payroll.store';
import moment from 'moment';
import { observer } from 'mobx-react';
import _ from 'lodash';
import './payroll.css';

@observer class payrollPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modalShow: false
		};

		PayrollStore.getAllPayrolls();

		this.handleNewReq = this.handleNewReq.bind(this);
		this.hideModal = this.hideModal.bind(this);
	}

	handleNewReq() {
		this.setState({modalShow: true});
	}

	hideModal() {
		this.setState({modalShow: false});
	}

	render() {

		let trArray = [];
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
		return (
			<div>
				<Button className='newButton' onClick={this.handleNewReq}>New Payroll</Button>
				<Table bordered bsClass="payrollTable">
				    <thead>
				        <tr>
				          	<th>Request ID</th>
				          	<th>Department</th>
				        	<th>Manager</th>
				        	<th>Time Requested</th>
				        	<th>From</th>
				        	<th>To</th>
				        	<th>Total Amount</th>
				        	<th>Current Status</th>
				      	</tr>
				    </thead>
				    <tbody>
				      	{trArray.map(row => {
				        	return (
					            <tr>
					              <td>{row.request_id}</td>
					              <td>{row.department}</td>
					              <td>{row.manager}</td>
					              <td>{row.timeRequested}</td>
					              <td>{row.startDate}</td>
					              <td>{row.endDate}</td>
					              <td>{row.totalAmount}</td>
					              <td className={row.status}>{row.status}</td>
					            </tr>
				        	);
				        })}
				    </tbody>
				</Table>
				<Modal
					dialogClassName='newPayrollModal'
		            show={this.state.modalShow}
		            onHide={this.hideModal}
		        >
		            <PayrollReqPage
		              close={this.hideModal}
		            />
		        </Modal>
			</div>
		);
	}
}

export default payrollPage;
