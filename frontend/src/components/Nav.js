import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import NavItem from './NavItem';
import NavItemDropdown from './NavItemDropdown';

function Nav(props) {

    const [loggedIn, setLoggedin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("userID");
        if (loggedInUser) {
            setLoggedin(true);
        }
      }, []);

      const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('userID')
        localStorage.removeItem('username')
        setLoggedin(false);
        navigate("/")
    }

    return (
        <nav className="navbar">
            <ul className="nav mr-auto">
                <NavItem link="/" title="Home"/>
                <NavItemDropdown link="/explore" title="Explore" link1="/explore/series" title1="All Series" link2="/explore/franchises" title2="All Franchises"/>
            </ul>
            <ul className="nav">
                {!loggedIn ? <NavItem link="/login" title="Login"/> : <NavItem link="/collection" title="My Collection"/>}
                
                {!loggedIn ? <NavItem link="/signup" title="Sign Up"/> : <p onClick={logout} className='nav-link'>Logout</p>}
            </ul>
        </nav>
    )
}

export default Nav;