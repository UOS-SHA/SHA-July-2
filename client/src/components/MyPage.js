import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import { Layout, Card, Typography, Spin, Button } from 'antd';
import pasino from "./Pasino.png";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const MyPage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
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
                    console.error('Error fetching user info: ', error);
                    navigate('/login');
                });
        }
    }, [cookies.token, navigate]);

    const handleLogout = () => {
        removeCookie('token', { path: '/' });
        navigate('/');
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ backgroundColor: '#ffffff', zIndex: 1 }}>
                <Link to="/" style={{width: '100px', display: 'block'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img src={pasino} style={{width: "250px", marginTop: "16px"}}/>
                    </div>
                </Link>
            </Header>
            <Content style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '50px', backgroundColor: '#ffffff',}}>
                <Card style={{width: '400px', textAlign: 'center' }}>
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
                        <Text>Point:</Text>
                        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>1232323231</pre>
                    </div>
                    <Button type="primary" onClick={handleLogout} style={{ marginTop: '20px' }}>
                        Logout
                    </Button>
                </Card>
            </Content>
        </Layout>
    );
};

export default MyPage;
