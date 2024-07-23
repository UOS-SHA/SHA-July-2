import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

const MyPage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const sessionCookie = Cookies.get('session');
        console.log('session cookie : ', sessionCookie);
        if (sessionCookie) {
            try {
                const userInfo = JSON.parse(sessionCookie);
                setUserInfo(userInfo);
            } catch (error) {
                console.error('Error parsing session cookie:', error);
            }
        }
        else {
            alert('Please login');
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        </div>
    );
};

export default MyPage;
