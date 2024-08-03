import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Cookies from 'js-cookie';

const { Header } = Layout;

function Home() {
    const sessionCookie = Cookies.get('token');
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('token');
        navigate('/login');
    };

    return (
        <Layout>
            <Header style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: "#ffffff"}}>
                <Menu mode="horizontal" style={{ border: 'none' }}>
                    {!sessionCookie ? (
                        <>
                            <Menu.Item key="login">
                                <Link to="/login">Login</Link>
                            </Menu.Item>
                            <Menu.Item key="signup">
                                <Link to="/signup">Signup</Link>
                            </Menu.Item>
                        </>
                    ) : (
                        <>
                            <Menu.Item key="mypage">
                                <Link to="/mypage">My Page</Link>
                            </Menu.Item>
                            <Menu.Item key="logout">
                                <span onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</span>
                            </Menu.Item>
                        </>
                    )}
                </Menu>
            </Header>
        </Layout>
    );
}

export default Home;
