import React, { Component } from 'react';
import ManagerStore from '@stores/Manager.store';
import UserStore from '@stores/User.store';
import PayrollStore from '@stores/Payroll.store';
import { Form, DropdownButton, MenuItem,Button } from 'react-bootstrap';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import _ from 'lodash';
import moment from 'moment';
import './payrollReq.css';
import 'react-dates/lib/css/_datepicker.css';

class payrollReq extends Component {
	constructor(props) {
		super(props);

		let startDate = moment();
		startDate.subtract(14, 'days');
		this.state = {
			department: 'Production',
			startDate: startDate,
			endDate: moment(),
			totalAmount: this.calculateAmount(startDate, moment(), 'Production'),
			focusedInput: null
		};

		this.deptDropdown = {
	      1: 'Production',
	      2: 'Marketing',
	      3: 'Finance',
	      4: 'HR'
	    };

		this.onDeptChange = this.onDeptChange.bind(this);
		this.onChangeDate = this.onChangeDate.bind(this);
		this.onFocusChange = this.onFocusChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	calculateAmount(startDate, endDate, department) {
		let defaultAmount = 0;
		_.forEach(ManagerStore.allemployees, (employee, username) => {
			if (employee.department === department) {
				let today = moment(endDate);
				while (today.isAfter(startDate)) {
					if (employee.timeSheet[today.format('YYYY-MM-DD')]) {
						defaultAmount += employee.salary * employee.timeSheet[today.format('YYYY-MM-DD')];
					}
					today.subtract(1, 'days');
				}
			}
		});
		return defaultAmount;
	}

	onChangeDate(date) {
		const newTotal = this.calculateAmount(date.startDate, date.endDate, this.state.department);
		this.setState({startDate: date.startDate, endDate: date.endDate, totalAmount: newTotal});
	}

	onDeptChange(event) {
		const newTotal = this.calculateAmount(this.state.startDate, this.state.endDate, this.deptDropdown[event]);
	    this.setState({department: this.deptDropdown[event], totalAmount: newTotal});
	}

	onFocusChange(focusedInput) {
		this.setState({focusedInput: focusedInput});
	}

	handleSubmit(event) {
		event.preventDefault();
		PayrollStore.postPayroll(this.state.department, 
			this.state.startDate, this.state.endDate, this.state.totalAmount);
		this.props.close();
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<label className='payrollLabel'>
						Department: 
						<div className='deptDropdown'>
							<DropdownButton bsStyle='Default' title={this.state.department} onSelect={this.onDeptChange} >
		                      <MenuItem eventKey='1'>{this.deptDropdown[1]}</MenuItem>
		                      <MenuItem eventKey='2'>{this.deptDropdown[2]}</MenuItem>
		                      <MenuItem eventKey='3'>{this.deptDropdown[3]}</MenuItem>
		                      <MenuItem eventKey='4'>{this.deptDropdown[4]}</MenuItem>
		                    </DropdownButton>
	                    </div>
					</label>
					
                    <label className='payrollLabel'>
                    	Total amount:   
                    	{this.state.totalAmount}
                    </label>

                    <div className='dateContainer'>
	                    <label className='payrollLabel'>
	                    	Time range:
	                    </label>
	                	<div className='payrollDate'>
	                		<DateRangePicker
	                			startDate={this.state.startDate}
	                			endDate={this.state.endDate}
	                			onDatesChange={this.onChangeDate}
	                			focusedInput={this.state.focusedInput}
	                			onFocusChange={this.onFocusChange}
	                			isOutsideRange={() => false}
	                		/>
	                	</div>
                	</div>

                	<div className="payrollSubmitBtnContainer">
				  		<input type="submit" value="Submit" className="payrollSubmitBtn" />
				  	</div>
                    
				</form>
			</div>
		);
	}
}

export default payrollReq;