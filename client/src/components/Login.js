import React, { useState } from 'react';
import { Form, Input, Button, Layout, message } from 'antd';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import pasino from "./Pasino.png";
const { Content, Header } = Layout;

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie] = useCookies(['token'])
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/login', {
                username: values.username,
                password: values.password
            });
            message.success(response.data.message);

            setCookie('token', response.data.token, { path: '/' });

            navigate('/');
        } catch (error) {
            message.error(error.response?.data?.message || error.message);
        }
    };

    const handleSignup = () => {
        navigate('/signup');
    };

    return (
        <Layout>
            <Header style={{ backgroundColor: '#ffffff', zIndex: 1 }}>
                <Link to="/" style={{width: '100px', display: 'block'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img src={pasino} style={{width: "250px", marginTop: "16px"}}/>
                    </div>
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