import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {axiosInstance} from "../config"

function SingleItemDisplay(props) {

    const [collectionState, setCollection] = useState("Add to Collection");
    const [wishlistState, setWishlist] = useState("Add to Wishlist");
    const [loggedIn, setLoggedin] = useState(false);
    const [userID, setUserID] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        setCollection("Add to Collection")
        setWishlist("Add to Wishlist")
        const loggedInUser = localStorage.getItem("userID");
        if (loggedInUser) {
            setLoggedin(true);
            setUserID(localStorage.getItem("userID"))

            axiosInstance.post("/isCollection", {id: props.item.id, userID: userID})
            .then((response) => {
                if (response.data.collection) {
                    setCollection("Remove from Collection")
                }

                axiosInstance.post("/isWishlist", {id: props.item.id, userID: userID})
                .then((response) => {
                    if (response.data.wishlist) {
                        setWishlist("Remove from Wishlist")
                    }
                });
    
            });
            

        }
      }, [props.item.id, userID]);

    const addToCollection = (e) => {
        if (loggedIn) {
            if (collectionState === "Add to Collection") {
                axiosInstance.post("/addCollection", {id: props.item.id, userID: userID})
                .then((response) => {
                    setCollection("Remove from Collection")
                });
            }
    
            else {
                axiosInstance.post("/removeCollection", {id: props.item.id, userID: userID})
                .then((response) => {
                    setCollection("Add to Collection")
                });
            }
        }

        else {
            navigate("/login")
        }
    }

    const addToWishlist = (e) => {
        if (loggedIn) {
            if (wishlistState === "Add to Wishlist") {
                axiosInstance.post("/addWishlist", {id: props.item.id, userID: userID})
                .then((response) => {
                    setWishlist("Remove from Wishlist")
                });     
            }
    
            else {
                axiosInstance.post("/removeWishlist", {id: props.item.id, userID: userID})
                .then((response) => {
                    setWishlist("Add to Wishlist")
                });
            }
        }

        else {
            navigate("/login")
        }
    }

    var date = "N/A"
    if (props.item.date !== "2022-12-31T05:00:00.000Z") {
        date = new Date(props.item.date).toLocaleDateString()
    }

    var type = "Figure";
    if (props.item.card != null) {
        type = "Card #" + props.item.card;
    }

    return (
        <div className="container">
            <img alt="" className="single-amiibo-img" src={props.item.image}></img>
            <div className="single-amiibo-text">
                <h1>{props.item.name}</h1>
                <h5><Link to={'/explore/franchises/'+props.item.franchiseID}>{props.item.franchise}</Link></h5>
                <h6>Amiibo Series: <Link to={'/explore/series/'+props.item.seriesID}>{props.item.series}</Link></h6>
                <p>Type: {type}</p>
                <p>Release Date (North America): {date}</p>
                <button onClick={addToCollection} className="btn collection-btn">{collectionState}</button>
                <button onClick={addToWishlist} className="btn wishlist-btn">{wishlistState}</button>
            </div>
        </div>
      )
}


export default SingleItemDisplay;