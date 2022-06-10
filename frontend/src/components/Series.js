import React from 'react';
import {Link} from 'react-router-dom';

function Series(props) {
    return (
        
        <Link className='amiibo-item col-md-4' to={props.link}  >
            <img alt="" className="amiibo-img" src={props.image}></img>
            <h5>{props.name}</h5>
        </Link>
    )
}

export default Series;