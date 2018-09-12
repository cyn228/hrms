import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import TimeoffPage from './timeoff';
import CancelTimeoffPage from './cancelTimeoff';
import SpecialAvailPage from './specialAvail';
import CancelSpecialAvailPage from './cancelSpecialAvail';
import TimesheetPage from './timesheet';
import moment from 'moment';
import './modalBase.css';

class modalBase extends Component {

	constructor() {
		super();
		this.state = {
			activePage: ''
		};

		this.timeoffButton = this.timeoffButton.bind(this);
		this.cancelTimeoffButton = this.cancelTimeoffButton.bind(this);
		this.specialAvailButton = this.specialAvailButton.bind(this);
		this.cancelSpecialButton = this.cancelSpecialButton.bind(this);
		this.timesheetButton = this.timesheetButton.bind(this);
		this.onEnter = this.onEnter.bind(this);
	}



	timeoffButton() {
		this.setState({activePage: 'timeoff'});
	}

	cancelTimeoffButton() {
		this.setState({activePage: 'cancel timeoff'});
	}

	specialAvailButton() {
		this.setState({activePage: 'specialAvail'});
	}

	cancelSpecialButton() {
		this.setState({activePage: 'cancel special'});
	}

	timesheetButton() {
		this.setState({activePage: 'timehseet'});
	}

	onEnter() {
		this.setState({activePage: ''});
	}

	render() {
		let timeChosen = {};
		if (this.props.slotInfo.start) {
			timeChosen = {start: this.props.slotInfo.start,
						end: this.props.slotInfo.end};
		}
		else {
			timeChosen = {start: this.props.event.start,
						end: this.props.event.end};
		}

		return (
			<Modal
				{...this.props}
				onEnter={this.onEnter}
				autoFocus={true}
          		restoreFocus={true}
          		bsSize='large'
			>
				{
					this.state.activePage === '' && 
					<div>
						<label className="timeChosen">
							{this.props.slotInfo.start && 
								moment(this.props.slotInfo.start).format('YYYY-MM-DD')}
							{this.props.event.start &&
								moment(this.props.event.start).format('YYYY-MM-DD')}
						</label>
						{
							this.props.buttonList && this.props.buttonList.includes('timeoff') && 
							<button onClick={this.timeoffButton}>
								Request time off
							</button>
						}
						{
							this.props.buttonList && this.props.buttonList.includes('cancel timeoff') && 
							<button onClick={this.cancelTimeoffButton}>
								Cancel time off
							</button>
						}
						{
							this.props.buttonList && this.props.buttonList.includes('special') && 
							<button onClick={this.specialAvailButton}>
								Specify special availability
							</button>
						}
						{
							this.props.buttonList && this.props.buttonList.includes('cancel special') && 
							<button onClick={this.cancelSpecialButton}>
								Cancel special availability
							</button>
						}
						{
							this.props.buttonList && this.props.buttonList.includes('timesheet') && 
							<button onClick={this.timesheetButton}>
								Fill time sheet
							</button>
						}
					</div>
				}
				{
					this.state.activePage === 'timeoff' &&
					<TimeoffPage
						timeChosen={timeChosen}
						onEnter={this.onEnter}
						onHide={this.props.onHide}
					/>
				}
				{
					this.state.activePage === 'cancel timeoff' &&
					<CancelTimeoffPage
						timeChosen={timeChosen}
						onEnter={this.onEnter}
						onHide={this.props.onHide}
					/>
				}
				{
					this.state.activePage === 'specialAvail' &&
					<SpecialAvailPage 
						timeChosen={timeChosen}
						onEnter={this.onEnter}
						onHide={this.props.onHide}
					/>
				}
				{
					this.state.activePage === 'cancel special' &&
					<CancelSpecialAvailPage 
						timeChosen={timeChosen}
						onEnter={this.onEnter}
						onHide={this.props.onHide}
					/>
				}
				{
					this.state.activePage === 'timehseet' &&
					<TimesheetPage
						timeChosen={timeChosen}
						onEnter={this.onEnter}
						onHide={this.props.onHide}
					/>
				}
				
			</Modal>
		);
	}
}

export default modalBase;