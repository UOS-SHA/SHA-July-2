import React, { useState } from 'react';
import { Form, Input, Button, Layout } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Content } = Layout;

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // 회원가입 API 호출 등의 로직 추가
    };

    return (
        <Layout>
            <Header style={{ backgroundColor: '#ffffff', zIndex: 1 }}>
                <Link to="/" style={{ width: '100px', display: 'block' }}>
                    <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
                        Home
                    </span>
                </Link>
            </Header>
            <Content
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#ffffff',
                }}
            >
                <div
                    style={{
                        padding: '32px',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                        backgroundColor: '#fff',
                    }}
                >
                    <Form onFinish={handleSubmit}>
                        <Form.Item
                            name="username"
                            label="Username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Item>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button type="primary" htmlType="submit" style={{ marginRight: '8px' }}>
                                Sign Up
                            </Button>
                        </div>
                    </Form>
                </div>
            </Content>
        </Layout>
    );
};

export default Signup;
