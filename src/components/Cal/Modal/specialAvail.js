import React, { Component } from 'react';
import CalendarStore from '@stores/Calendar.store';
import moment from 'moment';
import TimeInput from 'time-input';
import './modalBase.css';

class SpecialAvailPage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			start: '00:00',
			end: '00:00'
		};

		this.onClick = this.onClick.bind(this);
		this.onStartTimeChangeHandler = this.onStartTimeChangeHandler.bind(this);
		this.onEndTimeChangeHandler = this.onEndTimeChangeHandler.bind(this);
	}

	onClick() {
		const date = moment(this.props.timeChosen.start).format('YYYY-MM-DD');
		const startTime = this.state.start;
		const endTime = this.state.end;
		CalendarStore.requestSpecialAvail(date, startTime, endTime);
		this.props.onHide();
	}

	onStartTimeChangeHandler(value) {
		if (parseInt(value.substring(0,2)) >= 24) {
			value = '23' + value.substring(2, 5);
		}
		this.setState({
			start: value
		});
	}

	onEndTimeChangeHandler(value) {
		if (parseInt(value.substring(0,2)) >= 24) {
			value = '23' + value.substring(2, 5);
		}
		this.setState({
			end: value
		});
	}

	render() {
		return (
			<div className="timeoffPage">
				<label>
					 {'Request special availability on ' + moment(this.props.timeChosen.start).format('YYYY-MM-DD')}
				</label>
				<label>
					Start time:
					<TimeInput
			   			value={this.state.start}
			   			onChange={this.onStartTimeChangeHandler}
			   		/>
				</label>
				<label>
					End time:
					<TimeInput
			   			value={this.state.end}
			   			onChange={this.onEndTimeChangeHandler}
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

export default SpecialAvailPage;