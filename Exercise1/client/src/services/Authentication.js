import axios from 'axios';

const BASE_URL = 'http://localhost:5000/auth/';

class Authentication {
  login(credentials) {
    return axios.post(BASE_URL + 'login', credentials);
  }

  getUserInfo() {
    return JSON.parse(localStorage.getItem("userInfo"));
  }

  getAuthHeader() {
    return { "x-access-token": this.getUserInfo().token }
  }

  logout() {
    localStorage.removeItem("userInfo");
    return axios.post(BASE_URL + 'logout', {}, this.getAuthHeader());
  }
}

export default new Authentication();