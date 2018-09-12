import { observable, action } from 'mobx';
import axios from 'axios';
import moment from 'moment';
import AuthStore from '@stores/Auth.store';
import ManagerStore from '@stores/Manager.store';
import Config from '@config';

class User {
  @observable firstName;
  @observable lastName;
  @observable type;
  @observable department;
  @observable major;

  constructor(id) {
    this.firstName = '';
    this.lastName = '';
    this.type = '';
    this.department = '';
    this.major = '';
  }

  @action logIn(username) {
    this.fetchFromDB(username);
  }

  @action updateProfile(obj) {
    let postObj = obj;
    postObj.username = AuthStore.username;
    axios.post(`${Config.SERVER_URL}/api/employee`, obj)
    .then((data) => {
      this.fetchFromDB(AuthStore.username);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  fetchFromDB = async (username) => {
    axios.get(`${Config.SERVER_URL}/api/employee/username/` + username)
    .then((data) => {
      this.firstName = data.data[0].firstName;
      this.lastName = data.data[0].lastName;
      this.type = data.data[0].type;
      this.department = data.data[0].department;
      this.major = data.data[0].major;
      if (this.type === 'manager') {
        ManagerStore.getAllEmployees();
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }
}

const UserStore = new User();
export default UserStore;
