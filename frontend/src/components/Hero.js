import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import bg from '../static/bg.jpeg'

function Hero(props) {
    const [loggedIn, setLoggedin] = useState(false);

    useEffect(() => {
        const loggedInUser = localStorage.getItem("userID");
        if (loggedInUser) {
            setLoggedin(true);
        }
      }, []);



    return (
        <div className="hero" style={{ backgroundImage: `url(${bg})` }}>
            <div className="hero-text">
                <h1>amiibo Tracker</h1>
                <p>Explore, save and display your amiibo collection</p>
                {!loggedIn ? <Link className="btn btn-dark" to="/login">Track Your Collection</Link> : <Link className="btn btn-dark" to="/collection">Track Your Collection</Link>}
            </div>
        </div>
    )
}

export default Hero;