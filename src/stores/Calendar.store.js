import AuthStore from '@stores/Auth.store';
import { observable, action } from 'mobx';
import axios from 'axios';
import moment from 'moment';
import Config from '@config';

class Calendar {
  @observable username; // id of null means not saved/synced to DB
  @observable firstName;
  @observable lastName;
  @observable availability;
  @observable regularAvail;
  @observable timeSheet;

  constructor(id) {
    this.timeSheet = {};
    this.availability = [];
    this.regularAvail = {};
    this.year = moment().year();
    this.month = moment().month();
  }

  @action setYearAndMonth(year, month) {
    this.year = year;
    this.month = month;
  }

  @action submitTimeSheet(date, hour) {
    const obj = { date: date, hours: hour };
    axios.post(`${Config.SERVER_URL}/api/employee/timeSheet/username/` + AuthStore.username, obj)
    .then(() => {
      this.getYearAvailability(this.year, this.month);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  @action requestSpecialAvail(date, start, end) {
  	const obj = {date: date, time: {startTime: start, endTime: end}};
  	axios.post(`${Config.SERVER_URL}/api/employee/specialAvail/username/` + AuthStore.username, obj)
  	.then(() => {
  		this.getYearAvailability(this.year, this.month);
  	})
  	.catch((error) => {
  		console.log(error);
  	});
  }

  @action cancelSpecialAvail(date) {
  	axios.delete(`${Config.SERVER_URL}/api/employee/specialAvail/username/` + AuthStore.username + '/date/' + date)
  	.then(() => {
  		this.getYearAvailability(this.year, this.month);
  	})
  	.catch((error) => {
  		console.log(error);
  	});
  }

  @action requestTimeoff(date, start, end) {
  	const obj = {date: date, time: {startTime: start, endTime: end}};
  	axios.post(`${Config.SERVER_URL}/api/employee/timeoff/username/` + AuthStore.username, obj)
  	.then(() => {
  		this.getYearAvailability(this.year, this.month);
  	})
  	.catch((error) => {
  		console.log(error);
  	});
  }

  @action cancelTimeoff(date) {
  	axios.delete(`${Config.SERVER_URL}/api/employee/timeoff/username/` + AuthStore.username + '/date/' + date)
  	.then(() => {
  		this.getYearAvailability(this.year, this.month);
  	})
  	.catch((error) => {
  		console.log(error);
  	});
  }

  @action getRegularAvail() {
    axios.get(`${Config.SERVER_URL}/api/employee/availability/username/` + AuthStore.username)
    .then((data) => {
      this.regularAvail = data.data;
    })
    .catch((error) => {
      console.log(error);
    });
  }

  @action postRegularAvail(avail) {
    axios.post(`${Config.SERVER_URL}/api/employee/availability/username/` + AuthStore.username, avail)
    .then(() => {
      this.regularAvail = avail;
      this.getYearAvailability(this.year, this.month);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  @action getYearAvailability(year, month) {
    this.availability = [];
    let date = moment().year(year).month(month).date(1);
    date = date.subtract(1, 'months');
    let endDate = moment().year(year).month(month).date(1);
    endDate = endDate.add(2, 'months');
    
    while (date.month() !== endDate.month() || date.year() !== endDate.year()) {
      let year = date.year();
      let month = date.month();
      let day = date.date();
      axios.get(`${Config.SERVER_URL}/api/employee/availability/username/` + AuthStore.username + '/date/' + date.format('YYYY-MM-DD'))
      .then((data) => {
        //console.log(year, month, day);
        if (data.data.endTime !== '00:00') {
          let availabilityObj = {};
          availabilityObj.title = data.data.type;
          availabilityObj.start = new Date(year, month, day, 
                                            parseInt(data.data.startTime.substring(0, 2)), 
                                            parseInt(data.data.startTime.substring(3, 5)));
          availabilityObj.end = new Date(year, month, day, 
                                            parseInt(data.data.endTime.substring(0, 2)), 
                                            parseInt(data.data.endTime.substring(3, 5)));

          if (data.data.type === 'Timeoff') {
            availabilityObj.hexColor = 'ff0000'; // Red
          }
          else if (data.data.type === 'Special availability') {
            availabilityObj.hexColor = 'ffff00';
          }
          else {
            availabilityObj.hexColor = '008000'
          }
          this.availability.push(availabilityObj);
        } 
      })
      .catch((error) => {
        console.log(error);
      });
      axios.get(`${Config.SERVER_URL}/api/employee/timeSheet/username/` + AuthStore.username + '/date/' + date.format('YYYY-MM-DD'))
      .then((data) => {
        if (data.data !== '') {
          let timeSheetObj = {};
          timeSheetObj.title = data.data + ' hours reported';
          timeSheetObj.hexColor = '0000ff';
          timeSheetObj.start = new Date(year, month, day);
          timeSheetObj.end = new Date(year, month, day);
          this.availability.push(timeSheetObj);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      date = date.add(1, 'days');
    }
  }
}

const CalendarStore = new Calendar();
export default CalendarStore;
