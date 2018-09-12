import React, { Component } from 'react';
import AuthStore from '@stores/Auth.store';
import CalendarStore from '@stores/Calendar.store';
import TimeInput from 'time-input';

import { observer } from 'mobx-react';
import './regularAvail.css';

@observer class timeoffPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			activeTab: 'Monday',
			availability: CalendarStore.regularAvail
		};

		this.onStartTimeChangeHandler = this.onStartTimeChangeHandler.bind(this);
		this.onEndTimeChangeHandler = this.onEndTimeChangeHandler.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeTab = this.handleChangeTab.bind(this);
		this.reset = this.reset.bind(this);
	}

	onStartTimeChangeHandler(value) {
		let availability = this.state.availability;
		if (parseInt(value.substring(0,2)) >= 24) {
			value = '23' + value.substring(2, 5);
		}
		availability[this.state.activeTab].startTime = value;
		this.setState({availability: availability});
	}

	onEndTimeChangeHandler(value) {
		let availability = this.state.availability;
		if (parseInt(value.substring(0,2)) >= 24) {
			value = '23' + value.substring(2, 5);
		}
		availability[this.state.activeTab].endTime = value;
		this.setState({availability: availability});
	}

	handleSubmit(event) {
		event.preventDefault();
		CalendarStore.postRegularAvail(this.state.availability);
		this.props.close();
	}

	handleChangeTab(event) {
		this.setState({activeTab: event.target.value});
	}

	reset() {
		this.setState({
			activeTab: 'Monday',
			availability: CalendarStore.regularAvail
		});
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit} className="regularAvail">
				<div>
					<label>
						Choose the day you want to edit:
						<select value={this.state.activeTab} onChange={this.handleChangeTab}>
							<option value="Monday">Monday</option>
							<option value="Tuesday">Tuesday</option>
							<option value="Wednesday">Wednesday</option>
							<option value="Thursday">Thursday</option>
							<option value="Friday">Friday</option>
							<option value="Saturday">Saturday</option>
							<option value="Sunday">Sunday</option>
						</select>
					</label>
					<label>
						Start time:
						<TimeInput
				   			value={this.state.availability[this.state.activeTab].startTime}
				   			onChange={this.onStartTimeChangeHandler}
				   		/>
					</label>
					<label>
						End time:
						<TimeInput
				   			value={this.state.availability[this.state.activeTab].endTime}
				   			onChange={this.onEndTimeChangeHandler}
				   		/>
					</label>
				</div>
				<input type="submit" value="Submit" />
				<button onClick={this.reset}>
					Reset
				</button>
			</form>
		);
	}
}

export default timeoffPage;