import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import {axiosInstance} from "../config"
import Nav from '../components/Nav';
import Item from '../components/Item'


function Collection(props) {

    const [loggedIn, setLoggedin] = useState(false);
    const [loading, setloading] = useState(false);
    const [userID, setUserID] = useState("");
    const [myCollection, setmyCollection] = useState([]);
    const [myWishlist, setmyWishlist] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {
        const loggedInUser = localStorage.getItem("userID");
        if (loggedInUser) {
            setLoggedin(true);
            setUserID(localStorage.getItem("userID"));

            axiosInstance.post("/getCollection", {userID: userID})
            .then((response) => {
                setmyCollection(response.data)
                axiosInstance.post("/getWishlist", {userID: userID})
                .then((response) => {
                    setmyWishlist(response.data)
                    setloading(true);
                });
            });
        }

        else {
            navigate("/")
        }
      }, [navigate,userID]);
      
    if (loggedIn && loading) {
        return (
            <div id="main">
                <Nav/>
                <div className="container">
                    <h1 className="otherCharacterTitle">My Collection</h1>
                    <div className="row">
                        {myCollection.map((item, index) => {
                            return (
                                <Item key={item.amiiboID} id={item.amiiboID} name={item.name} image={item.image} series={item.series} franchise={item.franchise} date={item.date}/>
                            )
                        })}
                    </div>
                    <h1 className="otherCharacterTitle">My Wishlist</h1>
                    <div className="row">
                        {myWishlist.map((item, index) => {
                            return (
                                <Item key={item.amiiboID} id={item.amiiboID} name={item.name} image={item.image} series={item.series} franchise={item.franchise} date={item.date}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }


}

export default Collection;