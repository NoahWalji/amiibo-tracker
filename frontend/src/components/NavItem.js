import React from 'react';
import {Link} from 'react-router-dom';


function NavItem(props) {
    return (
        <li className='nav-item'>
            <Link className='nav-link' to={props.link}>{props.title}</Link>
        </li>
    )
}

export default NavItem;