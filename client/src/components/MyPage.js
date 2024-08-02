import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const MyPage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [cookies] = useCookies(['token'])
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
        <div>
            <h1>My Page</h1>
            {userInfo ? (
                <div>
                    <p>Username: {userInfo.username}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <p>Your token is : </p>
            <pre>{cookies.token}</pre>
        </div>
    );
};

export default MyPage;