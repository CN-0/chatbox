import React from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Input, Button,Checkbox } from 'antd';
import { LockOutlined,MailOutlined } from '@ant-design/icons'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const Login = props => {

  const onFinish = values => {
    props.trylogin({
      email:values.email,
      password:values.password
    })
  };
  if (props.isAuthenticated) {
    return <Redirect to='/home' />
  }
  
  return (
  <div style={{width:"400px",margin:"auto",textAlign:"center"}}>
      <h1>Login to Chatbox</h1>
      <Form
      name="login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your Email!',
          },
        ]}
      >
        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox style={{float:"left"}}>Remember me</Checkbox>
        </Form.Item>

        <Link className="login-form-forgot" style={{float:"right"}} to="/login">
          Forgot password
        </Link>
      </Form.Item>
      <Form.Item>
        <Button style={{width:"100%",marginBottom:"7px"}} type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <Link to='/register'>register now!</Link>
      </Form.Item>
    </Form>
  </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    trylogin: (loginData) => dispatch(actions.login(loginData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)