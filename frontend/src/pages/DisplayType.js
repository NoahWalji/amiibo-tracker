import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Nav from '../components/Nav';
import Item from '../components/Item';


function DisplayType(props) {

    const [itemState, itemUpdate] = useState([]);
    const [loadingState, loadingUpdate] = useState(true);


    const {id} = useParams();
    useEffect(() => {
        if (id) {

            if (props.type === "Series") {
                fetch(`https://amiibo-tracker.herokuapp.com/api/amiibo?series=`+id, {
                    headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                    }
            
                })
                .then(res => res.json())
                .then(item => {itemUpdate(item); console.log(item)})
                .then(loading => {
                    loadingUpdate(false)
                    window.scrollTo(0, 0)
                })
            }

            else if (props.type === "Franchises") {
                fetch(`https://amiibo-tracker.herokuapp.com/api/amiibo?franchise=`+id, {
                    headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                    }
            
                })
                .then(res => res.json())
                .then(item => {itemUpdate(item); console.log(item)})
                .then(loading => {
                    loadingUpdate(false)
                    window.scrollTo(0, 0)
                })
            }
        }
      }, [id]);

      if (!loadingState) {
          var name = "";
          if (props.type === "Series") {
              name = itemState[0].series
          }

          else if (props.type === "Franchises") {
              name = itemState[0].franchise
          }
        return (
            <div id="main">
                <Nav/>
                <div className="container">
                    <h1 className="otherCharacterTitle">amiibo in {name} {props.type}</h1>
                    <div className="row">
                        {itemState.map((item, index) => {
                        return (
                            <Item key={item.id} id={item.id} name={item.name} image={item.image} series={item.series} franchise={item.franchise} date={item.date}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
      }

      else {
          return;
      }
}

export default DisplayType;