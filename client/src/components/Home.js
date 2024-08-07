import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Cookies from 'js-cookie';
import pasino from './Pasino.png';

const { Header } = Layout;

function Home() {
    const sessionCookie = Cookies.get('token');
    const navigate = useNavigate();

    return (
        <Layout>
            <Header
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: "#ffffff" }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={pasino} style={{ width: "250px", marginTop: "50px"}} />
                </div>
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
                            <Menu.Item key="bet">
                                <Link to="/bet">Bet</Link>
                            </Menu.Item>
                            <Menu.Item key="mypage">
                                <Link to="/mypage">My Page</Link>
                            </Menu.Item>
                        </>
                    )}
                </Menu>
            </Header>
        </Layout>
    );
}

export default Home;
