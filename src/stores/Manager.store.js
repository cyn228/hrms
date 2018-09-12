import { observable, action } from 'mobx';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
import Config from '@config';

class Manager {
  @observable allemployees;

  constructor(id) {
    this.allemployees = {};
  }

  @action getAllEmployees() {
    axios.get(`${Config.SERVER_URL}/api/employee`)
    .then((data) => {
      _.forEach(data.data, (employeedata) =>{
        this.allemployees[employeedata.username] = employeedata;
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }
}

const ManagerStore = new Manager();
export default ManagerStore;
