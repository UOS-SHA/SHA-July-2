import React, { useEffect, useState } from "react";
import { Layout, Table, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const { Content } = Layout;

const Admin = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = Cookies.get('token');
                const response = await axios.get('http://127.0.0.1:5000/admin', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUsers(Object.entries(response.data).map(([username, data]) => ({ username, ...data })));
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    message.error('Access forbidden');
                    navigate('/login');
                } else {
                    message.error('An error occurred while fetching users');
                }
            }
        };
        fetchUsers();
    }, [navigate]);

    const columns = [
        { title: 'Username', dataIndex: 'username', key: 'username' },
        { title: 'Point', dataIndex: 'point', key: 'point' },
        { title: 'Role', dataIndex: 'role', key: 'role' }
    ];
    return (
        <Layout>
            <Content style={{ padding: '20px' }}>
                <h1>Admin Page</h1>
                <Table dataSource={users} columns={columns} rowKey="username" />
            </Content>
        </Layout>
    );
};

export default Admin;