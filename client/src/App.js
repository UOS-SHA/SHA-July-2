import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import MyPage from "./components/MyPage";
import Bet from "./components/Bet";
import Admin from './components/Admin';
import { CookiesProvider } from 'react-cookie';

function App() {
    return (
        <CookiesProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/bet" element={<Bet />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </Router>
        </CookiesProvider>
    );
}

export default App;
