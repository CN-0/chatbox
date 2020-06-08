import React, { useState } from 'react'
import RightMenu from './RightMenu'
import { Drawer, Button } from 'antd'
import {Link} from 'react-router-dom'
import '../../css/Navbar.css'

const Navbar = () => {
  const [state, setState] = useState({visible: false})
  const showDrawer = () => {
    setState({
      visible: true,
    });
  }
  const onClose = () => {
    setState({
      visible: false,
    });
  }

  return (
    <nav className="menuBar">
      <div className="logo">
        <Link to="/">Chatbox</Link>
      </div>
      <div className="menuCon">
        <div className="rightMenu">
            <RightMenu />
        </div>
        <Button className="barsMenu" type="primary" onClick={showDrawer}>
          <span className="barsBtn"></span>
        </Button>
        <Drawer
          title="Chatbox"
          placement="right"
          closable={false}
          onClose={onClose}
          visible={state.visible}
        >
          <RightMenu />
        </Drawer>
      </div>
    </nav>)
  }

export default Navbar