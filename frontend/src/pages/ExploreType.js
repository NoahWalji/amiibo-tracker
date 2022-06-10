import React, {useEffect, useState} from 'react';
import Nav from '../components/Nav';
import Series from '../components/Series';


function ExploreType(props) {
    const [itemState, itemUpdate] = useState([]);
    const [loading, loadingUpdate] = useState(true);


    useEffect(() => {
        if (props.type === "Series") {
            fetch(`https://amiibo-tracker.herokuapp.com/api/amiibo?allseries=true`, {
                headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                 }
          
              })
            .then(res => res.json())
            .then(items => itemUpdate(items))
            .then(loading => loadingUpdate(false))
        }

        else if (props.type === "Franchises") {
            fetch(`https://amiibo-tracker.herokuapp.com/api/amiibo?allfranchises=true`, {
                headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                 }
          
              })
            .then(res => res.json())
            .then(items => itemUpdate(items))
            .then(loading => loadingUpdate(false))
        }
      }, [props.type]);

      if (!loading) {
        return (
            <div id="main">
                <Nav/>
                <div className="container">
                    <h1 className="otherCharacterTitle">All amiibo {props.type}</h1>
                    <div className="row">
                        {itemState.map((item, index) => {
                        return (
                            <Series key={item.id} name={item.name} image={item.image} link={"/explore/"+props.type+"/"+item.id}/>
                            )
                        })}
                    </div>
                </div>
            </div>
            )
      }


}

export default ExploreType