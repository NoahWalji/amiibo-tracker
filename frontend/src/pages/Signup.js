import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import {axiosInstance} from "../config"
import Nav from '../components/Nav';


function Signup(props) {

    const [usernameReg, setUsername] = useState("");
    const [emailReg, setEmail] = useState("");
    const [passwordReg, setPassword] = useState("");
    const [repasswordReg, setrePassword] = useState("");
    const [loggedIn, setLoggedin] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const register = (e) => {
        e.preventDefault()
        axiosInstance.post("/signup", {username: usernameReg, email: emailReg, password: passwordReg, repassword: repasswordReg})
        .then((response) => {
            if (response.data.message) {
                var error = "<div class='alert alert-danger' role='alert'>" + response.data.message + "</div>"
                setErrorMessage(error);
            }

            else {
                navigate("/login")
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
                    <h1 className="otherCharacterTitle">Signup</h1>
                    <div dangerouslySetInnerHTML={{ __html: errorMessage }}></div>
                    <form onSubmit={register}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input required type="text" className="form-control" id="username" onChange={(e)=>{setUsername(e.target.value)}} placeholder="Enter Username"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input required type="email" className="form-control" id="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter Email Address"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input required type="password" className="form-control" id="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter Password"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="repassword">Re-enter Password</label>
                            <input required type="password" className="form-control" id="repassword" onChange={(e)=>{setrePassword(e.target.value)}} placeholder="Enter Password"/>
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

export default Signup;