import React from 'react';
import Authentication from '../services/Authentication';

const Logout = (props) => {
  Authentication.logout();
  props.history.push('/login');

  return (
    <div></div>
  );
}

export default Logout;