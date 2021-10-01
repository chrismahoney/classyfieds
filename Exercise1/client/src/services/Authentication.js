/**
 * services/Authentication.js
 * 
 * This class is meant to interact with localStorage and maintain
 * the authentication lifecycle required to interact with the backend
 * API. It provides functionality for the following:
 * - `login(credentials)`: Log a user in from React frontend
 * - `getUserInfo()`: Retrieve user information from browser local storage
 * - `getAuthHeader()`: Automatically provide the available token for logged in user
 *    for use in requests
 * - `logout()`: Remove localStorage information required for API interaction.
 * 
 * Example usage of this functionality can be seen in Listings.js and Listing.js page components.
 */
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
    return axios.post(BASE_URL + 'logout', {});
  }
}

export default new Authentication();