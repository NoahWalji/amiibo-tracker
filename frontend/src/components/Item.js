import React from 'react';
import {Link} from 'react-router-dom';

function Item(props) {
    var link = "/amiibo/"+props.id;


    return (
        
        <Link className='amiibo-item col-md-4' to={link}  >
            <img alt="" className="amiibo-img" src={props.image}></img>
            <h5>{props.name}</h5>
            <span>Series: {props.series}</span><br></br>
        </Link>
    )
}

export default Item;