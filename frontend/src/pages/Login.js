import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import {axiosInstance} from "../config"
import Nav from '../components/Nav';


function Login(props) {

    const [usernameLogin, setUsernameLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");
    const [loggedIn, setLoggedin] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        axiosInstance.post("/login", {username: usernameLogin, password: passwordLogin})
        .then((response) => {
            if (response.data.message) {
                var error = "<div class='alert alert-danger' role='alert'>" + response.data.message + "</div>"
                setErrorMessage(error);
            }

            else {
                localStorage.setItem('userID', response.data[0].id)
                localStorage.setItem('username', response.data[0].username)
                navigate("/")
            }
        });
    }

    useEffect(() => {
        const loggedInUser = localStorage.getItem("userID");
        if (loggedInUser) {
            setLoggedin(true);
        }
      }, []);
      
    if (!loggedIn) {
        return (
            <div id="main">
                <Nav/>
                <div className="container">
                    <h1 className="otherCharacterTitle">Login</h1>
                    <div dangerouslySetInnerHTML={{ __html: errorMessage }}></div>
                    <form onSubmit={login}> 
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" id="username" onChange={(e)=>{setUsernameLogin(e.target.value)}} placeholder="Enter Username"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" onChange={(e)=>{setPasswordLogin(e.target.value)}} placeholder="Enter Password"/>
                        </div>
                        <button type="submit" className="btn">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    else {
        navigate("/")
    }

}

export default Login;