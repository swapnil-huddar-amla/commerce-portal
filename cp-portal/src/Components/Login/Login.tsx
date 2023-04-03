import React, {useState} from 'react';
import { Button, Checkbox, Form, Input, Col, Row, Card, Image, Space  } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Outlet, Link, useNavigate  } from "react-router-dom";
import Header from '../Common/Header/Header';

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

export default function Login(){

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  const [size, setSize] = useState(120);

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/tables`; 
    navigate(path);
  }

    return(
        <>
        <Space direction="vertical" size={size} style={{ display: 'flex' }}>
          <Header />
          <Row justify={"center"} align={"middle"} className="h-100">
            <Col span={8} md={{span: 12}} xl={{span: 8}} xs= {{span: 18}} lg={{span: 8}}>
              <Card bordered={true}>
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    <Row justify={"center"}>
                      <Col span={12}>
                        <Image
                          className="login-card"
                          src="/Maxwell-Logo.png"
                          preview={false}
                        />
                      </Col>
                    </Row>
                    <Row justify={"center"}>
                      <Col span={24}>
                        <Form
                          name="normal_login"
                          className="login-form"
                          initialValues={{ remember: true }}
                          onFinish={onFinish}
                        >
                          <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                          >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                          </Form.Item>
                          <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                          >
                            <Input
                              prefix={<LockOutlined className="site-form-item-icon" />}
                              type="password"
                              placeholder="Password"
                            />
                          </Form.Item>
                          <Form.Item >
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                              <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <a className="login-form-forgot" href="/dashboard">
                              Forgot password
                            </a>
                          </Form.Item>
                          <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" onClick={routeChange}>
                              Login
                            </Button>
                          </Form.Item>
                        </Form>
                      </Col>
                    </Row>
                </Space>
              </Card>
            </Col>
          </Row>
          </Space>
        </>
    );
}