import React from 'react'
import { Menu } from 'antd'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'

const RightMenu = props => {
    let content = (
      <Menu mode="horizontal">
        <Menu.Item key="login">
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item key="register">
          <Link to="/register">Register</Link>
        </Menu.Item>
      </Menu>
    )
    if(props.isAuthenticated){
      content = (
        <Menu mode="horizontal">
        <Menu.Item key="logout">
        <Link to="/logout">Logout</Link>
        </Menu.Item>
      </Menu>
      )
    }
    return (<div>
      {content}
    </div>
      
    )
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
}

export default connect(mapStateToProps)(RightMenu)
