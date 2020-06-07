import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

const Logout = props => {
  useEffect(() => {
    props.trylogout(props.userToken);
  }, [props]);
  return <Redirect to="/" />;
};


const mapStateToProps = state => {
  return {
    userToken: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    trylogout: (token) => dispatch(actions.logout(token))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Logout);
