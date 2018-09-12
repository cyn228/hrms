import styles from 'react-big-calendar/lib/css/react-big-calendar.css'
import React, { Component } from 'react';
import events from './events.js'
import { Redirect } from 'react-router-dom';
import { Grid, Row, Col, Nav, NavItem, ButtonGroup, Button, DropdownButton, MenuItem, Modal } from 'react-bootstrap';

import AuthStore from '@stores/Auth.store';
import BigCalendar from 'react-big-calendar';
import CalModal from './Modal/modalBase';
import RegularAvailPage from './Modal/regularAvail';
import moment from 'moment';
import CalendarStore from '@stores/Calendar.store';

import { observer } from 'mobx-react';

import 'react-big-calendar/lib/css/react-big-calendar.css'
let allViews = Object.keys(BigCalendar.views).map(k => BigCalendar.views[k])

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

@observer class Cal extends Component{
  constructor(props, context) {
    super(props, context);

    this.year = moment().year();
    this.month = moment().month();

    this.state = {
      selectable: true,
      modalIsOpen: false,
      slotInfo: {},
      buttonList: [],
      event: {},
      regularModalShow: false
      //activeTab: 'basic',
    };

    this.editEvent = this.editEvent.bind(this);
    this.selectSlot = this.selectSlot.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.editRegularAvail = this.editRegularAvail.bind(this);
  }

  componentWillMount() {
    AuthStore.updateLoggedIn();
    CalendarStore.getYearAvailability(this.year, this.month);
    CalendarStore.getRegularAvail();
  }

  editRegularAvail() {
    if (CalendarStore.regularAvail.Monday) {
      this.setState({regularModalShow: true});
    }
  }

  closeEditModal() {
    this.setState({regularModalShow: false});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
    this.setState({slotInfo: {}});
    this.setState({event: {}});
    this.setState({buttonList: []});
  }

  onChangeDate(date) {
    const dateObj = moment(date);
    //console.log(dateObj);
    if (dateObj.month() !== this.month) {
      this.year = dateObj.year();
      this.month = dateObj.month();
      CalendarStore.setYearAndMonth(this.year, this.month);
      CalendarStore.getYearAvailability(this.year, this.month);
    }
  }

  editEvent(event) {
    console.log(event);
    if (event.title === 'Timeoff') {
      this.setState({buttonList: ['cancel timeoff']});
    }
    else if (event.title === 'Special availability') {
      this.setState({buttonList: ['cancel special', 'timeoff', 'timesheet']});
    }
    else if (event.title === 'Regular availability') {
      this.setState({buttonList: ['special', 'timeoff', 'timesheet']});
    }

    this.setState({event: event,
                    modalIsOpen: true});
  }

  selectSlot(slotInfo) {
    if (slotInfo.slots.length === 1) {
      this.setState({buttonList: ['special']});
      this.setState({slotInfo: slotInfo});
      this.setState({modalIsOpen: true});
    }
  }

  eventStyleGetter(event, start, end, isSelected) {
    var backgroundColor = '#' + event.hexColor;
    var style = {
        backgroundColor: backgroundColor,
        borderRadius: '0px',
        opacity: 0.8,
        color: 'black',
        border: '0px',
        display: 'block'
    };
    return {
        style: style
    };
  }

  allDayAccessor(event) {
    return event.hexColor === '0000ff';
  }

  render() {
    if (!AuthStore.updateLoggedIn()) {
      return <Redirect to={{ pathname: '/login' }} />;
    }
    //console.log(CalendarStore.availability.slice().length);
    return (
      <div>
        <button onClick={this.editRegularAvail} disabled={!CalendarStore.regularAvail.Monday}>
          Edit regular availability
        </button>
        <Row>
          <BigCalendar
            {...this.props}
            selectable
            events={CalendarStore.availability.slice()}
            views={allViews}
            scrollToTime={new Date(1970, 1, 1, 6)}
            defaultDate={new Date()}
            onSelectEvent={this.editEvent} //add event here
            onSelectSlot={this.selectSlot}
            onNavigate={this.onChangeDate}
            style={{height: 700}}
            eventPropGetter={this.eventStyleGetter}
            allDayAccessor={this.allDayAccessor}
          />
        </Row>
        <Modal
          show={this.state.regularModalShow}
          onHide={this.closeEditModal}
        >
          <RegularAvailPage 
            close={this.closeEditModal}
          />
        </Modal>
        <CalModal 
          show={this.state.modalIsOpen}
          onHide={this.closeModal}
          slotInfo={this.state.slotInfo}
          buttonList={this.state.buttonList}
          event={this.state.event}
        />
      </div>
      );
    }
}




export default Cal;
