import React, { Component } from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';
import CalendarStore from '@stores/Calendar.store';
import './modalBase.css';

class timesheetPage extends Component {

	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
		this.onChangeHandler = this.onChangeHandler.bind(this);

		const date = moment(this.props.timeChosen.start).format('YYYY-MM-DD');
		this.state = {
			hours: CalendarStore.timeSheet[this.props.date]
		};
	}

	onChangeHandler(event) {
		let newHour = parseInt(event.target.value);
		if (Number.isInteger(newHour) && event.target.value >= 0 && event.target.value <= 24) {
			this.setState({hours: event.target.value});
		}
	}

	onClick() {
		const date = moment(this.props.timeChosen.start).format('YYYY-MM-DD');
		CalendarStore.submitTimeSheet(date, this.state.hours);
		this.props.onHide();
	}

	render() {
		return (
			<div className="timeoffPage">
				<label>
					 {'Filling timesheet on ' + moment(this.props.timeChosen.start).format('YYYY-MM-DD')}
				</label>
				<label>
					Hours worked:
					<input
						type='number'
			   			value={this.state.hours}
			   			onChange={this.onChangeHandler}
			   		/>
				</label>
				<button onClick={this.onClick}>
					Submit
				</button>
				<button onClick={this.props.onEnter}>
					Cancel
				</button>
			</div>
		);
	}
}

export default timesheetPage;