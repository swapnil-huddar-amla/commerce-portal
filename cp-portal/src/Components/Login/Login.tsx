import React from 'react';
import { Button, Checkbox, Form, Input, Col, Row, Card, Image } from 'antd';

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

export default function Login(){
    return(
        <>
            <Row justify={"center"} align={"middle"} className="h-100">
              <Col span={8}>
                <Card bordered={true}>
                    <Row justify={"center"}>
                      <Col>
                        <Image
                          className="login-card"
                          src="/Maxwell-Logo.png"
                          preview={false}
                        />
                      </Col>
                    </Row>
                        <Row justify={"center"}>
                            <Col>
                            <Form
                              name="basic"
                              labelCol={{ span: 24 }}
                              wrapperCol={{ span: 24 }}
                              style={{ maxWidth: 600 }}
                              initialValues={{ remember: true }}
                              onFinish={onFinish}
                              onFinishFailed={onFinishFailed}
                              autoComplete="off"
                            >
                              <Form.Item
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                              >
                                <Input />
                              </Form.Item>

                              <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                              >
                                <Input.Password />
                              </Form.Item>

                              <Form.Item name="remember" valuePropName="checked" wrapperCol={{ span: 24 }}>
                                <Checkbox>Remember me</Checkbox>
                              </Form.Item>

                              <Form.Item wrapperCol={{  span: 24 }}>
                                <Button type="primary" htmlType="submit">
                                  Submit
                                </Button>
                              </Form.Item>
                            </Form>

                          </Col>
                        </Row>
                    </Card>
              </Col>
            </Row>
        </>
    );
}