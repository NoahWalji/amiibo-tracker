import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Nav from '../components/Nav';
import OtherCharacter from '../components/OtherCharacter';
import OtherFranchise from '../components/OtherFranchise';
import SingleItemDisplay from '../components/SingleItemDisplay';


function ItemPage(props) {

    const [itemState, itemUpdate] = useState([]);
    const [otherCharacters, otherCharactersUpdate] = useState([]);
    const [otherFranchise, otherFranchiseUpdate] = useState([]);
    const [loadingState, loadingUpdate] = useState(true)


    const {id} = useParams();
    useEffect(() => {
        if (id) {
            fetch(`https://amiibo-tracker.herokuapp.com/api/amiibo?id=`+id, {
                headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                }
        
            })
            .then(res => res.json())
            .then(item => {
                itemUpdate(item)
                fetch(`https://amiibo-tracker.herokuapp.com/api/amiibo?character=`+item.allias, {
                    headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                    }
            
                })
                .then(res => res.json())
                .then(items => otherCharactersUpdate(items.slice(0,6)))
                fetch(`https://amiibo-tracker.herokuapp.com/api/amiibo?franchise=`+item.franchiseID, {
                    headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                    }
            
                })
                .then(res => res.json())
                .then(items => otherFranchiseUpdate(items.slice(0,6)))
            })
            .then(loading => {
                loadingUpdate(false)
                window.scrollTo(0, 0)
            })
        }
      }, [id]);

      if (!loadingState) {
        return (
            <div id="main">
                <Nav/>
                <SingleItemDisplay item={itemState}/>
                <OtherCharacter item={otherCharacters}/>
                <OtherFranchise item={otherFranchise}/>
            </div>
        )
      }

      else {
          return;
      }
}

export default ItemPage;