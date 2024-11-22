import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to Gremlin Land!</h1>
            <button onClick={() => navigate('/login')} style={{ margin: '10px' }}>
                Log In
            </button>
            <button onClick={() => navigate('/register')} style={{ margin: '10px' }}>
                Register
            </button>
        </div>
    );
};

export default Home;