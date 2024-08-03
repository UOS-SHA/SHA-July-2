import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import { Layout, Card, Typography, Spin } from 'antd';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const MyPage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [cookies] = useCookies(['token']);
    const navigate = useNavigate();

    useEffect(() => {
        if (!cookies.token) {
            navigate('/login');
        } else {
            axios.get('http://127.0.0.1:5000/mypage', {
                headers: {
                    'Authorization': `Bearer ${cookies.token}`
                },
                withCredentials: true
            })
                .then(response => {
                    setUserInfo(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user info : ', error);
                    navigate('/login');
                });
        }
    }, [cookies.token, navigate]);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ backgroundColor: '#ffffff', zIndex: 1 }}>
                <Link to="/" style={{ width: '100px', display: 'block' }}>
                    <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
                        Home
                    </span>
                </Link>
            </Header>
            <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '50px' }}>
                <Card style={{ width: '400px', textAlign: 'center' }}>
                    <Title level={2}>My Page</Title>
                    {userInfo ? (
                        <div>
                            <Text strong>Username:</Text>
                            <p>{userInfo.username}</p>
                        </div>
                    ) : (
                        <Spin tip="Loading..." />
                    )}
                    <div style={{ marginTop: '20px' }}>
                        <Text>Your token is :</Text>
                        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{cookies.token}</pre>
                    </div>
                </Card>
            </Content>
        </Layout>
    );
};

export default MyPage;
