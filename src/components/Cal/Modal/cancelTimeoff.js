import React, { Component } from 'react';
import CalendarStore from '@stores/Calendar.store';
import moment from 'moment';
import './modalBase.css';

class cancelTimeoffPage extends Component {

	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		const date = moment(this.props.timeChosen.start).format('YYYY-MM-DD');
		CalendarStore.cancelTimeoff(date);
		this.props.onHide();
	}

	render() {
		return (
			<div className="timeoffPage">
				<label>
					 {'Are you sure you want to cancel the time off for this date? ' + moment(this.props.timeChosen.start).format('YYYY-MM-DD')}
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

export default cancelTimeoffPage;