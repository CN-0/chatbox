import React from 'react';
import { Redirect } from 'react-router-dom'
import {Form,Input,Button} from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';


const Register = props => {
  const onFinish = values => {
    props.tryregister({
      email:values.email,
      username:values.username,
      password:values.password
    })    
  };
  if (props.isAuthenticated) {
    return <Redirect to='/home' />
  }
  return (<div style={{width:"400px",margin:"auto",textAlign:"center"}}>
      <h1>Register to Chatbox</h1>
    <Form
      name="register"
      onFinish={onFinish}
      scrollToFirstError
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
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
          {
            min:5,
            message:"minimum 5 characters are required"
          }
        ]}
        hasFeedback
      >
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
      </Form.Item>

      <Form.Item
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        < Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Confirm Password" />
      </Form.Item>
      <Form.Item>
        <Button style={{width:"100%",marginBottom:"7px"}} type="primary" htmlType="submit">
          Register
        </Button>
        Or <Link to='/login'>login now!</Link>
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
    tryregister: (registerData) => dispatch(actions.register(registerData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register)