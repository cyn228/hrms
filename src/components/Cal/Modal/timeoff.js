import React, { Component } from 'react';
import CalendarStore from '@stores/Calendar.store';
import moment from 'moment';
import './modalBase.css';

class timeoffPage extends Component {

	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		const date = moment(this.props.timeChosen.start).format('YYYY-MM-DD');
		const startTime = moment(this.props.timeChosen.start).format('HH:mm');
		const endTime = moment(this.props.timeChosen.end).format('HH:mm');
		CalendarStore.requestTimeoff(date, startTime, endTime);
		this.props.onHide();
	}

	render() {
		return (
			<div className="timeoffPage">
				<label>
					 {'Are you sure you want to request time off for this date? ' + moment(this.props.timeChosen.start).format('YYYY-MM-DD')}
				</label>
				<button onClick={this.onClick}>
					Yes
				</button>
				<button onClick={this.props.onEnter}>
					No
				</button>
			</div>
		);
	}
}

export default timeoffPage;