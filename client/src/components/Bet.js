import React, { useState, useEffect } from 'react';
import { Layout, Input, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import pasino from './Pasino.png';
import coin from './coin.png';
import img from './flip.gif';

const { Header, Content } = Layout;

const CoinFlipBetting = () => {
    const [bet, setBet] = useState('');
    const [selectedSide, setSelectedSide] = useState('');
    const [result, setResult] = useState(null);
    const [userPoints, setUserPoints] = useState(null);
    const [coinImage, setCoinImage] = useState(coin); // 이미지 상태 추가
    const [isBet, setIsBet] = useState(false);

    const handleBetChange = (e) => {
        setBet(e.target.value);
    };

    const handleSideSelect = (side) => {
        setSelectedSide(side);
    };

    const handleBet = async () => {
        if (!bet || !selectedSide) {
            message.error('Please enter a bet and select a side.');
            return;
        }

        setCoinImage(img);
        setIsBet(true);

        setTimeout(async () => {
            const outcome = Math.random() < 0.5 ? 'heads' : 'tails';
            setResult(outcome);
            setCoinImage(coin); // 결과 후 원래 이미지로 변경

            try {
                const response = await axios.post('http://127.0.0.1:5000/bet', {
                    bet_amount: parseInt(bet, 10),
                    result: outcome,
                    selected_side: selectedSide
                }, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (outcome === selectedSide) {
                    message.success(`You won! New Point : ${response.data.point}`);
                } else {
                    message.error(`You lost! New Point : ${response.data.point}`);
                }
                setUserPoints(response.data.point);
            } catch (error) {
                if (error.response) {
                    message.error(`Error: ${error.response.data.message}`);
                } else if (error.request) {
                    message.error('No response received from server.');
                } else {
                    message.error(`An error occurred: ${error.message}`);
                }
            }

            setIsBet(false);
        }, 3000);
    };

    const fetchUserPoints = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/mypage', {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            setUserPoints(response.data.point);
        } catch (error) {
            message.error('Failed to fetch user points.');
        }
    };

    useEffect(() => {
        fetchUserPoints();
    }, []);

    return (
        <Layout style={{ backgroundColor: "#ffffff" }}>
            <Header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: "#ffffff"
            }}>
                <Link to="/" style={{ width: '100px', display: 'block' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={pasino} style={{ width: "250px", marginTop: "50px" }} />
                    </div>
                </Link>
            </Header>
            <Content style={{ textAlign: 'center', backgroundColor: '#ffffff', marginTop: '50px' }}>
                <div style={{ alignItems: 'center' }}>
                    <img src={coinImage} style={{ width: "250px", marginTop: "50px" }} />
                </div>
                {userPoints !== null && (
                    <h2>{`Your Points: ${userPoints}`}</h2>
                )}
                <div style={{ marginBottom: '20px' }}>
                    <Input
                        type="number"
                        value={bet}
                        onChange={handleBetChange}
                        placeholder="Point for bet"
                        style={{ width: '200px', marginRight: '10px' }}
                    />
                    <Button type={selectedSide === 'heads' ? 'primary' : 'default'}
                            onClick={() => handleSideSelect('heads')}>
                        Heads
                    </Button>
                    <Button type={selectedSide === 'tails' ? 'primary' : 'default'}
                            onClick={() => handleSideSelect('tails')} style={{ marginLeft: '10px' }}>
                        Tails
                    </Button>
                </div>
                <Button type="primary" onClick={handleBet} disabled={isBet}>
                    Place Bet
                </Button>
            </Content>
        </Layout>
    );
};

export default CoinFlipBetting;
