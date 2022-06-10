import React from 'react';
import Item from './Item'


function OtherFranchise(props) {

    if (props.item[0]) {
        return (
            <div className="container">
                <h1 className="otherCharacterTitle">amiibo Featuring {props.item[0].franchise} Franchise</h1>
                <div className="row">
                    {props.item.map((item, index) => {
                    return (
                        <Item key={item.id} id={item.id} name={item.name} image={item.image} series={item.series} franchise={item.franchise} date={item.date}/>
                        )
                    })}
                </div>
            </div>
          )
    }

}

export default OtherFranchise;