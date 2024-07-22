import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

function Home() {
    return (
        <Layout>
            <Header style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: "#ffffff"}}>
                <Menu mode="horizontal" style={{ border: 'none' }}>
                    <Menu.Item key="login">
                        <Link to="/login">Login</Link>
                    </Menu.Item>
                    <Menu.Item key="signup">
                        <Link to="/signup">Signup</Link>
                    </Menu.Item>
                    <Menu.Item key="user">
                        <Link to="/mypage">My Page</Link>
                    </Menu.Item>
                </Menu>
            </Header>
            {/* Your other content goes here */}
        </Layout>
    );
}

export default Home;
