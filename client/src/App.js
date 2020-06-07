import React,{Suspense,useEffect} from 'react'
import {Route, Switch,Redirect} from "react-router-dom"
import { connect } from 'react-redux'
import LandingPage from './components/LandingPage'
import Login from './components/auth/login'
import Register from './components/auth/register'
import Home from './components/home'
import NavBar from './components/NavBar/NavBar'
import Logout from './components/auth/logout'
import * as actions from './store/actions/index'
import './css/App.css'

const App = props => {
  useEffect(() => {
    props.onTryAutoSignup()
  }, [props])

  let routes = (
    <Switch>
      <Route exact path="/register" component={Register } />
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={LandingPage} />
      <Redirect to="/" />
    </Switch>
  );
  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/home" component={Home} />
        <Redirect to="/home" />
      </Switch>
    );
  }
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{minHeight: 'calc(100vh - 80px)' }}>
        {routes}
      </div>
    </Suspense>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(App)
