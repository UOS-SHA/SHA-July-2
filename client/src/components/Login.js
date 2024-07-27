import React, { useState } from 'react';
import { Form, Input, Button, Layout, message } from 'antd';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

const { Content, Header } = Layout;

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post(' http://43.200.57.104:5000/login', {
                username: values.username,
                password: values.password
            });
            message.success(response.data.message);
            navigate('/'); // 로그인 성공 시 홈 페이지로 리디렉션
        } catch (error) {
            message.error('Error logging in: ' + (error.response?.data?.message || error.message));
        }
        console.log('Username:', values.username);
        console.log('Password:', values.password);
    };

    const handleSignup = () => {
        navigate('/signup');
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
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button onClick={handleSignup}>Sign Up</Button>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <Button type="primary" htmlType="submit" style={{ marginRight: '8px' }}>
                                    Login
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </Content>
        </Layout>
    );
};

export default Login;
