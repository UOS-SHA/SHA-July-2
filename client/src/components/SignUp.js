import React, { useState } from 'react';
import { Form, Input, Button, Layout, message } from 'antd';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
const { Content, Header } = Layout;

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/signup', {
                username: values.username,
                password: values.password
            });
            setMessage(response.data.message);
            if (response.status === 201) {
                message.success(response.data.message);
                navigate('/login');
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                message.error('User already exists');
            } else {
                setMessage('Error signing up: ' + (error.response?.data?.message || error.message));
            }
        }
        console.log('Username:', values.username);
        console.log('Password:', values.password);
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
                        <Button type="primary" htmlType="submit">
                            Sign Up
                        </Button>
                    </Form>
                </div>
            </Content>
        </Layout>
    );
};

export default Signup;