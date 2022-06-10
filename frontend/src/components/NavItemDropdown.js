import React from 'react';
import {Link} from 'react-router-dom';


function NavItem(props) {
    return (
        <li className='nav-item dropdown'>
            <Link className="nav-link dropdown-toggle" to={props.link} data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">{props.title}</Link>
            <div className="dropdown-menu">
                <Link className="dropdown-item" to={props.link1}>{props.title1}</Link>
                <Link className="dropdown-item" to={props.link2}>{props.title2}</Link>
            </div>
        </li>
    )
}

export default NavItem;